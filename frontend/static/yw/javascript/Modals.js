function setModalPosition() {
	// center the modal panels
	for(var i = 0; i < ModalRefs.length; i++) {
		var ref = ModalRefs[i];
		if(!ref.open) continue;
		var wndWidth = window.innerWidth;
		var wndHeight = window.innerHeight;
		var elm = ref.panel;
		var divWidth = elm.offsetWidth;
		var divHeight = elm.offsetHeight;
		elm.style.top = ((wndHeight - divHeight) / 2) + "px";
		elm.style.left = ((wndWidth - divWidth) / 2) + "px";
	}
}

// It is bad practice to center elements using javascript
window.addEventListener("resize", setModalPosition);
window.addEventListener("orientationchange", setModalPosition);

var ModalRefs = [];

var URLInputModal = (function() {
	function URLInputModal() {
		var _this = this;
		this.isOpen = false;
		this.panel = document.getElementById("url_input_panel");
		this.overlay = document.getElementById("simplemodal-overlay");
		this.input = document.getElementById("url_input_form_input");
		this.cancel = document.getElementById("url_input_cancel");
		this.form = document.getElementById("url_input_form");
		this.el = document.getElementById("url_input_modal");
		ModalRefs.push(this);
		this.close = function() {
			_this.panel.style.display = "none";
			_this.overlay.style.display = "none";
			simplemodal_onclose();
		};
		this.cancel.onclick = this.close;
		this.onSubmit = function() {
			var url = _this.input.value;
			_this.close();
			setTimeout((function() {
				return _this.callback(url);
			}), 0);
			return false;
		};
		this.form.onsubmit = this.onSubmit;
	}
	URLInputModal.prototype.open = function(callback) {
		this.isOpen = true;
		this.callback = callback;
		this.panel.style.display = "";
		this.overlay.style.display = "";
		this.input.focus();
		simplemodal_onopen();
		this.panel.style.width = "";
		this.panel.style.height = "";
		var el_width = this.el.offsetWidth;
		var el_height = this.el.offsetHeight;
		if(el_height < 80) el_height = 80;
		if(el_width < 160) el_width = 160;
		this.panel.style.width = el_width + "px";
		this.panel.style.height = el_height + "px";
		setModalPosition();
	};
	return URLInputModal;
}());

var CoordinateInputModal = (function() {
	function CoordinateInputModal() {
		var _this = this;
		this.isOpen = false;
		this.panel = document.getElementById("coord_input_panel");
		this.overlay = document.getElementById("simplemodal-overlay");
		this.input = document.getElementById("coord_input_X");
		this.cancel = document.getElementById("coord_input_cancel");
		this.form = document.getElementById("coord_input_form");
		this.el = document.getElementById("coordinate_input_modal");
		ModalRefs.push(this);
		this.title = document.getElementById("coord_input_title");
		this.close = function() {
			_this.panel.style.display = "none";
			_this.overlay.style.display = "none";
			simplemodal_onclose();
		};
		this.cancel.onclick = this.close;
		this.onSubmit = function() {
			var f = _this.form;
			var y = parseInt(f.coord_input_Y.value, 10);
			var x = parseInt(f.coord_input_X.value, 10);
			var fail = false;
			if (isNaN(y)) {
				fail = true;
				f.coord_input_Y.style.border = "1px solid red";
			} else {
				f.coord_input_Y.style.border = "";
				f.coord_input_Y.value = y;
			}
			if (isNaN(x)) {
				fail = true;
				f.coord_input_X.style.border = "1px solid red";
			} else {
				f.coord_input_X.style.border = "";
				f.coord_input_X.value = x;
			}
			if (!fail) {
				_this.close();
				setTimeout((function() {
					return _this.callback(y, x);
				}), 0);
			}
			return false;
		};
		this.form.onsubmit = this.onSubmit;
	}
	CoordinateInputModal.prototype.open = function(title, callback) {
		this.title.innerText = title;
		this.isOpen = true;
		this.callback = callback;
		this.panel.style.display = "";
		this.overlay.style.display = "";
		this.input.focus();
		simplemodal_onopen();
		this.panel.style.width = "";
		this.panel.style.height = "";
		var el_width = this.el.offsetWidth;
		var el_height = this.el.offsetHeight;
		if(el_height < 80) el_height = 80;
		if(el_width < 160) el_width = 160;
		this.panel.style.width = el_width + "px";
		this.panel.style.height = el_height + "px";
		setModalPosition();
	};
	return CoordinateInputModal;
}());

var ColorInputModal = (function() {
	function ColorInputModal() {
		var _this = this;
		this.isOpen = false;
		this.panel = document.getElementById("color_input_panel");
		this.overlay = document.getElementById("simplemodal-overlay");
		this.input = document.getElementById("color_input_form_input");
		this.cancel = document.getElementById("color_input_cancel");
		this.form = document.getElementById("color_input_form");
		this.el = document.getElementById("color_input_modal");
		ModalRefs.push(this);
		this.close = function() {
			_this.panel.style.display = "none";
			_this.overlay.style.display = "none";
			simplemodal_onclose();
		};
		this.cancel.onclick = this.close;
		this.onSubmit = function() {
			var code = _this.input.value;
			_this.close();
			setTimeout((function() {
				return _this.callback(code);
			}), 0);
			return false;
		};
		this.form.onsubmit = this.onSubmit;
	}
	ColorInputModal.prototype.open = function(callback) {
		this.isOpen = true;
		this.callback = callback;
		this.panel.style.display = "";
		this.overlay.style.display = "";
		this.input.focus();
		simplemodal_onopen();
		this.panel.style.width = "";
		this.panel.style.height = "";
		var el_width = this.el.offsetWidth;
		var el_height = this.el.offsetHeight;
		if(el_height < 80) el_height = 80;
		if(el_width < 160) el_width = 160;
		this.panel.style.width = el_width + "px";
		this.panel.style.height = el_height + "px";
		setModalPosition();
	};
	return ColorInputModal;
}());