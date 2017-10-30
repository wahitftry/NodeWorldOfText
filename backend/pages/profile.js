module.exports = {};

module.exports.GET = async function(req, serve, vars, params) {
    var HTML = vars.HTML;
    var cookies = vars.cookies;
    var db = vars.db;
    var user = vars.user;
    var plural = vars.plural;

    if(!user.authenticated) {
        return serve(null, null, {
            redirect: "/accounts/login/?next=/accounts/profile/"
        })
    }

    var world_list = [];
    var memberships = [];

    var owned = await db.all("SELECT * FROM world WHERE owner_id=?", user.id)
    for(var i = 0; i < owned.length; i++) {
        var world = owned[i];
        var member_total = await db.get("select world_id, count(world_id) as count from whitelist where world_id=?", world.id);
        member_total = member_total.count;
        
        var world_url = world.name;
        if(world_url == "") {
            world_url = "/" + world_url;
        }
        var properties = JSON.parse(world.properties)
        var views = properties.views;
        if(!views) views = 0;
        world_list.push({
            public_writable: world.writability == 0,
            public_readable: world.readability == 0,
            whitelist_set_count: member_total,
            conf_url: "/accounts/configure/" + world.name + "/",
            get_absolute_url: "/" + world.name,
            url: world_url,
            member_plural: plural(member_total),
            views_plural: plural(properties.views),
            views
        })
    }

    var whitelists = await db.all("SELECT * FROM whitelist WHERE user_id=?", user.id)

    for(var i = 0; i < whitelists.length; i++) {
        var world_reference = whitelists[i];
        var name = (await db.get("SELECT name from world where id=?", world_reference.world_id)).name;
        var display_name = name;
        if(display_name == "") {
            display_name = "/" + display_name;
        }
        memberships.push({
            get_absolute_url: "/" + name,
            url: display_name,
            name
        })
    }

    var message = null;
    if(params.message) {
        message = params.message;
    }

    // do not display areas if they are empty
    if(world_list.length == 0) world_list = null;
    if(memberships.length == 0) memberships = null;

    var data = {
        message: message,
        csrftoken: cookies.csrftoken,
        worlds_owned: world_list,
        memberships: memberships
    };

    serve(HTML("profile.html", data));
}

module.exports.POST = async function(req, serve, vars) {
    var db = vars.db;
    var post_data = vars.post_data;
    var user = vars.user;
    var dispage = vars.dispage;
    var world_get_or_create = vars.world_get_or_create;
    var validate_claim_worldname = vars.validate_claim_worldname;

    if(!user.authenticated) {
        return serve(null, 403);
    }

    var message = null;
    if(post_data.form == "claim") {
        var worldname = post_data.worldname + "";
        var validate = await validate_claim_worldname(worldname, vars);
        if(typeof validate == "string") { // an error occured while claiming
            return await dispage("profile", {
                message: validate
            }, req, serve, vars)
        }
        await db.run("UPDATE world SET owner_id=? WHERE id=?", [user.id, validate.world_id]);
        message = validate.message;

    } else if(post_data.form == "leave") { // user is leaving the world (terminating own membership)
        for(var key in post_data) {
            if(key.startsWith("leave_")) {
                var worldName = key.substr("leave_".length);
                await db.run("DELETE FROM whitelist WHERE world_id=(SELECT id FROM world WHERE name=?) and user_id=?",
                    [worldName, user.id]);
                break;
            }
        }
    }
    await dispage("profile", {
        message
    }, req, serve, vars)
}