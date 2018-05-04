!function (e) {
	var t = {};

	function n(r) {
		if (t[r]) return t[r].exports;
		var i = t[r] = {i: r, l: !1, exports: {}};
		return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
	}

	n.m = e, n.c = t, n.d = function (e, t, r) {
		n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: r});
	}, n.r = function (e) {
		Object.defineProperty(e, '__esModule', {value: !0});
	}, n.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default;
		} : function () {
			return e;
		};
		return n.d(t, 'a', t), t;
	}, n.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}, n.p = '', n(n.s = 90);
}([function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	var i = function () {
		function e() {
			if (function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				}(this, e), e.__instance) return e.__instance;
			this.listeners = {}, e.__instance = this;
		}

		return r(e, [{
			key: 'on', value: function (e, t) {
				var n = this;
				return this.listeners[e] = this.listeners[e] || [], this.listeners[e].push(t), function () {
					n.off(e, t);
				};
			}
		}, {
			key: 'off', value: function (e, t) {
				Array.isArray(this.listeners[e]) && (this.listeners[e] = this.listeners[e].filter(function (e) {
					return e !== t;
				}));
			}
		}, {
			key: 'emit', value: function (e, t) {
				Array.isArray(this.listeners[e]) && this.listeners[e].forEach(function (n) {
					n({event: e, payload: t});
				});
			}
		}]), e;
	}();
	t.default = new i;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = o(n(22)), a = o(n(13));

	function o(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var s = null, u = function () {
		function e(t) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.email = t.email, this.username = t.username, this.rating = t.rating;
		}

		return r(e, null, [{
			key: 'auth', value: function () {
				return new Promise(function (t, n) {
					i.default.get(a.default.userAPIMethods.user, function (r, i) {
						if (r) return 401 === r.status ? (s = null, t(null)) : n(r);
						i.then(function (n) {
							s = new e(n.data), t(s);
						});
					});
				});
			}
		}, {
			key: 'isAuthorized', value: function () {
				return !!s;
			}
		}, {
			key: 'getCurUser', value: function () {
				return s;
			}
		}, {
			key: 'signIn', value: function (t) {
				return new Promise(function (n, r) {
					i.default.post(a.default.userAPIMethods.login, t, function (t, i) {
						if (t) return r(t);
						console.log(i), n(e.auth());
					});
				});
			}
		}, {
			key: 'signUp', value: function (t) {
				return new Promise(function (n, r) {
					i.default.post(a.default.userAPIMethods.signup, t, function (t, i) {
						if (t) return r(t);
						console.log(i), n(e.auth());
					});
				});
			}
		}, {
			key: 'logout', value: function () {
				return new Promise(function (t, n) {
					i.default.post(a.default.userAPIMethods.logout, {}, function (r, i) {
						if (r) return n(r);
						console.log(i), t(e.auth());
					});
				});
			}
		}, {
			key: 'update', value: function (t) {
				return new Promise(function (n, r) {
					i.default.post(a.default.userAPIMethods.updateUser, t, function (t, i) {
						if (t) return r(t);
						console.log(i), n(e.auth());
					});
				});
			}
		}, {
			key: 'uploadAvatar', value: function (e) {
				return new Promise(function (t, n) {
					i.default.post(a.default.userAPIMethods.updateAvatar, e, function (e, t) {
						if (e) return n(e);
						console.log(t);
					});
				});
			}
		}]), e;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	var r = Object.prototype.hasOwnProperty;

	function i(e, t) {
		return Array.isArray(e) ? function (e, t) {
			for (var n, r = '', a = '', o = Array.isArray(t), s = 0; s < e.length; s++) (n = i(e[s])) && (o && t[s] && (n = u(n)), r = r + a + n, a = ' ');
			return r;
		}(e, t) : e && 'object' == typeof e ? function (e) {
			var t = '', n = '';
			for (var i in e) i && e[i] && r.call(e, i) && (t = t + n + i, n = ' ');
			return t;
		}(e) : e || '';
	}

	function a(e) {
		if (!e) return '';
		if ('object' == typeof e) {
			var t = '';
			for (var n in e) r.call(e, n) && (t = t + n + ':' + e[n] + ';');
			return t;
		}
		return e + '';
	}

	function o(e, t, n, r) {
		return !1 !== t && null != t && (t || 'class' !== e && 'style' !== e) ? !0 === t ? ' ' + (r ? e : e + '="' + e + '"') : ('function' == typeof t.toJSON && (t = t.toJSON()), 'string' == typeof t || (t = JSON.stringify(t), n || -1 === t.indexOf('"')) ? (n && (t = u(t)), ' ' + e + '="' + t + '"') : ' ' + e + '=\'' + t.replace(/'/g, '&#39;') + '\'') : '';
	}

	t.merge = function e(t, n) {
		if (1 === arguments.length) {
			for (var r = t[0], i = 1; i < t.length; i++) r = e(r, t[i]);
			return r;
		}
		for (var o in n) if ('class' === o) {
			var s = t[o] || [];
			t[o] = (Array.isArray(s) ? s : [s]).concat(n[o] || []);
		} else if ('style' === o) {
			var s = a(t[o]);
			s = s && ';' !== s[s.length - 1] ? s + ';' : s;
			var u = a(n[o]);
			u = u && ';' !== u[u.length - 1] ? u + ';' : u, t[o] = s + u;
		} else t[o] = n[o];
		return t;
	}, t.classes = i, t.style = a, t.attr = o, t.attrs = function (e, t) {
		var n = '';
		for (var s in e) if (r.call(e, s)) {
			var u = e[s];
			if ('class' === s) {
				u = i(u), n = o(s, u, !1, t) + n;
				continue;
			}
			'style' === s && (u = a(u)), n += o(s, u, !1, t);
		}
		return n;
	};
	var s = /["&<>]/;

	function u(e) {
		var t = '' + e, n = s.exec(t);
		if (!n) return e;
		var r, i, a, o = '';
		for (r = n.index, i = 0; r < t.length; r++) {
			switch (t.charCodeAt(r)) {
				case 34:
					a = '&quot;';
					break;
				case 38:
					a = '&amp;';
					break;
				case 60:
					a = '&lt;';
					break;
				case 62:
					a = '&gt;';
					break;
				default:
					continue;
			}
			i !== r && (o += t.substring(i, r)), i = r + 1, o += a;
		}
		return i !== r ? o + t.substring(i, r) : o;
	}

	t.escape = u, t.rethrow = function e(t, r, i, a) {
		if (!(t instanceof Error)) throw t;
		if (!('undefined' == typeof window && r || a)) throw t.message += ' on line ' + i, t;
		try {
			a = a || n(52).readFileSync(r, 'utf8');
		} catch (n) {
			e(t, null, i);
		}
		var o = 3, s = a.split('\n'), u = Math.max(i - o, 0), l = Math.min(s.length, i + o);
		var o = s.slice(u, l).map(function (e, t) {
			var n = t + u + 1;
			return (n == i ? '  > ' : '    ') + n + '| ' + e;
		}).join('\n');
		t.path = r;
		t.message = (r || 'Pug') + ':' + i + '\n' + o + '\n\n' + t.message;
		throw t;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(1), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), o.default.isAuthorized();
		}

		return i(e, [{
			key: 'render', value: function () {
			}
		}, {
			key: 'allowed', value: function () {
				return !1;
			}
		}]), e;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = n(35);
	var a = function () {
		function e(t, n) {
			if (function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				}(this, e), e.__instance) return e.__instance;
			this.root = t, this.startRoot = document.getElementById('start'), this.gameRoot = document.getElementById('game'), this.map = {}, this.global = n, this.active = null, e.__instance = this;
		}

		return r(e, [{
			key: 'add', value: function (e, t) {
				return this.map[e] = new t(this.root), this;
			}
		}, {
			key: 'open', value: function (e) {
				console.log('open');
				var t = this.map[e], n = void 0;
				if ('/singleplayer' === e || '/multiplayer' === e ? (console.log('if'), n = this.gameRoot, this.startRoot.hidden = !0, n.hidden = !1) : (console.log('else'), n = this.root, this.startRoot.hidden = !1, this.gameRoot.hidden = !0), console.log('view ', e, 'is allowed: ', t.allowed()), !t.allowed()) return window.history.replaceState(null, '', '/'), void this.open('/');
				window.location.pathname !== e && window.history.pushState(null, '', e), i.sectionSwitcher.changeSection(t.render(), n);
			}
		}, {
			key: 'start', value: function () {
				window.addEventListener('popstate', function () {
					this.open(window.location.pathname);
				}.bind(this)), this.root.addEventListener('click', function (e) {
					'a' === e.target.tagName.toLowerCase() && (e.preventDefault(), window.history.pushState(null, '', e.target.href), this.open(e.target.pathname));
				}.bind(this)), console.log(window.location.pathname), this.open(window.location.pathname);
			}
		}]), e;
	}();
	t.default = a;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(10), o = (r = a) && r.__esModule ? r : {default: r};
	var s = n(40), u = function (e) {
		function t(e) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var n = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			n.status = !0, n.wrapper = document.createElement('div');
			var r = 'input';
			return 'submit' === e.type && (r = 'button'), n.wrapper.innerHTML += s({
				type: e.type,
				placeholder: e.placeholder,
				value: e.value,
				id: e.id,
				error_id: e.id.concat('_error'),
				CLASS: r
			}), n.ErrorElement = n.wrapper.getElementsByTagName('div')[0], n.InputElement = n.wrapper.getElementsByTagName('input')[0], n;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, o.default), i(t, [{
			key: 'render', value: function () {
				return this.wrapper;
			}
		}, {
			key: 'getState', value: function () {
				return this.status;
			}
		}, {
			key: 'getData', value: function () {
				return this.InputElement.value;
			}
		}, {
			key: 'getFormData', value: function () {
				return this.InputElement;
			}
		}, {
			key: 'setError', value: function (e) {
				e ? (this.status = !1, this.ErrorElement.innerHTML = e, this.InputElement.classList.add('input__error')) : (this.status = !0, this.ErrorElement.style.display = 'none', this.InputElement.classList.remove('input__error'));
			}
		}, {
			key: 'setOnInputChange', value: function (e) {
				this.InputElement.addEventListener('change', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(10), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.formElement = document.createElement('form'), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, o.default), i(t, [{
			key: 'render', value: function () {
			}
		}, {
			key: 'reset', value: function () {
				this.formElement.reset();
			}
		}, {
			key: 'setOnSubmit', value: function () {
			}
		}]), t;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.GameModes = {singleplayer: 1, multiplayer: 2};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.default = {DEFAULT: 1, READY: 2, DISABLED: 3, WON: 4, LOSE: 5};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	var i = function () {
		function e() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e);
		}

		return r(e, null, [{
			key: 'checkMail', value: function (e) {
				var t = e.getData();
				!1 === /([\w-]+)@([\w-]+)(\.[\w]+)/.test(t) ? e.setError('incorrect email') : e.setError(null);
			}
		}, {
			key: 'checkName', value: function (e) {
				var t = e.getData();
				/^[a-zA-Z0-9_-]{3,16}$/.test(t) ? e.setError(null) : e.setError('incorrect name');
			}
		}, {
			key: 'checkPass', value: function (e) {
				e.getData().length < 8 ? e.setError('too short password') : e.setError(null);
			}
		}, {
			key: 'checkConfirm', value: function (e, t) {
				e.getData() !== t.getData() ? t.setError('passwords do not match') : t.setError(null);
			}
		}]), e;
	}();
	t.default = i;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	var i = function () {
		function e() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e);
		}

		return r(e, [{
			key: 'render', value: function () {
			}
		}]), e;
	}();
	t.default = i;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.animate = function (e, t) {
		var n = performance.now();
		requestAnimationFrame(function r(i) {
			var a = i - n;
			a > t && (a = t), e(a), a < t && requestAnimationFrame(r);
		});
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(8), o = (r = a) && r.__esModule ? r : {default: r}, s = n(19);
	var u = function () {
		function e(t, n, r, i) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.score = 0, this.resources = 0, this.canvas = r, this.allRegions = null, this.img = i, this.regions = [], this.status = o.default.DISABLED, this.color = n, this.name = t;
		}

		return i(e, [{
			key: 'setAllRegtions', value: function (e) {
				this.allRegions = e;
			}
		}, {
			key: 'init', value: function () {
			}
		}, {
			key: 'isTheRegionOfPlayer', value: function (e) {
				for (var t = 0; t < this.regions.length; ++t) if (this.regions[t].name === e.name) return !0;
				return !1;
			}
		}, {
			key: 'addRegion', value: function (e) {
				e.area.setColor(this.color), (0, s.renderScene)(this.canvas, this.allRegions, this.img), e.area.reColor(this.color), e.owner = this, this.regions.push(e);
			}
		}, {
			key: 'delRegion', value: function (e) {
				for (var t = 0; t < this.regions.length; ++t) this.regions[t] === e && this.regions.splice(t, 1);
				0 === this.regions.length && (this.status = o.default.LOSE);
			}
		}, {
			key: 'setStatus', value: function (e) {
				this.status = e;
			}
		}]), e;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.default = {
		serverUrl: 'https://rha-backend.herokuapp.com/',
		userAPIMethods: {
			login: 'users/auth',
			signup: 'users/create',
			logout: 'users/logout',
			user: 'users/info',
			updateUser: 'users/chpwd',
			leaderBoard: 'users/rating',
			updateAvatar: 'users/chava'
		}
	};
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t = '', n = e || {};
		return function (e, n, i) {
			t = t + '<div class="info-menu" id="info-menu"><div class="about-region" id="about-region"></div></div><div class="canvas-wrap"><canvas class="canvas"' + r.attr('width', i, !0, !0) + r.attr('height', e, !0, !0) + r.attr('id', n, !0, !0) + '></canvas></div><div class="log" id="log"></div><div class="control-interface" id="control-interface"><div class="change"></div></div><div class="timer" id="timer">30</div>';
		}.call(this, 'height' in n ? n.height : 'undefined' != typeof height ? height : void 0, 'id' in n ? n.id : 'undefined' != typeof id ? id : void 0, 'width' in n ? n.width : 'undefined' != typeof width ? width : void 0), t;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}();
	var i = 1e3, a = 610, o = function () {
		function e(t) {
			if (function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				}(this, e), e.__instance) return e.__instance;
			e.__instance = this, this.game_canvas = t, this.xSize = t.width / i, this.ySize = t.height / a, this.lengthSide = 90, this.allowedCoord = [{
				name: 'A',
				x: 365 * this.xSize,
				y: 345 * this.ySize,
				allowed: !0,
				neighbour: ['B', 'C', 'D']
			}, {
				name: 'B',
				x: (325 + 2 * this.lengthSide) * this.xSize,
				y: (339 - .86 * this.lengthSide) * this.ySize,
				allowed: !0,
				neighbour: ['A', 'C', 'D', 'E']
			}, {
				name: 'C',
				x: 365 * this.xSize,
				y: (339 - .86 * this.lengthSide * 2) * this.ySize,
				allowed: !0,
				neighbour: ['A', 'B']
			}, {
				name: 'D',
				x: (325 + 2 * this.lengthSide) * this.xSize,
				y: (345 + .86 * this.lengthSide) * this.ySize,
				allowed: !0,
				neighbour: ['A', 'B', 'E']
			}, {
				name: 'E',
				x: (329 + 2 * this.lengthSide + 136) * this.xSize,
				y: 343 * this.ySize,
				allowed: !0,
				neighbour: ['B', 'D']
			}];
		}

		return r(e, [{
			key: 'reSize', value: function (e) {
				this.xSize = e.width / i, this.ySize = e.height / a, this.allowedCoord = [{
					name: 'A',
					x: 365 * this.xSize,
					y: 345 * this.ySize,
					allowed: !0,
					neighbour: ['B', 'C', 'D']
				}, {
					name: 'B',
					x: (321 + 2 * this.lengthSide) * this.xSize,
					y: (345 - .86 * this.lengthSide) * this.ySize,
					allowed: !0,
					neighbour: ['A', 'C', 'D', 'E']
				}, {
					name: 'C',
					x: 365 * this.xSize,
					y: (345 - .86 * this.lengthSide * 2) * this.ySize,
					allowed: !0,
					neighbour: ['A', 'B']
				}, {
					name: 'D',
					x: (321 + 2 * this.lengthSide) * this.xSize,
					y: (345 + .86 * this.lengthSide) * this.ySize,
					allowed: !0,
					neighbour: ['A', 'B', 'E']
				}, {
					name: 'E',
					x: (321 + 2 * this.lengthSide + 136) * this.xSize,
					y: 345 * this.ySize,
					allowed: !0,
					neighbour: ['B', 'D']
				}];
			}
		}]), e;
	}();
	t.default = o;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(0), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e() {
			var t = this;
			if (function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				}(this, e), e.__instance) return e.__instance;
			var n = 'wss://rha-backend.herokuapp.com/multiplayer/rand';
			this.ws = new WebSocket(n), this.ws.onopen = function (e) {
				console.log('WebSocket on address ' + n + ' opened'), o.default.emit('connected', {}), t.ws.onmessage = t.handleMessage.bind(t), t.ws.onclose = function (e) {
					console.log(e), console.log('WebSocket closed');
				};
			}, e.__instance = this;
		}

		return i(e, [{
			key: 'handleMessage', value: function (e) {
				var t = e.data;
				console.log('got message ', t);
				try {
					var n = JSON.parse(t);
					o.default.emit(n.class, n);
				} catch (e) {
					console.error('smth went wront in handleMessage: ', e);
				}
			}
		}, {
			key: 'send', value: function (e, t) {
				console.log('sent message: type - ', e, ' data - ', t), this.ws.send(JSON.stringify({
					class: e,
					payload: t
				}));
			}
		}]), e;
	}();
	t.default = s;
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t = '', n = e || {};
		return function (e, n, i) {
			t = t + '<div class="info-menu"><div class="about-region" id="about-region"></div></div><div class="canvas-wrap"><canvas class="canvas"' + r.attr('width', i, !0, !0) + r.attr('height', e, !0, !0) + r.attr('id', n, !0, !0) + '></canvas></div><div class="chat"></div><div class="control-interface"><div class="change"></div></div>';
		}.call(this, 'height' in n ? n.height : 'undefined' != typeof height ? height : void 0, 'id' in n ? n.id : 'undefined' != typeof id ? id : void 0, 'width' in n ? n.width : 'undefined' != typeof width ? width : void 0), t;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(12)), a = s(n(0)), o = s(n(58));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function (e) {
		function t(e, n, r, i) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var a = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, r, i));
			return a.listeners(), a;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'listeners', value: function () {
				var e = this;
				a.default.on('bot-move', function (t) {
					if (t.payload.name === e.name) {
						for (var n = [], r = 0; r < e.regions.length; r++) 0 !== e.regions[r].neighbour.length && n.push(e.regions[r]);
						var i = (0, o.default)(0, n.length - 1);
						a.default.emit('bot-attack', {
							from: n[i],
							to: n[i].neighbour[(0, o.default)(0, n[i].neighbour.length - 1)]
						}), setTimeout(function () {
							a.default.emit('bot-change-move', 'bot');
						}, 1e3);
					}
				});
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.renderScene = function (e, t, n) {
		var r = e.getContext('2d');
		r.clearRect(0, 0, e.width, e.height), r.drawImage(n, 0, 0, e.width, e.height), t.forEach(function (e) {
			e.renderHex();
		});
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(12)), a = s(n(8)), o = s(n(0));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function (e) {
		function t(e, n, r, i) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var o = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, r, i));
			return o.status = a.default.DEFAULT, o;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'delRegion', value: function (e) {
				for (var t = 0; t < this.regions.length; ++t) this.regions[t] === e && this.regions.splice(t, 1);
				0 === this.regions.length && (this.status = a.default.LOSE, o.default.emit('gameover', {}));
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
				}
			}

			return function (t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t;
			};
		}(), i = v(n(20)), a = v(n(18)), o = v(n(57)), s = v(n(54)), u = v(n(47)), l = v(n(46)), c = v(n(0)), f = n(7),
		d = v(n(16)), h = v(n(1)), p = v(n(43));

	function v(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var g = function () {
		function e(t, n, r, v, g) {
			var m = this;
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.listeners = {}, e.__instance = this, this.mode = t, this.game_canvas = n, this.coordinate = r, this.game_ctx = this.game_canvas.getContext('2d'), this.img = g, this.scene = null, this.controller = new u.default(this.game_canvas, v, this.mode), console.log(this.mode), this.mode === f.GameModes.singleplayer ? (this.players = [new i.default('A', 'rgba(0,255,127,0.4)', this.game_canvas, this.img), new a.default('B', 'rgba(0,0,205,0.4)', this.game_canvas, this.img), new a.default('C', 'rgba(255,69,0,0.4)', this.game_canvas, this.img), new a.default('D', 'rgba(139,125,107,0.4)', this.game_canvas, this.img), new a.default('E', 'rgba(255,165,0,0.4)', this.game_canvas, this.img)], this.regions = [], this.players.forEach(function (e, t, n) {
				m.regions.push(new o.default(e.name, e, m.game_canvas, m.coordinate, 1e3 * (n.length - t)));
			}), this.players.forEach(function (e) {
				e.setAllRegtions(m.regions);
			}), this.regions.forEach(function (e) {
				e.setGlobalRegions(m.regions);
			}), this.scene = new l.default(this.game_canvas, this.players, this.regions, this.mode), this.manager = new s.default(this.controller, this.game_canvas, this.regions, this.img, this.mode)) : (this.Ws = new d.default, c.default.on('connected', function () {
				m.Ws.send('JoinGame$Request', {}), c.default.on('InitGame$Request', function (e) {
					var t = e.payload, n = h.default.getCurUser().username, r = void 0;
					t.players.forEach(function (e, t) {
						e === n && (r = t + 1);
					}), m.players = [], m.regions = [], m.botPlayer = new a.default('bot', 'rgba(0,0,205,0.4)', m.game_canvas, m.img), t.map.forEach(function (e, a) {
						if (e.owner === r) {
							var s = new i.default(n, 'rgba(0,255,127,0.4)', m.game_canvas, m.img);
							m.players.push(s);
							var u = new o.default(n, s, m.game_canvas, m.coordinate, e.units);
							m.regions.push(u);
						} else if (0 === e.owner) {
							var l = new o.default(String(a), m.botPlayer, m.game_canvas, m.coordinate, 0);
							m.regions.push(l);
						} else t.players.forEach(function (t, n) {
							if (e.owner === n + 1) {
								console.log('in else'), m.webPlayer = new p.default(t, 'rgba(255,69,0,0.4)', m.game_canvas, m.img), m.players.push(m.webPlayer);
								var r = new o.default(t, m.webPlayer, m.game_canvas, m.coordinate, e.units);
								m.regions.push(r);
							}
						});
					}), m.players.forEach(function (e) {
						e.setAllRegtions(m.regions);
					}), console.log(n), console.log(t), m.scene = new l.default(m.game_canvas, m.players, m.regions, m.mode), m.manager = new s.default(m.controller, m.game_canvas, m.regions, m.img, m.mode), m.start();
				});
			}));
		}

		return r(e, [{
			key: 'start', value: function () {
				this.controller.start(), this.scene.onListeners(), this.manager.start(), c.default.emit('start-game', {});
			}
		}, {
			key: 'destroy', value: function () {
				this.controller.stop(), this.manager.destroy();
			}
		}]), e;
	}();
	t.default = g;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(13), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e);
		}

		return i(e, null, [{
			key: 'get', value: function (e, t) {
				return this.request('GET', e).then(function (e) {
					if (200 === e.status) try {
						t(null, e.json());
					} catch (e) {
						console.error('get error: ', e);
					} else t(e, null);
				});
			}
		}, {
			key: 'post', value: function (e, t, n) {
				return this.request('POST', e, t).then(function (e) {
					if (e.status < 300) try {
						n(null, e.json());
					} catch (e) {
						console.error('post error: ', e), n(e);
					} else n(e);
				});
			}
		}, {
			key: 'request', value: function (e, t, n) {
				var r = new Headers;
				'POST' === e && 'users/chava' !== t && r.append('Content-Type', 'application/json; charset=utf-8');
				var i = {method: e, headers: r, body: n, credentials: 'include', mode: 'cors'};
				return fetch('' + o.default.serverUrl + t, i);
			}
		}]), e;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		return function (e, t) {
			if (Array.isArray(e)) return e;
			if (Symbol.iterator in Object(e)) return function (e, t) {
				var n = [], r = !0, i = !1, a = void 0;
				try {
					for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0) ;
				} catch (e) {
					i = !0, a = e;
				} finally {
					try {
						!r && s.return && s.return();
					} finally {
						if (i) throw a;
					}
				}
				return n;
			}(e, t);
			throw new TypeError('Invalid attempt to destructure non-iterable instance');
		};
	}(), i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = c(n(3)), o = c(n(21)), s = c(n(0)), u = c(n(15)), l = n(7);

	function c(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var f = n(14), d = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.parent = document.getElementById('game'), e.wrapper = document.createElement('div'), e.wrapper.classList.add('wrapper'), e.wrapper.innerHTML += f({
				width: .7 * window.innerWidth,
				height: .525 * window.innerWidth * .83,
				id: 'game-canvas'
			}), e.height_canv = .83 * window.innerHeight, e.parent.appendChild(e.wrapper), e.game_canvas = document.getElementById('game-canvas'), e.ctx = e.game_canvas.getContext('2d'), e.game_canvas.style.marginTop = String(100 - 100 * e.game_canvas.height / e.height_canv) / 2 + '%', e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, a.default), i(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.img = new Image, this.img.src = '/map.png', this.load = new Promise(function (t) {
					e.img.onload = function () {
						t(e.ctx.drawImage(e.img, 0, 0, e.game_canvas.width, e.game_canvas.height));
					};
				}), this.load.then(function () {
					e.setWindowResizeHandler(), e.coordinate = new u.default(e.game_canvas), e.changeBut = e.wrapper.getElementsByClassName('change')[0], e.game = new o.default(l.GameModes.singleplayer, e.game_canvas, e.coordinate, e.changeBut, e.img), e.game.start();
				}), s.default.on('gameover', function () {
					alert('gameover'), e.game.destroy(), history.go('/singleplayer');
				}), this.wrapper;
			}
		}, {
			key: 'allowed', value: function () {
				return !0;
			}
		}, {
			key: 'computeCanvasSize', value: function () {
				return [.7 * window.innerWidth, .525 * window.innerWidth * .83];
			}
		}, {
			key: 'setWindowResizeHandler', value: function () {
				var e = this;
				return window.addEventListener('resize', function () {
					e.game_canvas.width, e.game_canvas.height;
					var t = e.computeCanvasSize(), n = r(t, 2);
					e.game_canvas.width = n[0], e.game_canvas.height = n[1], e.ctx.drawImage(e.img, 0, 0, e.game_canvas.width, e.game_canvas.height), e.coordinate.reSize(e.game_canvas), e.game_canvas.style.marginTop = String(100 - 100 * e.game_canvas.height / e.height_canv) / 2 + '%', s.default.emit('resize-for-draw', {});
				}), this;
			}
		}]), t;
	}();
	t.default = d;
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t, n = '', i = e || {};
		return function (e) {
			n += '<div class="div__menu-wrapper"><div class="left-top"><div class="screw"><div class="screw_bottom"></div></div></div><div class="right-top"><div class="screw"><div class="screw_bottom"></div></div></div><div class="left-bot"><div class="screw"><div class="screw_bottom"></div></div></div><div class="right-bot"><div class="screw"><div class="screw_bottom"></div></div></div><h2>MENU<ul>', function () {
				var i = e;
				if ('number' == typeof i.length) for (var a = 0, o = i.length; a < o; a++) {
					var s = i[a];
					n = n + '<li class="li__menu"><div class="div__menu-btn-wrapper"><div class="planck"><div class="left"><div class="screw"><div class="screw_bottom"></div></div></div><div class="right"><div class="screw"><div class="screw_bottom"></div></div></div><div class="lamp-box"><div class="red-lamp"></div></div><div class="button"><a' + r.attr('href', s.href, !0, !0) + '>' + r.escape(null == (t = s.title) ? '' : t) + '</a></div></div></div></li>';
				} else for (var a in o = 0, i) o++, s = i[a], n = n + '<li class="li__menu"><div class="div__menu-btn-wrapper"><div class="planck"><div class="left"><div class="screw"><div class="screw_bottom"></div></div></div><div class="right"><div class="screw"><div class="screw_bottom"></div></div></div><div class="lamp-box"><div class="red-lamp"></div></div><div class="button"><a' + r.attr('href', s.href, !0, !0) + '>' + r.escape(null == (t = s.title) ? '' : t) + '</a></div></div></div></li>';
			}.call(this), n += '</ul></h2></div>';
		}.call(this, 'attrs' in i ? i.attrs : 'undefined' != typeof attrs ? attrs : void 0), n;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = u(n(3)), a = u(n(0)), o = u(n(4)), s = u(n(1));

	function u(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var l = n(24), c = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.sign(), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				return this.menu = document.createElement('div'), this.attrsActive = [{
					title: 'singleplayer',
					href: '/singleplayer'
				}, {title: 'multiplayer', href: '/multiplayer'}, {title: 'profile', href: '/profile'}, {
					title: 'rating',
					href: '/rating'
				}], this.attrPassive = [{title: 'singleplayer', href: '/singleplayer'}, {
					title: 'Sign In',
					href: '/login'
				}, {
					title: 'Sign Up',
					href: '/register'
				}], s.default.isAuthorized() ? (this.menu.innerHTML = l({attrs: this.attrsActive}), this.logout = document.createElement('a'), this.logout.setAttribute('href', '/'), this.logout.innerText = 'logout', this.logout.addEventListener('click', function (e) {
					e.preventDefault(), a.default.emit('logout', null);
				}), this.logoutWrapper = document.createElement('div'), this.logoutWrapper.classList.add('button'), this.logoutWrapper.appendChild(this.logout), this.menu.appendChild(this.logoutWrapper)) : this.menu.innerHTML = l({attrs: this.attrPassive}), this.menu;
			}
		}, {
			key: 'allowed', value: function () {
				return !0;
			}
		}, {
			key: 'sign', value: function () {
				var e = this;
				a.default.on('user:authorized', function () {
					e.allow = !0, (new o.default).open('/menu');
				}), a.default.on('user:unauthorized', function () {
					e.allow = !1;
				}), a.default.on('menu:hide', function () {
					e.hide();
				});
			}
		}, {
			key: 'hide', value: function () {
				this.menu.setAttribute('hidden', 'hidden');
			}
		}]), t;
	}();
	t.default = c;
}, function (e, t, n) {
	n(2);
	e.exports = function (e) {
		var t = '';
		return t += '<div class="form-wrapper"><h2>Sign In</h2><div class="button"><a href="/">Back to menu</a></div></div>';
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(6)), a = s(n(5)), o = s(n(9));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function (e) {
		function t() {
			return function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t), function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'getData', value: function () {
				var e = this.Email.getData(), t = this.Password.getData();
				return '' === e || '' === t ? null : {email: e, password: t};
			}
		}, {
			key: 'render', value: function () {
				var e = this;
				return this.Email = new a.default({
					type: 'text',
					placeholder: 'email',
					id: 'loginEmail'
				}), this.Password = new a.default({
					type: 'password',
					placeholder: 'password',
					id: 'loginPassword'
				}), this.InputSubmit = new a.default({
					type: 'submit',
					value: 'Sign In',
					id: 'loginSubmit'
				}), this.Email.setOnInputChange(function () {
					o.default.checkMail(e.Email);
				}), this.Password.setOnInputChange(function () {
					o.default.checkPass(e.Password);
				}), this.formElement.appendChild(this.Email.render()), this.formElement.appendChild(this.Password.render()), this.formElement.appendChild(this.InputSubmit.render()), this.formElement;
			}
		}, {
			key: 'setOnSubmit', value: function (e) {
				this.formElement.addEventListener('submit', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = u(n(3)), a = u(n(27)), o = u(n(0)), s = u(n(1));

	function u(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var l = n(26), c = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.sign(), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.login = document.createElement('div'), this.login.innerHTML = l(), this.after = this.login.getElementsByClassName('button')[0], this.loginForm = new a.default, this.login.firstChild.insertBefore(this.loginForm.render(), this.after), this.loginForm.setOnSubmit(function () {
					var t = e.loginForm.getData();
					if (null !== t) {
						var n = JSON.stringify(t);
						console.log(n), o.default.emit('user:login', n);
					} else e.loginForm.Email.setError('empty fields');
				}), this.login;
			}
		}, {
			key: 'allowed', value: function () {
				return !s.default.isAuthorized();
			}
		}, {
			key: 'sign', value: function () {
				var e = this;
				o.default.on('login-error', function (t) {
					e.loginForm.Email.setError(t.payload);
				});
			}
		}]), t;
	}();
	t.default = c;
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t, n = '', i = e || {};
		return function (e, i, a, o, s) {
			n += '<table class="scorboard_table"><thead><tr><td>Nickname</td><td>Score</td></tr></thead><tbody>', function () {
				var a = i;
				if ('number' == typeof a.length) for (var o = 0, s = a.length; o < s; o++) {
					var u = a[o];
					n = n + '<tr class="scorboard_row"><td>' + r.escape(null == (t = e.keys(u)) ? '' : t) + '</td><td>' + r.escape(null == (t = e.values(u)) ? '' : t) + '</td></tr>';
				} else for (var o in s = 0, a) s++, u = a[o], n = n + '<tr class="scorboard_row"><td>' + r.escape(null == (t = e.keys(u)) ? '' : t) + '</td><td>' + r.escape(null == (t = e.values(u)) ? '' : t) + '</td></tr>';
			}.call(this), n = n + '<tr><td>⋮</td></tr><tr class="scorboard_row"><td>' + r.escape(null == (t = e.keys(s)) ? '' : t) + '</td><td>' + r.escape(null == (t = e.values(s)) ? '' : t) + '</td></tr></tbody></table><br><div class="scorboard_pages"><p>Page ' + r.escape(null == (t = a) ? '' : t) + ' of ' + r.escape(null == (t = e.values(o)) ? '' : t) + '</p></div>\x3c!--div.pagination#pagination--\x3e\x3c!--    a#prevBut(href="#") <--\x3e\x3c!--    a#nextBut(href="#") >--\x3e\x3c!----\x3e';
		}.call(this, 'Object' in i ? i.Object : 'undefined' != typeof Object ? Object : void 0, 'data' in i ? i.data : 'undefined' != typeof data ? data : void 0, 'page' in i ? i.page : 'undefined' != typeof page ? page : void 0, 'pages' in i ? i.pages : 'undefined' != typeof pages ? pages : void 0, 'user' in i ? i.user : 'undefined' != typeof user ? user : void 0), n;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = l(n(22)), a = l(n(13)), o = l(n(0)), s = l(n(4)), u = l(n(1));

	function l(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var c = new (function () {
		function e() {
			if (function (e, t) {
					if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
				}(this, e), e.__instance) return e.__instance;
			o.default.on('user:signup', function (e) {
				var t = e.payload;
				u.default.signUp(t).then(function () {
					(new s.default).open('/');
				}).catch(function (e) {
					o.default.emit('signup-error', e);
				});
			}), o.default.on('logout', function () {
				u.default.logout().then(function () {
					(new s.default).open('/');
				}).catch(function (e) {
					o.default.emit('logout-error', e);
				});
			}), o.default.on('user:login', function (e) {
				var t = e.payload;
				u.default.signIn(t).then(function () {
					(new s.default).open('/');
				}).catch(function (e) {
					o.default.emit('login-error', e);
				});
			}), o.default.on('user:update', function (e) {
				var t = e.payload;
				u.default.update(t).then(function () {
					(new s.default).open('/');
				}).catch(function (e) {
					o.default.emit('update-error', e);
				});
			}), o.default.on('user:avatarUpload', function (e) {
				var t = e.payload;
				console.log(t), u.default.uploadAvatar(t).then(function () {
					(new s.default).open('/profile');
				}).catch(function (e) {
					console.log(e);
				});
			}), e.__instance = this;
		}

		return r(e, [{
			key: 'rating', value: function (e, t) {
				return i.default.get(a.default.userAPIMethods.leaderBoard + '/' + e.toString(), t);
			}
		}]), e;
	}());
	t.default = c;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = u(n(3)), a = u(n(30)), o = u(n(0)), s = u(n(1));

	function u(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var l = n(29), c = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.page = 1, e.sign(), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.rating = document.createElement('div'), this.rating.innerHTML = '', this.paginationWrap = document.createElement('div'), this.paginationWrap.classList.add('pagination'), this.prevButt = document.createElement('a'), this.prevButt.innerText = '<', this.prevButt.addEventListener('click', function (t) {
					t.preventDefault(), e.rating.removeChild(e.rating.firstChild), e.page--, e.prevButt.hidden = 1 === e.page, e.nextButt.hidden = !1, e.load(e.page);
				}), this.nextButt = document.createElement('a'), this.nextButt.innerText = '>', this.nextButt.addEventListener('click', function (t) {
					t.preventDefault(), e.rating.removeChild(e.rating.firstChild), e.page++, 1 !== e.page && (e.prevButt.hidden = !1), e.load(e.page, function (t) {
						t && (e.nextButt.hidden = !0, e.lastPage = document.createElement('div'), e.lastPage.innerText = 'This is the last page', e.rating.insertBefore(e.lastPage, e.rating.firstChild));
					});
				}), this.prevButt.hidden = 1 === this.page, this.paginationWrap.appendChild(this.prevButt), this.paginationWrap.appendChild(this.nextButt), this.backButtWrap = document.createElement('div'), this.backButtWrap.classList.add('button'), this.backButtWrap.classList.add('back-button'), this.backButt = document.createElement('a'), this.backButt.setAttribute('href', '/'), this.backButt.innerText = 'Back to menu', this.backButtWrap.appendChild(this.backButt), this.load(1, function () {
				}), this.rating.appendChild(this.paginationWrap), this.rating.appendChild(this.backButtWrap), this.rating;
			}
		}, {
			key: 'load', value: function (e, t) {
				var n = this;
				console.log(e), a.default.rating(e, function (r, i) {
					if (r) return console.error(r), void t(!0);
					console.log(r, i), i.then(function (t) {
						n.table = document.createElement('div'), n.table.innerHTML = l({
							data: t[0],
							user: t[1][0],
							pages: t[2][0],
							page: e
						}), n.rating.insertBefore(n.table, n.rating.firstChild);
					});
				});
			}
		}, {
			key: 'sign', value: function () {
				var e = this;
				o.default.on('user:authorized', function (t) {
					e.allowed = !0;
				}), o.default.on('user:unauthorized', function (t) {
					e.allowed = !1;
				});
			}
		}, {
			key: 'allowed', value: function () {
				return s.default.isAuthorized();
			}
		}]), t;
	}();
	t.default = c;
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t, n = '', i = e || {};
		return function (e) {
			n = n + '<div class="div__avatar-wrapper"><img class="avatar" src="default.jpg" id="avatar"><table class="table__profile"><tr class="tr__profile"><td>Email:</td><td>' + r.escape(null == (t = e.email) ? '' : t) + '</td></tr><tr class="tr__profile"><td>Rating:</td><td>' + r.escape(null == (t = e.rating) ? '' : t) + '</td></tr></table></div>';
		}.call(this, 'user' in i ? i.user : 'undefined' != typeof user ? user : void 0), n;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = o(n(6)), a = o(n(5));

	function o(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var s = function (e) {
		function t(e) {
			return function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t), function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'getData', value: function () {
				var e = this.UploadInput.getFormData();
				return '' === e ? null : {avatar: e};
			}
		}, {
			key: 'render', value: function () {
				return this.UploadInput = new a.default({
					type: 'file',
					placeholder: '',
					id: 'loadImageInput'
				}), this.UploadSubmit = new a.default({
					type: 'submit',
					value: 'Save picture',
					id: 'loadImageSubmit'
				}), this.formElement.appendChild(this.UploadInput.render()), this.formElement.appendChild(this.UploadSubmit.render()), this.formElement.setAttribute('enctype', 'multipart/form-data'), this.formElement.setAttribute('name', 'form_loadFile'), this.formElement.classList.add('form-loadFile'), this.formElement;
			}
		}, {
			key: 'setOnSubmit', value: function (e) {
				this.formElement.addEventListener('submit', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.default = function (e, t) {
		for (; t.firstChild;) t.removeChild(t.firstChild);
		t.appendChild(e);
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.sectionSwitcher = void 0;
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(34), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e);
		}

		return i(e, [{
			key: 'changeSection', value: function (e, t) {
				(0, o.default)(e, t);
			}
		}]), e;
	}(), u = new s;
	t.sectionSwitcher = u, t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(10), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function (e) {
		function t(e, n, r) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var i = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return i.buttonWrapper = document.createElement('div'), i.buttonElement = document.createElement('button'), i.buttonElement.classList.add('btn-style'), i.buttonElement.classList.add('button'), i.buttonElement.innerHTML = n, i.buttonElement.type = e, r && r.appendChild(i.buttonWrapper), i.buttonWrapper.classList.add('page-button'), i.buttonWrapper.appendChild(i.buttonElement), i;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, o.default), i(t, [{
			key: 'render', value: function () {
				return this.buttonWrapper;
			}
		}, {
			key: 'hide', value: function () {
				this.buttonWrapper.classList.add('hidden');
			}
		}, {
			key: 'show', value: function () {
				this.buttonWrapper.classList.remove('hidden');
			}
		}, {
			key: 'setOnClick', value: function (e) {
				this.buttonElement.addEventListener('click', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(6)), a = s(n(5)), o = s(n(9));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function (e) {
		function t() {
			return function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t), function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'getData', value: function () {
				return {oldp: this.OldPassword.getData(), newp: this.Password.getData()};
			}
		}, {
			key: 'render', value: function () {
				var e = this;
				return this.OldPassword = new a.default({
					type: 'password',
					placeholder: 'old password',
					id: 'changeOld'
				}), this.Password = new a.default({
					type: 'password',
					placeholder: 'new password',
					id: 'changeNew'
				}), this.RepeatPassword = new a.default({
					type: 'password',
					placeholder: 'repeat password',
					id: 'changeRepeat'
				}), this.InputSubmit = new a.default({
					type: 'submit',
					value: 'Save',
					id: 'changeSubmit'
				}), this.OldPassword.setOnInputChange(function () {
					o.default.checkPass(e.OldPassword);
				}), this.Password.setOnInputChange(function () {
					o.default.checkPass(e.Password);
				}), this.RepeatPassword.setOnInputChange(function () {
					o.default.checkConfirm(e.Password, e.RepeatPassword);
				}), this.formElement.appendChild(this.OldPassword.render()), this.formElement.appendChild(this.Password.render()), this.formElement.appendChild(this.RepeatPassword.render()), this.formElement.appendChild(this.InputSubmit.render()), this.formElement;
			}
		}, {
			key: 'setOnSubmit', value: function (e) {
				this.formElement.addEventListener('submit', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = f(n(3)), a = f(n(37)), o = f(n(36)), s = f(n(0)), u = f(n(1)), l = f(n(4)), c = f(n(33));

	function f(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var d = n(32), h = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.sign(), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.profileElement = document.createElement('div'), this.profileElement.classList.add('div__profile-wrapper'), this.attrs = u.default.getCurUser(), this.profileTable = document.createElement('div'), this.profileTable.innerHTML = d({user: this.attrs}), this.profileElement.appendChild(this.profileTable), this.profileElement.appendChild(document.createElement('hr')), this.fileForm = new c.default, this.profileElement.appendChild(this.fileForm.render()), this.changeForm = new a.default, this.profileElement.appendChild(this.changeForm.render()), this.backButt = new o.default('button', 'Back', this.profileElement), this.backButt.setOnClick(function () {
					(new l.default).open('/');
				}), this.changeForm.setOnSubmit(function () {
					var t = e.changeForm.getData(), n = JSON.stringify(t);
					s.default.emit('user:update', n);
				}), this.fileForm.setOnSubmit(function () {
					var e = document.getElementById('loadImageInput'), t = new FormData, n = e.files[0];
					t.append('image', n), s.default.emit('user:avatarUpload', t);
				}), this.profileElement;
			}
		}, {
			key: 'allowed', value: function () {
				return u.default.isAuthorized();
			}
		}, {
			key: 'sign', value: function () {
				var e = this;
				s.default.on('update:error', function (t) {
					e.changeForm.Email.setError(t.payload);
				});
			}
		}]), t;
	}();
	t.default = h;
}, function (e, t, n) {
	n(2);
	e.exports = function (e) {
		var t = '';
		return t += '<div class="form-wrapper" id="registerSection"><h2>Sign Up</h2><div class="button"><a href="/">Back to menu</a></div></div>';
	};
}, function (e, t, n) {
	var r = n(2);
	e.exports = function (e) {
		var t = '', n = e || {};
		return function (e, n, i, a, o, s) {
			t = t + '<input' + (r.attr('class', r.classes([e], [!0]), !1, !0) + r.attr('type', o, !0, !0) + r.attr('placeholder', a, !0, !0) + r.attr('value', s, !0, !0) + r.attr('id', i, !0, !0)) + '><div class="error input__error"' + r.attr('id', n, !0, !0) + '></div>';
		}.call(this, 'CLASS' in n ? n.CLASS : 'undefined' != typeof CLASS ? CLASS : void 0, 'error_id' in n ? n.error_id : 'undefined' != typeof error_id ? error_id : void 0, 'id' in n ? n.id : 'undefined' != typeof id ? id : void 0, 'placeholder' in n ? n.placeholder : 'undefined' != typeof placeholder ? placeholder : void 0, 'type' in n ? n.type : 'undefined' != typeof type ? type : void 0, 'value' in n ? n.value : 'undefined' != typeof value ? value : void 0), t;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(6)), a = s(n(5)), o = s(n(9));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function (e) {
		function t() {
			return function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t), function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.Email = new a.default({
					type: 'text',
					placeholder: 'email',
					id: 'registerEmail'
				}), this.Name = new a.default({
					type: 'text',
					placeholder: 'name',
					id: 'registerName'
				}), this.Password = new a.default({
					type: 'password',
					placeholder: 'password',
					id: 'registerPass'
				}), this.ConfirmPassword = new a.default({
					type: 'password',
					placeholder: 'confirm password',
					id: 'registerPass2'
				}), this.InputSubmit = new a.default({
					type: 'submit',
					value: 'Sign Up',
					id: 'registerSubmit'
				}), this.Email.setOnInputChange(function () {
					o.default.checkMail(e.Email);
				}), this.Name.setOnInputChange(function () {
					o.default.checkName(e.Name);
				}), this.Password.setOnInputChange(function () {
					o.default.checkPass(e.Password);
				}), this.ConfirmPassword.setOnInputChange(function () {
					o.default.checkConfirm(e.Password, e.ConfirmPassword);
				}), this.formElement.appendChild(this.Email.render()), this.formElement.appendChild(this.Name.render()), this.formElement.appendChild(this.Password.render()), this.formElement.appendChild(this.ConfirmPassword.render()), this.formElement.appendChild(this.InputSubmit.render()), this.formElement;
			}
		}, {
			key: 'getData', value: function () {
				var e = this.Name.getData(), t = this.Email.getData(), n = this.Password.getData();
				return '' === e || '' === t || '' === n ? null : {username: e, email: t, password: n};
			}
		}, {
			key: 'setOnSubmit', value: function (e) {
				this.formElement.addEventListener('submit', function (t) {
					t.preventDefault(), e();
				});
			}
		}]), t;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = u(n(3)), a = u(n(41)), o = u(n(0)), s = u(n(1));

	function u(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var l = n(39), c = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return s.default.isAuthorized(), e.sign(), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, i.default), r(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.register = document.createElement('div'), this.register.innerHTML = l(), this.registerForm = new a.default, this.after = this.register.getElementsByClassName('button')[0], this.register.firstChild.insertBefore(this.registerForm.render(), this.after), this.registerForm.setOnSubmit(function () {
					var t = e.registerForm.getData();
					if (console.log(t), null !== t) {
						var n = JSON.stringify(t);
						o.default.emit('user:signup', n), o.default.on('signup-error', function (t) {
							e.registerForm.Email.setError(t.payload);
						});
					} else e.registerForm.Email.setError('Empty fields');
				}), this.register;
			}
		}, {
			key: 'allowed', value: function () {
				return !s.default.isAuthorized();
			}
		}, {
			key: 'sign', value: function () {
				var e = this;
				o.default.on('signup-error', function (t) {
					e.registerForm.Email.setError(t.payload);
				});
			}
		}]), t;
	}();
	t.default = c;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(12), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function (e) {
		function t(e, n, r, i) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var a = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, r, i));
			return a.listeners(), a;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, o.default), i(t, [{
			key: 'listeners', value: function () {
			}
		}]), t;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.aboutRegion = function (e, t) {
		t.innerText = '', t.innerText += 'name: ', t.innerText += e.name, t.innerText += ' \n', t.innerText += 'region: ', t.innerText += e.gameData.units;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.default = function (e, t, n, r) {
		for (var i = n.length, a = i - 1, o = !1, s = 0; s < i; s++) (r[s] <= t && t < r[a] || r[a] <= t && t < r[s]) && e > (n[a] - n[s]) * (t - r[s]) / (r[a] - r[s]) + n[s] && (o = !o), a = s;
		return o;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = c(n(45)), a = c(n(0)), o = c(n(8)), s = n(44), u = c(n(16)), l = n(7);

	function c(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var f = function () {
		function e(t, n, r, i) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.mode = i, this.canvas = t, this.game_ctx = t.getContext('2d'), this.players = n, this.regions = r, this.about_region = document.getElementById('about-region'), console.log(this.players), this.setPlayersRegions(), i === l.GameModes.multiplayer && (this.ws = new u.default);
		}

		return r(e, [{
			key: 'currentPlayer', value: function () {
				for (var e = 0; e < this.players.length; ++e) if (this.players[e].status !== o.default.DISABLED) return this.players[e];
			}
		}, {
			key: 'nextPlayer', value: function () {
				for (var e = this.currentPlayer(), t = 0; t < this.players.length; ++t) if (this.players[t] === e) return t = (t + 1) % this.players.length, this.players[t];
			}
		}, {
			key: 'isRegion', value: function (e, t) {
				for (var n = 0; n < this.regions.length; ++n) if ((0, i.default)(e, t, this.regions[n].area.xp, this.regions[n].area.yp)) return this.regions[n];
				return null;
			}
		}, {
			key: 'isNeighbour', value: function (e, t) {
				for (var n = 0; n < e.neighbour.length; n++) if (t.label === e.neighbour[n]) return !0;
				return !1;
			}
		}, {
			key: 'activeRegion', value: function () {
				for (var e = 0; e < this.regions.length; ++e) if (!0 === this.regions[e].selected) return this.regions[e];
			}
		}, {
			key: 'deactivatePlayers', value: function () {
				this.players.forEach(function (e) {
					return e.active = !1;
				});
			}
		}, {
			key: 'setPlayersRegions', value: function () {
				for (var e = 0; e < this.players.length; e++) this.players[e].addRegion(this.regions[e]);
			}
		}, {
			key: 'onListeners', value: function () {
				var e = this;
				this.mode === l.GameModes.singleplayer ? (a.default.on('left-click', function (t) {
					var n = e.currentPlayer(), r = t.payload;
					if (n.status !== o.default.DISABLED) {
						var i = e.isRegion(r.x, r.y);
						if (i) switch (n.status) {
							case o.default.DEFAULT:
								if (!n.isTheRegionOfPlayer(i)) return;
								n.status = o.default.READY, (0, s.aboutRegion)(i, e.about_region), a.default.emit('select-region', i);
								break;
							case o.default.READY:
								if (!e.currentPlayer().isTheRegionOfPlayer(i)) return;
								i === e.activeRegion() && (n.status = o.default.DEFAULT), (0, s.aboutRegion)(i, e.about_region), a.default.emit('change-selection', {
									active: e.activeRegion(),
									new: i
								});
						}
					}
				}), a.default.on('contextmenu', function (t) {
					var n = e.currentPlayer(), r = e.activeRegion(), i = t.payload;
					if (n.status !== o.default.DISABLED && n.status === o.default.READY) {
						var u = e.isRegion(i.x, i.y);
						if (u) if (n.isTheRegionOfPlayer(u)) u.gameData.units += r.gameData.units, r.gameData.units = 0, a.default.emit('move-units', {
							active: e.activeRegion(),
							new: u
						}), (0, s.aboutRegion)(u, e.about_region); else {
							if (!1 === e.isNeighbour(r, u)) return;
							a.default.emit('attack', {from: e.activeRegion(), to: u});
						}
					}
				}), a.default.on('left-click-change', function () {
					var t = e.currentPlayer(), n = e.nextPlayer();
					t.status !== o.default.DISABLED && a.default.emit('change-move', {current: t, next: n});
				}), a.default.on('bot-attack', function (t) {
					for (var n = t.payload, r = 0; r < e.regions.length; ++r) n.to === e.regions[r].label && (console.log(n.from.owner, '     ---------'), a.default.emit('attack', {
						from: n.from,
						to: e.regions[r]
					}));
				}), a.default.on('bot-change-move', function () {
					a.default.emit('change-move', {current: e.currentPlayer(), next: e.nextPlayer()});
				}), a.default.on('delete-from-queue', function (t) {
					var n = t.payload;
					e.players.forEach(function (t, r) {
						t === n && e.players.splice(r, 1);
					});
				}), a.default.on('start-game', function () {
					a.default.emit('illum-cur', e.currentPlayer());
				})) : (a.default.on('left-click', function (t) {
					var n = t.payload, r = e.isRegion(n.x, n.y);
					if (r && e.players.isTheRegionOfPlayer(r)) switch ((0, s.aboutRegion)(r, e.about_region), e.players.status) {
						case o.default.DEFAULT:
							e.players.status = o.default.READY, a.default.emit('select-region', r);
							break;
						case o.default.READY:
							r === e.activeRegion() && (e.players.status = o.default.DEFAULT), a.default.emit('change-selection', {
								active: e.activeRegion(),
								new: r
							});
					}
				}), a.default.on('contextmenu', function (t) {
					var n = e.activeRegion(), r = t.payload;
					if (e.players.status !== o.default.DISABLED && e.players.status === o.default.READY) {
						var i = e.isRegion(r.x, r.y);
						i && !1 !== e.isNeighbour(n, i) && (new u.default).send('from-to', {
							from: e.activeRegion(),
							to: i
						});
					}
				}), a.default.on('left-click-change', function () {
					a.default.on('ws-change-move-confirm', function (e) {
						console.log(e), a.default.emit('change-move', {});
					});
				}), a.default.on('start-game', function (e) {
					console.log(e);
				}));
			}
		}]), e;
	}();
	t.default = f;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(0), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e(t, n, r) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.mode = r, this.game_canvas = t, this.changeBut = n, this.onclick = function (e) {
				console.log(e.offsetX, ' ', e.offsetY), o.default.emit('left-click', {x: e.offsetX, y: e.offsetY});
			}, this.mousemove = function (e) {
				o.default.emit('mousemove', {x: e.offsetX, y: e.offsetY});
			}, this.contextmenu = function (e) {
				e.preventDefault(), o.default.emit('contextmenu', {x: e.offsetX, y: e.offsetY});
			}, this.clickChangeBut = function (e) {
				o.default.emit('left-click-change', {});
			};
		}

		return i(e, [{
			key: 'start', value: function () {
				this.game_canvas.addEventListener('click', this.onclick), this.game_canvas.addEventListener('mousemove', this.mousemove), this.game_canvas.addEventListener('contextmenu', this.contextmenu), this.changeBut.addEventListener('click', this.clickChangeBut);
			}
		}, {
			key: 'stop', value: function () {
				this.game_canvas.removeEventListener('click', this.onclick), this.game_canvas.removeEventListener('mousemove', this.mousemove), this.game_canvas.removeEventListener('contextmenu', this.contextmenu), this.changeBut.removeEventListener('click', this.clickChangeBut);
			}
		}]), e;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.timer = void 0;
	var r, i = n(0), a = (r = i) && r.__esModule ? r : {default: r};
	t.timer = function (e) {
		var t = 30, n = !1, r = setInterval(function () {
			n && ++t, e.innerHTML = --t, 0 === t && (clearInterval(r), a.default.emit('left-click-change', {}));
		}, 1e3);
		a.default.on('left-click-change', function () {
			clearInterval(r);
		}), a.default.on('attack', function () {
			n = !0, setTimeout(function () {
				n = !1;
			}, 1e3);
		});
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.battleCalc = function (e, t) {
		return e.gameData.units - 2 * t.gameData.units > 0 ? (e.gameData.units -= 2 * t.gameData.units, t.gameData.units = 0, !0) : (t.gameData.units -= e.gameData.units / 2, e.gameData.units = 0, !1);
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.moveAnimation = void 0;
	var r = n(11), i = n(17);
	t.moveAnimation = function (e, t, n, a) {
		var o = document.getElementsByClassName('wrapper')[0], s = document.createElement('div');
		s.classList.add('attack-animation'), o.appendChild(s), s.innerHTML = i({
			width: .7 * window.innerWidth,
			height: window.innerHeight,
			id: 'attack-canvas'
		});
		var u = document.getElementById('attack-canvas').getContext('2d'), l = u.canvas.width, c = window.innerHeight,
			f = .01 * l, d = document.getElementById('game-canvas'),
			h = window.getComputedStyle(d).marginTop.match(/^[0-9]+/), p = Number(h);
		t += p, a += p;
		var v = Math.sqrt((e - n) * (e - n) + (t - a) * (t - a)), g = void 0, m = void 0, y = void 0, b = void 0,
			w = void 0, _ = void 0, E = void 0, k = void 0, O = void 0, P = void 0, C = void 0,
			S = u.createLinearGradient(n, a, e, t), x = u.createLinearGradient(n, a, e, t);
		(0, r.animate)(function (r) {
			P = r.toFixed(4), C = P / 1e3, u.clearRect(0, 0, l, c), u.lineWidth = f, S.addColorStop(0, '#030101'), S.addColorStop(.5, '#711615'), S.addColorStop(1, '#ee2357'), x.addColorStop(0, '#030101'), x.addColorStop(.5, '#0d3634'), x.addColorStop(1, '#ee2357'), u.fillStyle = S, u.strokeStyle = x, m = n + (e - n) * C, y = a + (t - a) * C, (g = Math.sqrt((m - n) * (m - n) + (y - a) * (y - a))) <= .76 * v && (k = m, O = y), g >= .75 * v && (b = .2 * (t - a) + k, w = .2 * (n - e) + O, _ = -.2 * (t - a) + k, E = -.2 * (n - e) + O, u.moveTo(b, w), u.lineTo(b + (e - b) * C, w + (t - w) * C), u.moveTo(_, E), u.lineTo(_ + (e - _) * C, E + (t - E) * C)), u.moveTo(n, a), u.lineTo(m, y), u.stroke(), u.fill();
		}, 1e3), setTimeout(function () {
			o.removeChild(o.lastChild);
		}, 1e3);
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.animationOverlay = void 0;
	var r = n(11);
	t.animationOverlay = function (e, t) {
		var n = document.getElementsByClassName('wrapper')[0], i = document.createElement('div');
		i.classList.add('overlay');
		var a = document.createElement('canvas');
		i.appendChild(a), a.setAttribute('id', 'overlay'), a.width = window.innerWidth, a.height = window.innerHeight, n.appendChild(i);
		var o = a.getContext('2d'), s = document.getElementById('game-canvas'),
			u = window.getComputedStyle(s).marginTop.match(/^[0-9]+/), l = Number(u);
		t += l;
		var c = o.canvas.width, f = o.canvas.height, d = void 0,
			h = o.createLinearGradient(e - .02 * c * .66, t - .02 * c * .66, e + .02 * c * .66, t + .02 * c * .66),
			p = o.createLinearGradient(e - .02 * c * .66, t - .02 * c * .66, e + .02 * c * .66, t + .02 * c * .66);
		(0, r.animate)(function (n) {
			d = (n / 1e3 * Math.PI * 2 * 10).toFixed(2), o.clearRect(0, 0, c, f), o.lineWidth = 10, h.addColorStop(0, '#030101'), h.addColorStop(.5, '#711615'), h.addColorStop(1, '#ee2357'), p.addColorStop(0, '#030101'), p.addColorStop(.5, '#0d3634'), p.addColorStop(1, '#ffffff'), o.fillStyle = h, o.strokeStyle = p, o.beginPath(), o.arc(e, t, .02 * c, 4.72, d / 10 + 4.72, !1), o.stroke();
		}, 1e3), setTimeout(function () {
			n.removeChild(n.lastChild);
		}, 1e3);
	};
}, function (e, t) {
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0}), t.attackAnimation = void 0;
	var r = n(11), i = n(17);
	t.attackAnimation = function (e, t, n, a) {
		var o = document.getElementsByClassName('wrapper')[0], s = document.createElement('div');
		s.classList.add('attack-animation'), o.appendChild(s), s.innerHTML = i({
			width: .7 * window.innerWidth,
			height: window.innerHeight,
			id: 'attack-canvas'
		});
		var u = document.getElementById('attack-canvas').getContext('2d'), l = u.canvas.width, c = window.innerHeight,
			f = document.getElementById('game-canvas'), d = window.getComputedStyle(f).marginTop.match(/^[0-9]+/),
			h = Number(d);
		t += h, a += h;
		var p = .03 * l, v = .01 * l, g = e - p * Math.sin(Math.PI / 4), m = t - p * Math.sin(Math.PI / 4),
			y = e + p * Math.sin(Math.PI / 4), b = t + p * Math.sin(Math.PI / 4), w = void 0, _ = void 0,
			E = u.createLinearGradient(g, m, y, b), k = u.createLinearGradient(g, m, y, b);
		(0, r.animate)(function (r) {
			w = r.toFixed(2), _ = w / 1e3, u.clearRect(0, 0, l, c), u.lineWidth = v, E.addColorStop(0, '#030101'), E.addColorStop(.5, '#711615'), E.addColorStop(1, '#ee2357'), k.addColorStop(0, '#030101'), k.addColorStop(.5, '#0d3634'), k.addColorStop(1, '#ee2357'), u.fillStyle = E, u.strokeStyle = k;
			var i = 2 * p * Math.sin(Math.PI / 4) + g;
			w / 10 + g >= i && (w = 100), u.moveTo(g, m), u.lineTo(w / 10 + g, w / 10 + m), u.moveTo(i, m), u.lineTo(i - w / 10, w / 10 + m), u.moveTo(n, a), u.lineTo(n + (e - n) * _, a + (t - a) * _), u.stroke(), u.fill();
		}, 1e3), setTimeout(function () {
			o.removeChild(o.lastChild);
		}, 1e3);
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
			function e(e, t) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n];
					r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
				}
			}

			return function (t, n, r) {
				return n && e(t.prototype, n), r && e(t, r), t;
			};
		}(), i = p(n(0)), a = n(53), o = n(51), s = n(50), u = n(19), l = n(49), c = p(n(8)), f = p(n(20)), d = p(n(18)),
		h = n(48);

	function p(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var v = function () {
		function e(t, n, r, i, a) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.mode = a, this.controller = t, this.regions = r, this.canvas = n, this.img = i, this.timer = document.getElementById('timer'), this.log = document.getElementById('log');
		}

		return r(e, [{
			key: 'start', value: function () {
				var e = this;
				(0, h.timer)(this.timer), this.select_region = function (t) {
					var n = t.payload;
					n.selected = !0, n.area.setStroke('red'), (0, u.renderScene)(e.canvas, e.regions, e.img);
				}, this.change_selection = function (t) {
					var n = t.payload;
					n.active.selected = !1, n.new.selected = !0;
					var r = new Promise(function (e, t) {
						e(n.new.area.setStroke('red'));
					}), i = new Promise(function (e, t) {
						e(n.active.area.setStroke('white'));
					});
					r.then(function () {
						(0, u.renderScene)(e.canvas, e.regions, e.img);
					}), i.then(function () {
						(0, u.renderScene)(e.canvas, e.regions, e.img);
					});
				}, this.attack = function (t) {
					(0, o.animationOverlay)(window.innerWidth / 2, .92 * e.canvas.height);
					var n = t.payload, r = n.from, s = n.to;
					(0, a.attackAnimation)(s.area.xC, s.area.yC, r.area.xC, r.area.yC);
					var f = (0, l.battleCalc)(r, s);
					setTimeout(function () {
						f && (s.setColor(r.getColor()), s.owner.delRegion(s), 0 === s.owner.regions.length && (s.owner.setStatus(c.default.DISABLED), i.default.emit('delete-from-queue', s.owner)), i.default.emit('update-neighbour', {
							from: r,
							to: s
						}), r.owner.addRegion(s), s.area.setStroke('white'), (0, u.renderScene)(e.canvas, e.regions, e.img));
					}, 1e3), e.log.innerHTML = '<p>Player ' + r.name + ' attacked ' + s.name + '</p>';
				}, this.change_move = function (t) {
					e.regions.forEach(function (e) {
						e.area.setStroke('black');
					});
					var n = t.payload;
					n.current.setStatus(c.default.DISABLED), n.next.setStatus(c.default.DEFAULT), n.next instanceof f.default ? (n.next.regions.forEach(function (t) {
						t.area.setStroke('white'), (0, u.renderScene)(e.canvas, e.regions, e.img);
					}), (0, h.timer)(e.timer), e.controller.start()) : n.next instanceof d.default ? (n.next.regions.forEach(function (t) {
						t.area.setStroke('white'), (0, u.renderScene)(e.canvas, e.regions, e.img);
					}), e.controller.stop(), i.default.emit('bot-move', n.next)) : e.controller.stop();
				}, this.illum_cur = function (t) {
					t.payload.regions.forEach(function (t) {
						t.area.setStroke('white'), (0, u.renderScene)(e.canvas, e.regions, e.img);
					});
				}, this.move_units = function (t) {
					var n = t.payload;
					n.active.selected = !1, n.new.selected = !0, n.new.area.setStroke('red'), (0, u.renderScene)(e.canvas, e.regions, e.img), n.active.area.setStroke('white'), (0, s.moveAnimation)(n.new.area.xC, n.new.area.yC, n.active.area.xC, n.active.area.yC), (0, u.renderScene)(e.canvas, e.regions, e.img);
				}, i.default.on('change-selection', this.change_selection), i.default.on('select-region', this.select_region), i.default.on('change-move', this.change_move), i.default.on('move-units', this.move_units), i.default.on('illum-cur', this.illum_cur), i.default.on('attack', this.attack);
			}
		}, {
			key: 'destroy', value: function () {
				i.default.off('change-selection', this.change_selection), i.default.off('select-region', this.select_region), i.default.off('change-move', this.change_move), i.default.off('move-units', this.move_units), i.default.off('illum-cur', this.illum_cur), i.default.off('attack', this.attack);
			}
		}]), e;
	}();
	t.default = v;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.reachMatrix = [[0, 1, 1, 1, 0], [1, 0, 1, 1, 1], [1, 1, 0, 0, 0], [1, 1, 0, 0, 1], [0, 1, 0, 1, 0]];
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r, i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = n(0), o = (r = a) && r.__esModule ? r : {default: r};
	var s = function () {
		function e(t, n, r, i, a, s) {
			var u = this;
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.name = t, this.canvas = n, this.game_ctx = this.canvas.getContext('2d'), this.draw(r, i, a), this.xC = r, this.yC = i, this.color = a, this.strokeColor = 'black', o.default.on('resize-for-draw', function () {
				for (var e = 0; e < s.allowedCoord.length; e++) if (s.allowedCoord[e].name === u.name) {
					u.xC = s.allowedCoord[e].x, u.yC = s.allowedCoord[e].y;
					break;
				}
				u.draw();
			});
		}

		return i(e, [{
			key: 'setColor', value: function (e) {
				this.color = e;
			}
		}, {
			key: 'getColor', value: function () {
				return this.color;
			}
		}, {
			key: 'setStroke', value: function (e) {
				this.strokeColor = e;
			}
		}, {
			key: 'draw', value: function () {
				this.R = 90, this.dR = .866 * this.R, this.xp = [this.xC - this.R * this.canvas.width / 1e3, this.xC - this.R / 2 * this.canvas.width / 1e3, this.xC + this.R / 2 * this.canvas.width / 1e3, this.xC + this.R * this.canvas.width / 1e3, this.xC + this.R / 2 * this.canvas.width / 1e3, this.xC - this.R / 2 * this.canvas.width / 1e3, this.xC - this.R * this.canvas.width / 1e3], this.yp = [this.yC, this.yC + this.dR * this.canvas.height / 610, this.yC + this.dR * this.canvas.height / 610, this.yC, this.yC - this.dR * this.canvas.height / 610, this.yC - this.dR * this.canvas.height / 610, this.yC], this.game_ctx.beginPath(), this.game_ctx.lineJoin = 'round', this.game_ctx.lineWidth = 4, this.game_ctx.moveTo(this.xp[0], this.yp[0]);
				for (var e = 1; e < this.xp.length; ++e) this.game_ctx.lineTo(this.xp[e], this.yp[e]);
				this.game_ctx.strokeStyle = this.strokeColor, this.game_ctx.stroke(), this.game_ctx.fillStyle = this.color, this.game_ctx.fill(), this.game_ctx.closePath();
			}
		}, {
			key: 'reColor', value: function () {
				this.xp = [this.xC - this.R * this.canvas.width / 1e3, this.xC - this.R / 2 * this.canvas.width / 1e3, this.xC + this.R / 2 * this.canvas.width / 1e3, this.xC + this.R * this.canvas.width / 1e3, this.xC + this.R / 2 * this.canvas.width / 1e3, this.xC - this.R / 2 * this.canvas.width / 1e3, this.xC - this.R * this.canvas.width / 1e3], this.yp = [this.yC, this.yC + this.dR * this.canvas.height / 610, this.yC + this.dR * this.canvas.height / 610, this.yC, this.yC - this.dR * this.canvas.height / 610, this.yC - this.dR * this.canvas.height / 610, this.yC], this.game_ctx.beginPath(), this.game_ctx.moveTo(this.xp[0], this.yp[0]);
				for (var e = 1; e < this.xp.length; ++e) this.game_ctx.lineTo(this.xp[e], this.yp[e]);
				this.game_ctx.strokeStyle = 'rgba(255,255,255,0.8)', this.game_ctx.stroke(), this.game_ctx.closePath();
			}
		}]), e;
	}();
	t.default = s;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), i = s(n(56)), a = n(55), o = s(n(0));

	function s(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var u = function () {
		function e(t, n, r, i, a) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, e), this.name = t, this.canvas = r, this.game_ctx = this.canvas.getContext('2d'), this.selected = !1, this.allowedCoordinates = i.allowedCoord, this.coordinate = i, this.owner = n, this.color = n.color, this.gameData = {units: a}, this.setBusListeners(), this.area = null, this.label = null, this.globalRegions = null, this.neighbour = null, this.number = null, this.init();
		}

		return r(e, [{
			key: 'setColor', value: function (e) {
				this.area.setColor(e);
			}
		}, {
			key: 'getColor', value: function () {
				return this.area.getColor();
			}
		}, {
			key: 'setGlobalRegions', value: function (e) {
				this.globalRegions = e;
			}
		}, {
			key: 'renderHex', value: function () {
				this.area.draw();
			}
		}, {
			key: 'init', value: function () {
				for (var e = 0; e < this.allowedCoordinates.length; ++e) if (this.allowedCoordinates[e].allowed) return this.area = new i.default(this.allowedCoordinates[e].name, this.canvas, this.allowedCoordinates[e].x, this.allowedCoordinates[e].y, this.color, this.coordinate), this.number = e, this.neighbour = this.allowedCoordinates[e].neighbour, this.label = this.allowedCoordinates[e].name, void(this.allowedCoordinates[e].allowed = !1);
			}
		}, {
			key: 'setNeighbours', value: function (e) {
				var t = this;
				a.reachMatrix[e].forEach(function (e) {
					1 === e && t.neighbour.push(e + 1);
				});
			}
		}, {
			key: 'setBusListeners', value: function () {
				var e = this;
				o.default.on('update-neighbour', function (t) {
					var n = t.payload;
					n.from.name === e.name ? e.removeNeighbour(n.to.name) : n.to.name === e.name ? (n.from.owner.regions.forEach(function (t) {
						e.removeNeighbour(t.name);
					}), n.to.owner.regions.forEach(function (e) {
						if (1 === a.reachMatrix[n.to.number][e.number]) {
							for (var t = !1, r = 0; r < n.to.neighbour.length; ++r) n.to.neighbour[r] === e.name && (t = !0);
							!1 === t && n.to.neighbour.push(e.name);
						}
					})) : e.globalRegions.forEach(function (t) {
						if (t.name !== n.to.name || 1 !== a.reachMatrix[e.number][t.number]) ; else {
							for (var r = !1, i = 0; i < e.neighbour.length; ++i) e.neighbour[i] === n.to.name && (r = !0);
							!1 === r && e.neighbour.push(n.to.name);
						}
					});
				}), o.default.on('change-move', function (t) {
					e.gameData.units += 1e3;
				});
			}
		}, {
			key: 'removeNeighbour', value: function (e) {
				var t = this;
				this.neighbour.forEach(function (n, r) {
					n === e && t.neighbour.splice(r, 1);
				}), console.log(this.name, '  ', this.neighbour);
			}
		}]), e;
	}();
	t.default = u;
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	t.default = function (e, t) {
		return Math.floor(Math.random() * (t - e)) + e;
	};
}, function (e, t, n) {
	'use strict';
	Object.defineProperty(t, '__esModule', {value: !0});
	var r = function () {
		return function (e, t) {
			if (Array.isArray(e)) return e;
			if (Symbol.iterator in Object(e)) return function (e, t) {
				var n = [], r = !0, i = !1, a = void 0;
				try {
					for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0) ;
				} catch (e) {
					i = !0, a = e;
				} finally {
					try {
						!r && s.return && s.return();
					} finally {
						if (i) throw a;
					}
				}
				return n;
			}(e, t);
			throw new TypeError('Invalid attempt to destructure non-iterable instance');
		};
	}(), i = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var r = t[n];
				r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
			}
		}

		return function (t, n, r) {
			return n && e(t.prototype, n), r && e(t, r), t;
		};
	}(), a = c(n(3)), o = c(n(0)), s = c(n(21)), u = c(n(15)), l = n(7);

	function c(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var f = n(14), d = function (e) {
		function t() {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
			}(this, t);
			var e = function (e, t) {
				if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
				return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
			}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
			return e.parent = document.getElementById('game'), e.wrapper = document.createElement('div'), e.wrapper.classList.add('wrapper'), e.wrapper.innerHTML += f({
				width: .7 * window.innerWidth,
				height: .525 * window.innerWidth * .83,
				id: 'multiplayer-canvas'
			}), e.parent.appendChild(e.wrapper), e.game_canvas = document.getElementById('multiplayer-canvas'), e.ctx = e.game_canvas.getContext('2d'), e;
		}

		return function (e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t);
			e.prototype = Object.create(t && t.prototype, {
				constructor: {
					value: e,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
		}(t, a.default), i(t, [{
			key: 'render', value: function () {
				var e = this;
				return this.img = new Image, this.img.src = '/map.png', this.load = new Promise(function (t, n) {
					e.img.onload = function () {
						t(e.ctx.drawImage(e.img, 0, 0, e.game_canvas.width, e.game_canvas.height));
					};
				}), this.load.then(function () {
					e.setWindowResizeHandler(), e.coordinate = new u.default(e.game_canvas), e.changeBut = e.wrapper.getElementsByClassName('change')[0], e.game = new s.default(l.GameModes.multiplayer, e.game_canvas, e.coordinate, e.changeBut, e.img);
				}), this.wrapper;
			}
		}, {
			key: 'allowed', value: function () {
				return !0;
			}
		}, {
			key: 'computeCanvasSize', value: function () {
				return [.7 * window.innerWidth, .525 * window.innerWidth * .83];
			}
		}, {
			key: 'setWindowResizeHandler', value: function () {
				var e = this;
				return window.addEventListener('resize', function () {
					var t = e.computeCanvasSize(), n = r(t, 2);
					e.game_canvas.width = n[0], e.game_canvas.height = n[1], e.ctx.drawImage(e.img, 0, 0, e.game_canvas.width, e.game_canvas.height), e.coordinate.reSize(e.game_canvas), o.default.emit('resize-for-draw', {});
				}), this;
			}
		}]), t;
	}();
	t.default = d;
}, function (e, t, n) {
	'use strict';
	var r = d(n(59)), i = d(n(42)), a = d(n(38)), o = d(n(31)), s = d(n(28)), u = d(n(25)), l = d(n(23)), c = d(n(1)),
		f = d(n(4));

	function d(e) {
		return e && e.__esModule ? e : {default: e};
	}

	var h = document.getElementById('application'), p = document.getElementById('body');
	c.default.auth().then(function () {
		new f.default(h, p).add('/', u.default).add('/register', i.default).add('/profile', a.default).add('/rating', o.default).add('/multiplayer', r.default).add('/singleplayer', l.default).add('/login', s.default).start();
	}).catch();
}, function (e, t, n) {
	'use strict';
	var r = document.getElementById('radar'),
		i = Math.min(document.getElementById('radar-wrapper').offsetHeight, document.getElementById('radar-wrapper').offsetWidth) - 100,
		a = i / 2, o = Sketch.create({container: r, fullscreen: !1, width: i, height: i}), s = function (e) {
			return e * (Math.PI / 180);
		}, u = 270, l = Math.abs(50), c = o.createLinearGradient(a, 0, 0, 0);
	r.style.marginLeft = r.style.marginTop = -i / 2 - 14 + 'px', c.addColorStop(0, 'hsla( 120, 50%, 40%, 1 )'), c.addColorStop(1, 'hsla( 170, 50%, 40%, 0.1 )');
	o.clear = function () {
		o.globalCompositeOperation = 'destination-out', o.fillStyle = 'hsla( 0, 0%, 0%, 0.1 )', o.fillRect(0, 0, i, i);
	}, o.update = function () {
		u += 1.2;
	}, o.draw = function () {
		o.globalCompositeOperation = 'lighter', function () {
			var e;
			for (e = 0; e < 4; e++) o.beginPath(), o.arc(a, a, (a - 1) / 4 * (e + 1), 0, TWO_PI, !1), o.strokeStyle = 'hsla(' + (170 - e * (l / 4)) + ', 50%, 40%, 0.1)', o.lineWidth = 2, o.stroke();
		}(), o.beginPath(), o.moveTo(a - 1, 2), o.lineTo(a - 1, i - 2), o.moveTo(2, a - 1), o.lineTo(i - 2, a - 1), o.strokeStyle = 'hsla( 145, 50%, 40%, .03 )', o.stroke(), o.save(), o.translate(a, a), o.rotate(s(u)), o.beginPath(), o.moveTo(0, 0), o.arc(0, 0, a, s(-2), s(2), !1), o.closePath(), o.fillStyle = c, o.fill(), o.restore(), function () {
			var e;
			for (o.beginPath(), e = 0; e < i; e += 2) o.moveTo(0, e + .5), o.lineTo(i, e + .5);
			o.lineWidth = 1, o.strokeStyle = 'hsla( 0, 0%, 0%, .02 )', o.globalCompositeOperation = 'source-over', o.stroke();
		}();
	};
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, , function (e, t, n) {
}, function (e, t, n) {
	'use strict';
	n(89), n(87), n(85), n(83), n(81), n(79), n(77), n(75), n(73), n(71), n(69), n(67), n(65), n(63), n(61), n(60);
}]);
//# sourceMappingURL=bundle.js.map