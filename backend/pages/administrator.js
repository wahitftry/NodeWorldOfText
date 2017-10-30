module.exports = {};

module.exports.GET = async function(req, serve, vars, params) {
    var HTML = vars.HTML;
    var user = vars.user;
    var dispage = vars.dispage;
    var db = vars.db;
    var announcement = vars.announcement;
    var uptime = vars.uptime;

    // not a superuser...
    if(!user.superuser) {
        return await dispage("404", null, req, serve, vars)
    }

    var data = {
        user_ranks: await db.all("SELECT * FROM auth_user WHERE level > 0"),
        announcement: announcement(),
        announcement_update_msg: params.announcement_update_msg,
        uptime: uptime()
    }

    serve(HTML("administrator.html", data));
}

module.exports.POST = async function(req, serve, vars) {
    var user = vars.user;
    var dispage = vars.dispage;
    var post_data = vars.post_data;
    var announce = vars.announce;

    if(!user.superuser) {
        return await dispage("404", null, req, serve, vars)
    }

    var new_announcement = post_data.announcement;
    await announce(new_announcement);

    await dispage("administrator", {
        announcement_update_msg: "Announcement updated"
    }, req, serve, vars)
}