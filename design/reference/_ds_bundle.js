/* @ds-bundle: {"format":4,"namespace":"AlboriOSDesignSystem_de9a4c","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"ListGroup","sourcePath":"components/lists/ListGroup.jsx"},{"name":"ListRow","sourcePath":"components/lists/ListRow.jsx"},{"name":"SectionHeader","sourcePath":"components/lists/SectionHeader.jsx"},{"name":"ALBORI_APPS","sourcePath":"components/system/AppIcon.jsx"},{"name":"AppIcon","sourcePath":"components/system/AppIcon.jsx"},{"name":"NavBar","sourcePath":"components/system/NavBar.jsx"},{"name":"NotificationCard","sourcePath":"components/system/NotificationCard.jsx"},{"name":"PhoneFrame","sourcePath":"components/system/PhoneFrame.jsx"},{"name":"QuickToggle","sourcePath":"components/system/QuickToggle.jsx"},{"name":"Sheet","sourcePath":"components/system/Sheet.jsx"},{"name":"StatusBar","sourcePath":"components/system/StatusBar.jsx"},{"name":"Wallpaper","sourcePath":"components/system/Wallpaper.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b0b3627682d7","components/core/Button.jsx":"44bf52bf5be2","components/core/Chip.jsx":"123a35190151","components/core/Icon.jsx":"47ab658ae297","components/core/IconButton.jsx":"6301dd12585a","components/core/ProgressBar.jsx":"2f5675bd542d","components/forms/Checkbox.jsx":"d8f12e64b7c4","components/forms/Radio.jsx":"ac556616ea5a","components/forms/SearchField.jsx":"4218481f6db7","components/forms/SegmentedControl.jsx":"8677c4955445","components/forms/Slider.jsx":"cb7231596091","components/forms/Switch.jsx":"a8c24d569ed7","components/lists/ListGroup.jsx":"f56c30917161","components/lists/ListRow.jsx":"481c543a50ce","components/lists/SectionHeader.jsx":"27b7a3808c76","components/system/AppIcon.jsx":"c0f6249aa1e3","components/system/NavBar.jsx":"63b633502248","components/system/NotificationCard.jsx":"1782cc60de06","components/system/PhoneFrame.jsx":"838010b0c928","components/system/QuickToggle.jsx":"d7a65ba5ad74","components/system/Sheet.jsx":"55d348a53ee1","components/system/StatusBar.jsx":"678a7aaf144e","components/system/Wallpaper.jsx":"3534a45b1bad","ui_kits/albori-os/os-shell.jsx":"9f88270f6b92","ui_kits/albori-os/screens-a.jsx":"126a50fda22a","ui_kits/albori-os/screens-b.jsx":"929e4e1f50d3","ui_kits/albori-os/screens-c.jsx":"893a2db3b46b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlboriOSDesignSystem_de9a4c = window.AlboriOSDesignSystem_de9a4c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE_URL = 'https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js';
const subs = new Set();
let started = false;
function ensureLucide() {
  if (started || typeof document === 'undefined') return;
  started = true;
  const done = () => subs.forEach(f => f());
  if (window.lucide && window.lucide.icons) return done();
  const s = document.createElement('script');
  s.src = LUCIDE_URL;
  s.onload = done;
  document.head.appendChild(s);
}
/** Lucide glyph, 1.75 stroke, inherits currentColor. */
function Icon({
  name,
  size = 24,
  strokeWidth = 1.75,
  className = '',
  style,
  ...rest
}) {
  const [, tick] = React.useState(0);
  React.useEffect(() => {
    if (window.lucide && window.lucide.icons) return;
    const f = () => tick(n => n + 1);
    subs.add(f);
    ensureLucide();
    return () => subs.delete(f);
  }, []);
  const lib = typeof window !== 'undefined' && window.lucide && window.lucide.icons;
  const key = String(name).replace(/(^|-)([a-z0-9])/g, (_, a, c) => c.toUpperCase());
  let node = lib && lib[key];
  if (node && node[0] === 'svg') node = node[2];
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'al-icon ' + className,
    style: {
      width: size,
      height: size,
      ...style
    },
    "aria-hidden": "true"
  }, rest), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, node && node.map(([tag, attrs], i) => React.createElement(tag, {
    ...attrs,
    key: i
  }))));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  tone = 'neutral',
  icon,
  count,
  children,
  className = '',
  ...rest
}) {
  const isCount = count !== undefined;
  const cls = ['al-badge', isCount ? 'al-badge--count' : tone !== 'neutral' && 'al-badge--' + tone, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon && !isCount && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 12,
    strokeWidth: 2.25
  }), isCount ? count : children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const cls = ['al-reset al-focusable al-btn', 'al-btn--' + variant, size !== 'md' && 'al-btn--' + size, block && 'al-btn--block', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 20
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  selected = false,
  icon,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: 'al-reset al-focusable al-chip ' + className,
    "aria-pressed": selected
  }, rest), selected ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.25
  }) : icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  variant = 'plain',
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = ['al-reset al-focusable al-iconbtn', variant !== 'plain' && 'al-iconbtn--' + variant, size === 'lg' && 'al-iconbtn--lg', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'lg' ? 26 : 22
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  label,
  className = '',
  ...rest
}) {
  const v = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'al-progress ' + className,
    role: "progressbar",
    "aria-valuenow": v,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-label": label
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: v + '%'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  onChange,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": checked,
    className: 'al-reset al-focusable al-choice ' + className,
    onClick: () => onChange && onChange(!checked)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-check",
    "aria-checked": checked
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.5
  })), children);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  checked = false,
  onChange,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": checked,
    className: 'al-reset al-focusable al-choice ' + className,
    onClick: () => onChange && onChange(true)
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-radio",
    "aria-checked": checked
  }), children);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchField({
  value,
  onChange,
  placeholder = 'Cerca',
  glass = false,
  onClear,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: 'al-search ' + (glass ? 'al-search--glass ' : '') + className,
    style: style
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 20
  }), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange && onChange(e.target.value)
  }, rest)), value ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "al-reset",
    "aria-label": "Cancella",
    onClick: () => onClear ? onClear() : onChange && onChange('')
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })) : null);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    className: 'al-seg ' + className
  }, rest), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "radio",
      "aria-checked": opt.value === value,
      className: "al-reset al-focusable al-seg__item",
      onClick: () => onChange && onChange(opt.value)
    }, opt.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: opt.icon,
      size: 16
    }), opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Slider({
  value = 50,
  onChange,
  icon,
  variant = 'fill',
  showValue = false,
  label,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);
  const set = e => {
    const r = ref.current.getBoundingClientRect();
    const v = Math.round(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * 100);
    onChange && onChange(v);
  };
  const down = e => {
    e.currentTarget.setPointerCapture(e.pointerId);
    set(e);
  };
  const move = e => {
    if (e.buttons) set(e);
  };
  const thin = variant === 'thin';
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    role: "slider",
    tabIndex: 0,
    "aria-label": label,
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    className: 'al-focusable al-slider ' + (thin ? 'al-slider--thin ' : '') + className,
    onPointerDown: down,
    onPointerMove: move,
    onKeyDown: e => {
      if (e.key === 'ArrowRight') onChange && onChange(Math.min(100, value + 5));
      if (e.key === 'ArrowLeft') onChange && onChange(Math.max(0, value - 5));
    }
  }, rest), thin && /*#__PURE__*/React.createElement("span", {
    className: "al-slider__track"
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-slider__fill",
    style: {
      width: value + '%'
    }
  }), thin ? /*#__PURE__*/React.createElement("span", {
    className: "al-slider__thumb",
    style: {
      left: value + '%'
    }
  }) : icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    className: "al-slider__icon"
  }), showValue && !thin && /*#__PURE__*/React.createElement("span", {
    className: "al-slider__value"
  }, value, "%"));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-label": label,
    className: 'al-reset al-focusable al-switch ' + className,
    onClick: e => {
      e.stopPropagation();
      onChange && onChange(!checked);
    }
  }, rest));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/lists/ListGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ListGroup({
  inset = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-group ' + (inset ? 'al-group--inset ' : '') + className
  }, rest), children);
}
Object.assign(__ds_scope, { ListGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/ListGroup.jsx", error: String((e && e.message) || e) }); }

// components/lists/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ListRow({
  icon,
  leading,
  title,
  subtitle,
  value,
  chevron = false,
  trailing,
  onClick,
  className = '',
  ...rest
}) {
  const Tag = onClick ? 'button' : 'div';
  const lead = leading || icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  });
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: onClick ? 'button' : undefined,
    onClick: onClick,
    className: (onClick ? 'al-reset al-focusable ' : '') + 'al-row ' + (lead ? 'al-row--icon ' : '') + className
  }, rest), lead && /*#__PURE__*/React.createElement("span", {
    className: "al-row__lead"
  }, lead), /*#__PURE__*/React.createElement("span", {
    className: "al-row__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "al-row__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("span", {
    className: "al-row__sub"
  }, subtitle)), (value || trailing || chevron) && /*#__PURE__*/React.createElement("span", {
    className: "al-row__trail"
  }, value, trailing, chevron && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    className: "al-row__chev"
  })));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/lists/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeader({
  children,
  action,
  onAction,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-section ' + className
  }, rest), /*#__PURE__*/React.createElement("span", null, children), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "al-reset",
    onClick: onAction
  }, action));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lists/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/system/AppIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The 16 system apps: key → Italian label + Lucide glyph. */
const ALBORI_APPS = {
  telefono: {
    label: 'Telefono',
    icon: 'phone'
  },
  messaggi: {
    label: 'Messaggi',
    icon: 'message-circle'
  },
  browser: {
    label: 'Browser',
    icon: 'compass'
  },
  fotocamera: {
    label: 'Fotocamera',
    icon: 'camera'
  },
  galleria: {
    label: 'Galleria',
    icon: 'image'
  },
  file: {
    label: 'File',
    icon: 'folder'
  },
  impostazioni: {
    label: 'Impostazioni',
    icon: 'sliders-horizontal'
  },
  calendario: {
    label: 'Calendario',
    icon: 'calendar-days'
  },
  orologio: {
    label: 'Orologio',
    icon: 'clock-4'
  },
  mappe: {
    label: 'Mappe',
    icon: 'map'
  },
  contatti: {
    label: 'Contatti',
    icon: 'user-round'
  },
  email: {
    label: 'Email',
    icon: 'mail'
  },
  musica: {
    label: 'Musica',
    icon: 'music'
  },
  note: {
    label: 'Note',
    icon: 'notebook-pen'
  },
  store: {
    label: 'Store',
    icon: 'shopping-bag'
  },
  sicurezza: {
    label: 'Sicurezza',
    icon: 'shield-check'
  }
};
function AppIcon({
  app,
  icon,
  label,
  size = 56,
  variant = 'auto',
  showLabel = true,
  badge,
  onClick,
  className = '',
  style,
  ...rest
}) {
  const def = ALBORI_APPS[app] || {};
  const Tag = onClick ? 'button' : 'span';
  const text = label || def.label;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: onClick ? 'button' : undefined,
    onClick: onClick,
    "aria-label": !showLabel ? text : undefined,
    className: (onClick ? 'al-reset al-focusable ' : '') + 'al-app ' + (variant !== 'auto' ? 'al-app--' + variant + ' ' : '') + className,
    style: {
      width: showLabel ? Math.max(size + 16, 72) : size,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "al-app__tile",
    style: {
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || def.icon || 'circle',
    size: Math.round(size * 0.46),
    strokeWidth: size < 40 ? 2 : 1.75
  })), badge ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    count: badge,
    className: "al-app__dot"
  }) : null), showLabel && /*#__PURE__*/React.createElement("span", {
    className: "al-app__label"
  }, text));
}
Object.assign(__ds_scope, { ALBORI_APPS, AppIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/AppIcon.jsx", error: String((e && e.message) || e) }); }

// components/system/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  mode = 'gesture',
  onBack,
  onHome,
  onRecents,
  className = '',
  ...rest
}) {
  if (mode === 'buttons') {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: 'al-nav al-nav--buttons ' + className
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
      icon: "chevron-left",
      label: "Indietro",
      onClick: onBack
    }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
      icon: "circle",
      label: "Home",
      onClick: onHome
    }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
      icon: "square",
      label: "App recenti",
      onClick: onRecents
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-nav ' + className
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "al-reset al-focusable",
    "aria-label": "Home",
    onClick: onHome,
    style: {
      padding: '12px 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "al-nav__pill",
    style: {
      display: 'block'
    }
  })));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/system/NotificationCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NotificationCard({
  app,
  appName,
  time,
  title,
  text,
  hidden = false,
  count,
  solid = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const name = appName || (__ds_scope.ALBORI_APPS[app] || {}).label;
  const Tag = onClick ? 'button' : 'div';
  return /*#__PURE__*/React.createElement("div", {
    className: "al-notif-wrap",
    style: count > 1 ? {
      marginBottom: 6
    } : undefined
  }, /*#__PURE__*/React.createElement(Tag, _extends({
    type: onClick ? 'button' : undefined,
    onClick: onClick,
    className: (onClick ? 'al-reset al-focusable ' : '') + 'al-notif ' + (solid ? 'al-notif--solid ' : '') + className
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.AppIcon, {
    app: app,
    size: 36,
    showLabel: false
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-notif__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "al-notif__meta"
  }, /*#__PURE__*/React.createElement("span", null, name), count > 1 && /*#__PURE__*/React.createElement("span", null, "\xB7 ", count), /*#__PURE__*/React.createElement("time", null, time)), hidden ? /*#__PURE__*/React.createElement("span", {
    className: "al-notif__text al-notif__text--hidden"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "lock",
    size: 14,
    strokeWidth: 2
  }), "Contenuto nascosto \xB7 sblocca per leggere") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "al-notif__title"
  }, title), text && /*#__PURE__*/React.createElement("span", {
    className: "al-notif__text"
  }, text)), children && /*#__PURE__*/React.createElement("span", {
    className: "al-notif__actions"
  }, children))), count > 1 && /*#__PURE__*/React.createElement("span", {
    className: "al-notif__stack"
  }));
}
Object.assign(__ds_scope, { NotificationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/NotificationCard.jsx", error: String((e && e.message) || e) }); }

// components/system/PhoneFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PhoneFrame({
  theme = 'dark',
  accent,
  motion,
  textScale,
  children,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-phone ' + className,
    "data-theme": theme,
    "data-accent": accent,
    "data-motion": motion,
    style: {
      ...(textScale ? {
        '--text-scale': textScale
      } : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-phone__cam"
  }), /*#__PURE__*/React.createElement("div", {
    className: "al-phone__screen"
  }, children));
}
Object.assign(__ds_scope, { PhoneFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/PhoneFrame.jsx", error: String((e && e.message) || e) }); }

// components/system/QuickToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QuickToggle({
  icon,
  label,
  stateLabel,
  active = false,
  onToggle,
  onDetails,
  compact = false,
  className = '',
  ...rest
}) {
  const state = stateLabel || (active ? 'Attivo' : 'Disattivato');
  if (compact) {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      "aria-pressed": active,
      "data-active": active,
      onClick: () => onToggle && onToggle(!active),
      className: 'al-reset al-focusable al-qt al-qt--compact ' + className
    }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      className: "al-qt__label"
    }, label));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-qt ' + className,
    "data-active": active
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "al-reset al-focusable al-qt__main",
    "aria-pressed": active,
    onClick: () => onToggle && onToggle(!active)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-qt__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "al-qt__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "al-qt__state"
  }, state))), onDetails && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "al-reset al-focusable al-qt__more",
    "aria-label": 'Dettagli ' + label,
    onClick: onDetails
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18
  })));
}
Object.assign(__ds_scope, { QuickToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/QuickToggle.jsx", error: String((e && e.message) || e) }); }

// components/system/Sheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Sheet({
  title,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-sheet ' + className,
    role: "dialog",
    "aria-label": title
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-sheet__grab"
  }), title && /*#__PURE__*/React.createElement("div", {
    className: "al-sheet__title"
  }, title), children);
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/system/StatusBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PRIVACY = {
  camera: 'camera',
  mic: 'mic',
  location: 'navigation'
};
function StatusBar({
  time = '07:12',
  battery = 82,
  charging = false,
  privacy,
  silent = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-status ' + className
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-status__side"
  }, time, silent && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bell-off",
    size: 14,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", {
    className: "al-status__side"
  }, privacy && /*#__PURE__*/React.createElement("span", {
    className: "al-status__privacy",
    title: "In uso"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: PRIVACY[privacy] || 'circle',
    size: 12,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "signal",
    size: 16,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "wifi",
    size: 16,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: charging ? 'battery-charging' : battery < 20 ? 'battery-low' : 'battery-medium',
    size: 20,
    strokeWidth: 1.75
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-status__batt"
  }, battery, "%")));
}
Object.assign(__ds_scope, { StatusBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/StatusBar.jsx", error: String((e && e.message) || e) }); }

// components/system/Wallpaper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Abstract dawn wallpaper built from tokens; follows theme and accent. */
function Wallpaper({
  variant = 'alba',
  dim = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'al-wall al-wall--' + variant + (dim ? ' al-wall--dim ' : ' ') + className,
    "aria-hidden": "true"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "al-wall__glow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-wall__sun"
  }), /*#__PURE__*/React.createElement("span", {
    className: "al-wall__ground"
  }));
}
Object.assign(__ds_scope, { Wallpaper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/system/Wallpaper.jsx", error: String((e && e.message) || e) }); }

// ui_kits/albori-os/os-shell.jsx
try { (() => {
(() => {
  const DS = window.AlboriOSDesignSystem_de9a4c;
  const {
    PhoneFrame,
    StatusBar,
    NavBar,
    Wallpaper,
    IconButton
  } = DS;
  const DEFAULTS = {
    screen: 'lock',
    hist: [],
    themeMode: 'Scuro',
    accent: undefined,
    wall: 'alba',
    textScale: 1,
    iconStyle: 'auto',
    reduced: false,
    nav: 'gesture',
    wifi: true,
    bt: false,
    air: false,
    data: true,
    torch: false,
    silent: false,
    saver: false,
    rot: false,
    bright: 70,
    vol: 45,
    q: '',
    storeApp: null,
    sheet: null,
    upd: 'idle',
    updPct: 0,
    stub: 'App'
  };
  const CONF = {
    lock: {
      wall: true,
      anim: 'fade'
    },
    home: {
      wall: true,
      anim: 'home'
    },
    drawer: {
      wall: true,
      dim: true,
      anim: 'rise'
    },
    control: {
      wall: true,
      dim: true,
      anim: 'drop'
    },
    multitask: {
      wall: true,
      dim: true,
      anim: 'home'
    }
  };
  function useOS(initial) {
    const [s, setS] = React.useState({
      ...DEFAULTS,
      ...initial
    });
    const set = patch => setS(p => ({
      ...p,
      ...(typeof patch === 'function' ? patch(p) : patch)
    }));
    const go = (screen, extra) => setS(p => p.screen === screen && !extra ? p : {
      ...p,
      ...extra,
      sheet: null,
      screen,
      hist: screen === 'home' || screen === 'lock' ? [] : [...p.hist, p.screen]
    });
    const back = () => setS(p => {
      const h = p.hist.slice();
      const prev = h.pop() || 'home';
      return {
        ...p,
        sheet: null,
        screen: prev === 'lock' ? 'home' : prev,
        hist: h
      };
    });
    const theme = s.themeMode === 'Scuro' ? 'dark' : 'light';
    return {
      s,
      set,
      go,
      back,
      theme
    };
  }
  function Header({
    os,
    title,
    large,
    right
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '4px 4px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        height: 48
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "arrow-left",
      label: "Indietro",
      onClick: os.back
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-title-sm)',
        flex: 1,
        marginLeft: 4
      }
    }, large ? '' : title), right), large && /*#__PURE__*/React.createElement("h1", {
      className: "kit-h1",
      style: {
        marginLeft: 12
      }
    }, title));
  }
  function Phone({
    os: ext,
    initial,
    style
  }) {
    const own = useOS(initial);
    const os = ext || own;
    const {
      s
    } = os;
    const Screen = (window.AlboriScreens || {})[s.screen] || window.AlboriScreens.stub;
    const conf = CONF[s.screen] || {
      anim: 'open'
    };
    return /*#__PURE__*/React.createElement(PhoneFrame, {
      theme: os.theme,
      accent: s.accent,
      motion: s.reduced ? 'reduced' : undefined,
      textScale: s.textScale,
      style: style,
      "data-screen-label": s.screen
    }, conf.wall ? /*#__PURE__*/React.createElement(Wallpaper, {
      variant: s.wall,
      dim: conf.dim
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: "kit-top",
      onClick: () => s.screen !== 'lock' && os.go('control'),
      title: "Centro di controllo"
    }, /*#__PURE__*/React.createElement(StatusBar, {
      silent: s.silent,
      privacy: s.screen === 'privacy' ? 'location' : undefined
    })), /*#__PURE__*/React.createElement("div", {
      key: s.screen,
      className: 'kit-body kit-anim-' + conf.anim
    }, /*#__PURE__*/React.createElement(Screen, {
      os: os
    })), /*#__PURE__*/React.createElement("div", {
      className: "kit-bottom"
    }, /*#__PURE__*/React.createElement(NavBar, {
      mode: s.nav,
      onBack: os.back,
      onHome: () => os.go(s.screen === 'lock' ? 'lock' : 'home'),
      onRecents: () => os.go('multitask')
    })));
  }
  window.AlboriKit = {
    DS,
    useOS,
    Phone,
    Header,
    DEFAULTS
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/albori-os/os-shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/albori-os/screens-a.jsx
try { (() => {
(() => {
  const {
    DS,
    Header
  } = window.AlboriKit;
  const {
    Icon,
    IconButton,
    Button,
    AppIcon,
    ALBORI_APPS,
    NotificationCard,
    SearchField,
    QuickToggle,
    Slider,
    ListRow,
    ListGroup,
    SectionHeader,
    Sheet,
    Switch,
    Badge
  } = DS;
  const APP_ROUTE = {
    impostazioni: 'settings',
    store: 'store',
    sicurezza: 'privacy'
  };
  const openApp = (os, app) => APP_ROUTE[app] ? os.go(APP_ROUTE[app]) : os.go('stub', {
    stub: ALBORI_APPS[app].label
  });
  function Lock({
    os
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 16px 4px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-label)',
        color: 'var(--fg-2)'
      }
    }, "marted\xEC 11 novembre"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-clock)',
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: 'var(--ls-display)',
        margin: '4px 0 10px'
      }
    }, "07", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-text)'
      }
    }, ":"), "12"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sunrise",
      size: 16
    }), "Alba alle 07:04"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "battery-charging",
      size: 16
    }), "82% \xB7 in carica"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement(NotificationCard, {
      app: "messaggi",
      time: "07:04",
      title: "Giulia Ferri",
      text: "Ci vediamo alle 9 davanti alla stazione? Porto io i biglietti.",
      count: 3
    }), /*#__PURE__*/React.createElement(NotificationCard, {
      app: "calendario",
      time: "06:45",
      title: "Revisione progetto \xB7 09:30",
      text: "Sala Brera, secondo piano"
    }), /*#__PURE__*/React.createElement(NotificationCard, {
      app: "email",
      time: "06:51",
      count: 2,
      hidden: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "flashlight",
      label: "Torcia",
      variant: "glass",
      size: "lg"
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "al-reset al-focusable",
      onClick: () => os.go('home'),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: 8,
        font: 'var(--text-footnote)',
        color: 'var(--fg-1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    }), "Scorri in su per sbloccare"), /*#__PURE__*/React.createElement(IconButton, {
      icon: "camera",
      label: "Fotocamera",
      variant: "glass",
      size: "lg"
    })));
  }
  function Home({
    os
  }) {
    const v = os.s.iconStyle;
    const grid = ['calendario', 'mappe', 'galleria', 'email', 'musica', 'note', 'store', 'impostazioni'];
    const dock = ['telefono', 'messaggi', 'browser', 'fotocamera'];
    const ev = (t, n, p) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-label)',
        color: 'var(--accent-text)',
        width: 40
      }
    }, t), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--text-label)'
      }
    }, n), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, p)));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 16px 4px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.7fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-glass",
      style: {
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-overline)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: 'var(--fg-2)'
      }
    }, "Oggi \xB7 mar 11"), ev('09:30', 'Revisione progetto', 'Sala Brera'), ev('13:00', 'Pranzo con Giulia', 'Via Solferino')), /*#__PURE__*/React.createElement("div", {
      className: "kit-glass",
      style: {
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sun",
      size: 22,
      style: {
        color: 'var(--accent-text)'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-display)',
        lineHeight: 1
      }
    }, "9\xB0"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)',
        marginTop: 4
      }
    }, "Milano \xB7 sereno")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        justifyItems: 'center',
        gap: '20px 0',
        marginTop: 28
      }
    }, grid.map(a => /*#__PURE__*/React.createElement(AppIcon, {
      key: a,
      app: a,
      variant: v,
      badge: a === 'email' ? 2 : undefined,
      onClick: () => openApp(os, a)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "al-reset al-focusable al-search al-search--glass",
      style: {
        flex: 1
      },
      onClick: () => os.go('drawer', {
        q: ''
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 20
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-sm)'
      }
    }, "Cerca nel telefono")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "al-reset al-focusable al-search al-search--glass",
      style: {
        color: 'var(--fg-1)',
        font: 'var(--text-label)'
      },
      onClick: () => os.go('drawer', {
        q: ''
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layout-grid",
      size: 18
    }), "Tutte le app")), /*#__PURE__*/React.createElement("div", {
      className: "kit-glass",
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        justifyItems: 'center',
        padding: '12px 0',
        borderRadius: 'var(--radius-xl)'
      }
    }, dock.map(a => /*#__PURE__*/React.createElement(AppIcon, {
      key: a,
      app: a,
      variant: v,
      showLabel: false,
      badge: a === 'messaggi' ? 3 : undefined,
      onClick: () => openApp(os, a)
    }))));
  }
  const CONTACTS = ['Giulia Ferri', 'Giorgio Bassi', 'Marta Colombo', 'Luca Gini', 'Paolo Riva'];
  const FILES = [['Giustificativi 2026.pdf', 'Documenti · 240 KB'], ['Gita al lago.jpg', 'Immagini · 3,1 MB'], ['Preventivo cucina.ods', 'Documenti · 88 KB']];
  const SETTINGS = [['Gesti di navigazione', 'Accessibilità', 'hand'], ['Giroscopio e sensori', 'Privacy', 'compass'], ['Luminosità', 'Schermo', 'sun'], ['Wi-Fi', 'Connessioni', 'wifi']];
  function Drawer({
    os
  }) {
    const q = os.s.q.trim().toLowerCase();
    const v = os.s.iconStyle;
    const keys = Object.keys(ALBORI_APPS).sort();
    const has = t => t.toLowerCase().includes(q);
    const apps = keys.filter(k => has(ALBORI_APPS[k].label));
    const cs = CONTACTS.filter(has),
      fs = FILES.filter(f => has(f[0])),
      ss = SETTINGS.filter(x => has(x[0]));
    const none = q && !apps.length && !cs.length && !fs.length && !ss.length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 4,
        background: 'var(--bg)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        boxShadow: '0 -1px 0 var(--accent)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '16px 16px 8px'
      }
    }, /*#__PURE__*/React.createElement(SearchField, {
      value: os.s.q,
      onChange: x => os.set({
        q: x
      }),
      placeholder: "Cerca app, contatti, file, impostazioni"
    })), /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, !q && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "Recenti"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        justifyItems: 'center'
      }
    }, ['mappe', 'messaggi', 'note', 'musica'].map(a => /*#__PURE__*/React.createElement(AppIcon, {
      key: a,
      app: a,
      variant: v,
      onClick: () => openApp(os, a)
    }))), /*#__PURE__*/React.createElement(SectionHeader, null, "Tutte le app \xB7 A\u2013Z"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        justifyItems: 'center',
        gap: '20px 0',
        paddingBottom: 16
      }
    }, keys.map(a => /*#__PURE__*/React.createElement(AppIcon, {
      key: a,
      app: a,
      variant: v,
      onClick: () => openApp(os, a)
    })))), q && apps.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "App"), /*#__PURE__*/React.createElement(ListGroup, null, apps.map(a => /*#__PURE__*/React.createElement(ListRow, {
      key: a,
      leading: /*#__PURE__*/React.createElement(AppIcon, {
        app: a,
        size: 32,
        variant: v,
        showLabel: false,
        style: {
          margin: '0 -4px'
        }
      }),
      title: ALBORI_APPS[a].label,
      value: "Apri",
      onClick: () => openApp(os, a)
    })))), q && cs.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "Contatti"), /*#__PURE__*/React.createElement(ListGroup, null, cs.map(c => /*#__PURE__*/React.createElement(ListRow, {
      key: c,
      leading: /*#__PURE__*/React.createElement("span", {
        className: "kit-avatar"
      }, c.split(' ').map(w => w[0]).join('')),
      title: c,
      trailing: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 20
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          width: 12
        }
      }), /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 20
      })),
      onClick: () => os.go('stub', {
        stub: 'Contatti'
      })
    })))), q && fs.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "File"), /*#__PURE__*/React.createElement(ListGroup, null, fs.map(f => /*#__PURE__*/React.createElement(ListRow, {
      key: f[0],
      icon: "file-text",
      title: f[0],
      subtitle: f[1],
      onClick: () => os.go('stub', {
        stub: 'File'
      })
    })))), q && ss.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionHeader, null, "Impostazioni"), /*#__PURE__*/React.createElement(ListGroup, null, ss.map(x => /*#__PURE__*/React.createElement(ListRow, {
      key: x[0],
      icon: x[2],
      title: x[0],
      subtitle: 'Impostazioni › ' + x[1],
      chevron: true,
      onClick: () => os.go('settings')
    })))), none && /*#__PURE__*/React.createElement("div", {
      className: "kit-note",
      style: {
        textAlign: 'center',
        paddingTop: 48
      }
    }, "Nessun risultato per \u201C", os.s.q, "\u201D.", /*#__PURE__*/React.createElement("br", null), "Prova con il nome di un\u2019app, di un contatto o di un file.")));
  }
  function Control({
    os
  }) {
    const s = os.s;
    const t = k => val => os.set({
      [k]: val
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll",
      style: {
        padding: '4px 16px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-title)'
      }
    }, "07:12"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, "mar 11 nov \xB7 82%, 1 g 4 h rimanenti")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "pencil",
      label: "Modifica comandi"
    }), /*#__PURE__*/React.createElement(IconButton, {
      icon: "sliders-horizontal",
      label: "Impostazioni",
      onClick: () => os.go('settings')
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(QuickToggle, {
      icon: "wifi",
      label: "Wi-Fi",
      stateLabel: s.wifi ? 'Casa-5G' : 'Disattivato',
      active: s.wifi,
      onToggle: t('wifi'),
      onDetails: () => os.set({
        sheet: 'wifi'
      })
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      icon: "signal",
      label: "Dati mobili",
      stateLabel: s.data ? '5G' : 'Disattivati',
      active: s.data,
      onToggle: t('data'),
      onDetails: () => os.go('settings')
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      icon: "bluetooth",
      label: "Bluetooth",
      active: s.bt,
      onToggle: t('bt'),
      onDetails: () => os.go('settings')
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      icon: "plane",
      label: "Modalit\xE0 aereo",
      active: s.air,
      onToggle: t('air')
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(QuickToggle, {
      compact: true,
      icon: "flashlight",
      label: "Torcia",
      active: s.torch,
      onToggle: t('torch')
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      compact: true,
      icon: s.silent ? 'bell-off' : 'bell',
      label: "Silenzioso",
      active: s.silent,
      onToggle: t('silent')
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      compact: true,
      icon: "leaf",
      label: "Risparmio",
      active: s.saver,
      onToggle: t('saver')
    }), /*#__PURE__*/React.createElement(QuickToggle, {
      compact: true,
      icon: "rotate-cw",
      label: "Rotazione",
      active: s.rot,
      onToggle: t('rot')
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Slider, {
      value: s.bright,
      onChange: t('bright'),
      icon: "sun",
      showValue: true,
      label: "Luminosit\xE0"
    }), /*#__PURE__*/React.createElement(Slider, {
      value: s.vol,
      onChange: t('vol'),
      icon: s.vol === 0 ? 'volume-x' : 'volume-2',
      showValue: true,
      label: "Volume"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-caption)',
        fontSize: 'var(--fs-caption)',
        color: 'var(--fg-2)',
        textAlign: 'center',
        margin: '10px 0 0'
      }
    }, "Tocca per attivare \xB7 la freccia apre i dettagli"), /*#__PURE__*/React.createElement(SectionHeader, {
      action: "Cancella tutto",
      style: {
        padding: '16px 0 8px'
      }
    }, "Notifiche"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(NotificationCard, {
      solid: true,
      app: "messaggi",
      time: "07:04",
      title: "Giulia Ferri",
      text: "Ci vediamo alle 9 davanti alla stazione?",
      count: 3
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Rispondi"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost"
    }, "Segna come letto")), /*#__PURE__*/React.createElement(NotificationCard, {
      solid: true,
      app: "store",
      time: "ieri",
      title: "2 app aggiornate",
      text: "Rondine 4.2, Quaderno 1.9"
    }))), s.sheet === 'wifi' && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'var(--surface-scrim)'
      },
      onClick: () => os.set({
        sheet: null
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-anim-rise",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Sheet, {
      title: "Wi-Fi"
    }, /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
      icon: "wifi",
      title: "Attiva Wi-Fi",
      trailing: /*#__PURE__*/React.createElement(Switch, {
        checked: s.wifi,
        onChange: t('wifi'),
        label: "Wi-Fi"
      })
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "lock",
      title: "Casa-5G",
      subtitle: "Connessa \xB7 WPA3",
      trailing: /*#__PURE__*/React.createElement(Badge, {
        tone: "success",
        icon: "check"
      }, "Connessa"),
      onClick: () => {}
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "lock",
      title: "Studio Colombo",
      subtitle: "Salvata",
      onClick: () => {}
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "wifi",
      title: "Bar Centrale",
      subtitle: "Aperta \xB7 non protetta",
      onClick: () => {}
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px 0'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      block: true,
      onClick: () => os.go('settings')
    }, "Tutte le impostazioni Wi-Fi"))))));
  }
  window.AlboriScreens = Object.assign(window.AlboriScreens || {}, {
    lock: Lock,
    home: Home,
    drawer: Drawer,
    control: Control
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/albori-os/screens-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/albori-os/screens-b.jsx
try { (() => {
(() => {
  const {
    DS,
    Header
  } = window.AlboriKit;
  const {
    Icon,
    Button,
    AppIcon,
    SearchField,
    Slider,
    ListRow,
    ListGroup,
    SectionHeader,
    Switch,
    Badge,
    SegmentedControl,
    Wallpaper
  } = DS;
  const CATS = [['Rete e dispositivo', [['wifi', 'Connessioni', 'Wi-Fi, rete mobile, Bluetooth'], ['sun', 'Schermo', 'Luminosità, sospensione, luce notturna'], ['volume-2', 'Suoni e vibrazione', 'Suoneria, volume, non disturbare'], ['bell', 'Notifiche', 'Schermata di blocco, anteprime, per app']]], ['Personale', [['palette', 'Personalizzazione', 'Tema, accento, sfondo, icone', 'personal'], ['layout-grid', 'App', 'App predefinite, autorizzazioni, spazio'], ['eye-off', 'Privacy', 'Fotocamera, microfono, posizione', 'privacy'], ['shield-check', 'Sicurezza', 'Blocco schermo, impronta, cifratura']]], ['Sistema', [['battery-medium', 'Batteria', '82% · circa 1 giorno e 4 ore'], ['hard-drive', 'Archiviazione', '86 GB liberi su 256 GB'], ['accessibility', 'Accessibilità', 'Testo, contrasto, navigazione a pulsanti'], ['download', 'Aggiornamenti', 'Albori 1.2 disponibile', 'updates', true], ['info', 'Informazioni sul dispositivo', 'Albori 1.1.3 · modello, licenze']]]];
  function Settings({
    os
  }) {
    const [q, setQ] = React.useState('');
    const f = q.trim().toLowerCase();
    const groups = CATS.map(([g, rows]) => [g, rows.filter(r => !f || (r[1] + r[2]).toLowerCase().includes(f))]).filter(g => g[1].length);
    return /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "kit-h1",
      style: {
        marginTop: 12
      }
    }, "Impostazioni"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px'
      }
    }, /*#__PURE__*/React.createElement(SearchField, {
      value: q,
      onChange: setQ,
      placeholder: "Cerca nelle impostazioni"
    })), groups.map(([g, rows]) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: g
    }, /*#__PURE__*/React.createElement(SectionHeader, null, g), /*#__PURE__*/React.createElement(ListGroup, null, rows.map(([icon, title, sub, route, upd]) => /*#__PURE__*/React.createElement(ListRow, {
      key: title,
      icon: icon,
      title: title,
      subtitle: sub,
      chevron: true,
      trailing: upd ? /*#__PURE__*/React.createElement(Badge, {
        count: 1,
        "aria-label": "1 aggiornamento"
      }) : null,
      onClick: () => route ? os.go(route) : os.go('stub', {
        stub: title
      })
    }))))), !groups.length && /*#__PURE__*/React.createElement("div", {
      className: "kit-note",
      style: {
        textAlign: 'center',
        paddingTop: 40
      }
    }, "Nessuna impostazione trovata per \u201C", q, "\u201D."), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 16
      }
    }));
  }
  const LOG = {
    Fotocamera: [['fotocamera', 'Fotocamera', 'Oggi 06:58 · 2 min', 6.97], ['messaggi', 'Messaggi', 'Ieri 21:14 · videochiamata, 12 min', 21.2], ['browser', 'Browser', 'Ieri 18:02 · richiesta negata', 18, true]],
    Microfono: [['messaggi', 'Messaggi', 'Ieri 21:14 · videochiamata, 12 min', 21.2], ['telefono', 'Telefono', 'Ieri 17:40 · chiamata, 4 min', 17.6]],
    Posizione: [['mappe', 'Mappe', 'Oggi 07:10 · posizione precisa, in uso ora', 7.1], ['orologio', 'Orologio', 'Oggi 07:04 · approssimativa (alba)', 7.05], ['browser', 'Browser', 'Ieri 12:31 · richiesta negata', 12.5, true]]
  };
  const SENSOR_ICON = {
    Fotocamera: 'camera',
    Microfono: 'mic',
    Posizione: 'navigation'
  };
  const LEVELS = ['Solo durante l’uso', 'Chiedi ogni volta', 'Negato'];
  function Privacy({
    os
  }) {
    const [tab, setTab] = React.useState('Posizione');
    const [perm, setPerm] = React.useState({
      mappe: 0,
      messaggi: 0,
      browser: 2,
      fotocamera: 0,
      orologio: 1
    });
    const [ind, setInd] = React.useState(true);
    const rows = LOG[tab];
    return /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, /*#__PURE__*/React.createElement(Header, {
      os: os,
      title: "Privacy e autorizzazioni"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px 0'
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      value: tab,
      onChange: setTab,
      options: Object.keys(LOG).map(k => ({
        value: k,
        label: k,
        icon: SENSOR_ICON[k]
      }))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, rows.filter(r => !r[4]).length, " app hanno usato: ", tab.toLowerCase(), " \xB7 ultime 24 ore"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 28,
        marginTop: 8,
        borderRadius: 'var(--radius-xs)',
        background: 'var(--surface-1)'
      }
    }, rows.map(r => /*#__PURE__*/React.createElement("span", {
      key: r[1],
      title: r[2],
      style: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: (r[3] + 16.8) % 24 / 24 * 100 + '%',
        width: r[4] ? 2 : 6,
        borderRadius: 2,
        background: r[4] ? 'var(--fg-3)' : 'var(--accent)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        font: 'var(--text-mono)',
        fontSize: 11,
        color: 'var(--fg-3)',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "ieri 07:12"), /*#__PURE__*/React.createElement("span", null, "19:12"), /*#__PURE__*/React.createElement("span", null, "ora"))), /*#__PURE__*/React.createElement(SectionHeader, {
      action: "Registro completo"
    }, "Accessi recenti"), /*#__PURE__*/React.createElement(ListGroup, null, rows.map(([app, name, when,, denied]) => /*#__PURE__*/React.createElement(ListRow, {
      key: name,
      leading: /*#__PURE__*/React.createElement(AppIcon, {
        app: app,
        size: 32,
        showLabel: false,
        variant: os.s.iconStyle,
        style: {
          margin: '0 -4px'
        }
      }),
      title: name,
      subtitle: when,
      trailing: denied ? /*#__PURE__*/React.createElement(Badge, {
        tone: "danger",
        icon: "ban"
      }, "Negato") : /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral",
        icon: "check"
      }, "Consentito")
    }))), /*#__PURE__*/React.createElement(SectionHeader, null, "Autorizzazione: ", tab.toLowerCase()), /*#__PURE__*/React.createElement(ListGroup, null, Object.keys(perm).slice(0, 4).map(app => /*#__PURE__*/React.createElement(ListRow, {
      key: app,
      leading: /*#__PURE__*/React.createElement(AppIcon, {
        app: app,
        size: 32,
        showLabel: false,
        variant: os.s.iconStyle,
        style: {
          margin: '0 -4px'
        }
      }),
      title: DS.ALBORI_APPS[app].label,
      value: /*#__PURE__*/React.createElement("span", {
        style: {
          color: perm[app] === 2 ? 'var(--danger)' : 'var(--fg-2)'
        }
      }, LEVELS[perm[app]]),
      chevron: true,
      onClick: () => setPerm(p => ({
        ...p,
        [app]: (p[app] + 1) % 3
      }))
    }))), /*#__PURE__*/React.createElement(SectionHeader, null, "Trasparenza"), /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
      icon: "circle-dot",
      title: "Indicatore nella barra di stato",
      subtitle: "Mostra un\u2019icona quando un sensore \xE8 in uso",
      trailing: /*#__PURE__*/React.createElement(Switch, {
        checked: ind,
        onChange: setInd,
        label: "Indicatore"
      })
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "file-down",
      title: "Esporta registro accessi",
      subtitle: "File CSV, ultimi 30 giorni",
      chevron: true,
      onClick: () => {}
    })), /*#__PURE__*/React.createElement("div", {
      className: "kit-note"
    }, "Il registro \xE8 salvato solo su questo dispositivo e non viene inviato a nessun server. Puoi consultarlo, esportarlo o cancellarlo quando vuoi."));
  }
  const ACCENTS = [[undefined, 'Alba', '#F5834A'], ['sole', 'Sole', '#FFD43B'], ['corallo', 'Corallo', '#EE6352'], ['salvia', 'Salvia', '#8FB89A'], ['adriatico', 'Adriatico', '#7FA9D6']];
  const WALLS = [['alba', 'Alba'], ['foschia', 'Foschia'], ['ossidiana', 'Tinta unita']];
  function Personal({
    os
  }) {
    const s = os.s;
    return /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, /*#__PURE__*/React.createElement(Header, {
      os: os,
      title: "Personalizzazione"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 168,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-1)'
      }
    }, /*#__PURE__*/React.createElement(Wallpaper, {
      variant: s.wall
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-overline)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: 'var(--fg-2)'
      }
    }, "Anteprima"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-body-strong)'
      }
    }, "Testo di esempio"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, "Cos\xEC appariranno titoli e descrizioni.")), /*#__PURE__*/React.createElement(Switch, {
      checked: true,
      label: "Esempio"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, ['telefono', 'messaggi', 'mappe', 'musica'].map(a => /*#__PURE__*/React.createElement(AppIcon, {
      key: a,
      app: a,
      size: 40,
      showLabel: false,
      variant: s.iconStyle
    }))), /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Azione"))))), /*#__PURE__*/React.createElement(SectionHeader, null, "Tema"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px'
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      value: s.themeMode,
      onChange: v => os.set({
        themeMode: v
      }),
      options: [{
        value: 'Chiaro',
        label: 'Chiaro',
        icon: 'sun'
      }, {
        value: 'Scuro',
        label: 'Scuro',
        icon: 'moon'
      }, {
        value: 'Auto',
        label: 'Alba–tramonto',
        icon: 'sunrise'
      }]
    })), /*#__PURE__*/React.createElement(SectionHeader, null, "Colore accento"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 16px'
      }
    }, ACCENTS.map(([k, n, c]) => /*#__PURE__*/React.createElement("button", {
      key: n,
      type: "button",
      className: "al-reset al-focusable",
      "aria-pressed": s.accent === k,
      onClick: () => os.set({
        accent: k
      }),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: 60,
        font: 'var(--text-footnote)',
        color: s.accent === k ? 'var(--fg-1)' : 'var(--fg-2)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: c,
        color: '#101114',
        boxShadow: s.accent === k ? '0 0 0 2px var(--bg), 0 0 0 4px var(--fg-1)' : 'none'
      }
    }, s.accent === k && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 22,
      strokeWidth: 2.5
    })), n))), /*#__PURE__*/React.createElement(SectionHeader, null, "Sfondo"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 8,
        padding: '0 16px'
      }
    }, WALLS.map(([k, n]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      className: "al-reset al-focusable",
      "aria-pressed": s.wall === k,
      onClick: () => os.set({
        wall: k
      }),
      style: {
        font: 'var(--text-footnote)',
        color: s.wall === k ? 'var(--fg-1)' : 'var(--fg-2)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'block',
        height: 120,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: 6,
        boxShadow: s.wall === k ? '0 0 0 2px var(--bg), 0 0 0 4px var(--fg-1)' : 'var(--shadow-1)'
      }
    }, /*#__PURE__*/React.createElement(Wallpaper, {
      variant: k
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, s.wall === k && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      strokeWidth: 2.5
    }), n)))), /*#__PURE__*/React.createElement(SectionHeader, null, "Dimensione del testo"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 16px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 13px/1 var(--font-sans)'
      }
    }, "A"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Slider, {
      variant: "thin",
      label: "Dimensione del testo",
      value: Math.round((s.textScale - 0.85) / 0.45 * 100),
      onChange: v => os.set({
        textScale: +(0.85 + Math.round(v / 25) * 25 / 100 * 0.45).toFixed(2)
      })
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 22px/1 var(--font-sans)'
      }
    }, "A")), /*#__PURE__*/React.createElement(SectionHeader, null, "Stile delle icone"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px'
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      value: s.iconStyle,
      onChange: v => os.set({
        iconStyle: v
      }),
      options: [{
        value: 'auto',
        label: 'Materia'
      }, {
        value: 'alba',
        label: 'Accento'
      }, {
        value: 'contorno',
        label: 'Contorno'
      }]
    })), /*#__PURE__*/React.createElement(SectionHeader, null, "Movimento e navigazione"), /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
      icon: "wind",
      title: "Riduci movimento",
      subtitle: "Sostituisce spostamenti e zoom con dissolvenze brevi",
      trailing: /*#__PURE__*/React.createElement(Switch, {
        checked: s.reduced,
        onChange: v => os.set({
          reduced: v
        }),
        label: "Riduci movimento"
      })
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "navigation-2",
      title: "Navigazione a pulsanti",
      subtitle: "Indietro, Home e App recenti sempre visibili",
      trailing: /*#__PURE__*/React.createElement(Switch, {
        checked: s.nav === 'buttons',
        onChange: v => os.set({
          nav: v ? 'buttons' : 'gesture'
        }),
        label: "Pulsanti"
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 16
      }
    }));
  }
  window.AlboriScreens = Object.assign(window.AlboriScreens || {}, {
    settings: Settings,
    privacy: Privacy,
    personal: Personal
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/albori-os/screens-b.jsx", error: String((e && e.message) || e) }); }

// ui_kits/albori-os/screens-c.jsx
try { (() => {
(() => {
  const {
    DS,
    Header
  } = window.AlboriKit;
  const {
    Icon,
    IconButton,
    Button,
    AppIcon,
    ALBORI_APPS,
    SearchField,
    ListRow,
    ListGroup,
    SectionHeader,
    Switch,
    Badge,
    Chip,
    ProgressBar
  } = DS;
  function Multitask({
    os
  }) {
    const [open, setOpen] = React.useState([['mappe', 'stub'], ['impostazioni', 'settings'], ['messaggi', 'stub']]);
    const cur = 'impostazioni';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24
      }
    }, open.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 12
      }
    }, open.map(([app, route]) => /*#__PURE__*/React.createElement("div", {
      key: app,
      style: {
        flex: 'none',
        width: 224,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 32
      }
    }, /*#__PURE__*/React.createElement(AppIcon, {
      app: app,
      size: 28,
      showLabel: false,
      variant: os.s.iconStyle
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-label)',
        flex: 1
      }
    }, ALBORI_APPS[app].label), app === cur && /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      icon: "circle-dot"
    }, "In uso")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "al-reset al-focusable",
      onClick: () => os.go(route, {
        stub: ALBORI_APPS[app].label
      }),
      style: {
        height: 440,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg)',
        boxShadow: app === cur ? '0 0 0 2px var(--accent)' : 'var(--shadow-1)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-title-sm)',
        color: 'var(--fg-1)'
      }
    }, ALBORI_APPS[app].label), [70, 100, 85, 100, 60, 90].map((w, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        height: 10,
        width: w + '%',
        borderRadius: 5,
        background: 'var(--surface-2)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "x",
      label: 'Chiudi ' + ALBORI_APPS[app].label,
      variant: "glass",
      onClick: () => setOpen(o => o.filter(x => x[0] !== app))
    }))))) : /*#__PURE__*/React.createElement("div", {
      className: "kit-note",
      style: {
        textAlign: 'center',
        color: 'var(--fg-1)'
      }
    }, "Nessuna app aperta"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "search",
      onClick: () => os.go('drawer', {
        q: ''
      })
    }, "Cerca"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "layers",
      disabled: !open.length,
      onClick: () => setOpen([])
    }, "Chiudi tutte")));
  }
  const CATALOG = [{
    id: 'rondine',
    name: 'Rondine',
    dev: 'Collettivo Rondine',
    icon: 'send',
    cat: 'Comunicazione',
    desc: 'Messaggi cifrati da un capo all’altro, anche in gruppo.',
    lic: 'AGPL-3.0',
    src: 'Repository Albori',
    perms: [['bell', 'Notifiche'], ['user-round', 'Contatti', 'facoltativa'], ['mic', 'Microfono', 'solo per i vocali']],
    ver: '4.2.0',
    size: '38 MB',
    open: true
  }, {
    id: 'tessera',
    name: 'Tessera',
    dev: 'Studio Vetro',
    icon: 'key-round',
    cat: 'Sicurezza',
    desc: 'Gestore di password locale con sincronizzazione a scelta.',
    lic: 'GPL-3.0',
    src: 'Repository Albori',
    perms: [['fingerprint', 'Impronta', 'per sbloccare']],
    ver: '2.8.1',
    size: '12 MB',
    open: true
  }, {
    id: 'sentiero',
    name: 'Sentiero',
    dev: 'Alpi Digitali srl',
    icon: 'mountain',
    cat: 'Mappe',
    desc: 'Mappe escursionistiche offline con tracce GPX.',
    lic: 'Proprietaria',
    src: 'Sviluppatore verificato',
    perms: [['navigation', 'Posizione', 'durante l’uso'], ['hard-drive', 'File', 'per le mappe offline']],
    ver: '6.0.3',
    size: '94 MB',
    open: false
  }, {
    id: 'quaderno',
    name: 'Quaderno',
    dev: 'Comunità Quaderno',
    icon: 'book-open',
    cat: 'Produttività',
    desc: 'Appunti in Markdown, salvati come semplici file.',
    lic: 'MIT',
    src: 'Repository della comunità',
    perms: [['hard-drive', 'File']],
    ver: '1.9.0',
    size: '8 MB',
    open: true
  }];
  function Store({
    os
  }) {
    const [q, setQ] = React.useState('');
    const [cat, setCat] = React.useState('Tutte');
    const [inst, setInst] = React.useState({
      quaderno: true
    });
    const app = CATALOG.find(a => a.id === os.s.storeApp);
    const tile = (a, size) => /*#__PURE__*/React.createElement(AppIcon, {
      icon: a.icon,
      label: a.name,
      size: size,
      showLabel: false,
      variant: os.s.iconStyle,
      style: {
        margin: size < 40 ? '0 -4px' : 0
      }
    });
    if (app) {
      const on = inst[app.id];
      const fact = (k, v, i) => /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0,
          padding: '0 12px',
          borderLeft: i ? '1px solid var(--hairline)' : 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          font: 'var(--text-overline)',
          letterSpacing: 'var(--ls-caps)',
          textTransform: 'uppercase',
          color: 'var(--fg-3)'
        }
      }, k), /*#__PURE__*/React.createElement("div", {
        style: {
          font: 'var(--text-label)',
          marginTop: 4
        }
      }, v));
      return /*#__PURE__*/React.createElement("div", {
        className: "kit-scroll"
      }, /*#__PURE__*/React.createElement(Header, {
        os: {
          ...os,
          back: () => os.set({
            storeApp: null
          })
        },
        title: "",
        right: /*#__PURE__*/React.createElement(IconButton, {
          icon: "share-2",
          label: "Condividi"
        })
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 16,
          padding: '4px 16px 16px',
          alignItems: 'center'
        }
      }, tile(app, 72), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          font: 'var(--text-title)'
        }
      }, app.name), /*#__PURE__*/React.createElement("div", {
        style: {
          font: 'var(--text-footnote)',
          color: 'var(--fg-2)'
        }
      }, app.dev, " \xB7 ", app.cat))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          padding: '0 16px'
        }
      }, /*#__PURE__*/React.createElement(Button, {
        block: true,
        icon: on ? undefined : 'download',
        variant: on ? 'secondary' : 'primary',
        onClick: () => setInst(p => ({
          ...p,
          [app.id]: !on
        }))
      }, on ? 'Apri' : 'Installa · ' + app.size), on && /*#__PURE__*/React.createElement(Button, {
        variant: "danger",
        onClick: () => setInst(p => ({
          ...p,
          [app.id]: false
        }))
      }, "Disinstalla")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          margin: '20px 4px 0'
        }
      }, fact('Fonte', app.src), fact('Licenza', app.lic, 1), fact('Versione', app.ver, 1)), /*#__PURE__*/React.createElement("div", {
        className: "kit-note",
        style: {
          color: 'var(--fg-1)',
          font: 'var(--text-body-sm)',
          paddingTop: 20
        }
      }, app.desc), /*#__PURE__*/React.createElement(SectionHeader, null, "Autorizzazioni richieste \xB7 ", app.perms.length), /*#__PURE__*/React.createElement(ListGroup, null, app.perms.map(([i, n, note]) => /*#__PURE__*/React.createElement(ListRow, {
        key: n,
        icon: i,
        title: n,
        value: note
      }))), /*#__PURE__*/React.createElement(SectionHeader, null, "Verifiche"), /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
        icon: app.open ? 'code' : 'lock',
        title: app.open ? 'Codice sorgente pubblico' : 'Codice sorgente non pubblico',
        subtitle: app.open ? 'Compilata da sorgente dal repository' : 'Pacchetto fornito dallo sviluppatore',
        trailing: app.open ? /*#__PURE__*/React.createElement(Badge, {
          tone: "success",
          icon: "check"
        }, "Verificabile") : /*#__PURE__*/React.createElement(Badge, {
          tone: "warning",
          icon: "triangle-alert"
        }, "Non verificabile")
      }), /*#__PURE__*/React.createElement(ListRow, {
        icon: "file-check",
        title: "Firma del pacchetto valida",
        subtitle: "Controllata il 9 nov 2026"
      }), /*#__PURE__*/React.createElement(ListRow, {
        icon: "history",
        title: "Aggiornata il 3 nov 2026",
        subtitle: 'Versione ' + app.ver + ' · correzioni e traduzioni',
        chevron: true,
        onClick: () => {}
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 16
        }
      }));
    }
    const f = q.trim().toLowerCase();
    const list = CATALOG.filter(a => (cat === 'Tutte' || a.cat === cat) && (!f || (a.name + a.desc).toLowerCase().includes(f)));
    return /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "kit-h1",
      style: {
        marginTop: 12
      }
    }, "Store"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px'
      }
    }, /*#__PURE__*/React.createElement(SearchField, {
      value: q,
      onChange: setQ,
      placeholder: "Cerca app"
    })), /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll",
      style: {
        display: 'flex',
        gap: 8,
        padding: '12px 16px 0',
        overflowX: 'auto',
        flex: 'none'
      }
    }, ['Tutte', 'Comunicazione', 'Produttività', 'Mappe', 'Sicurezza'].map(c => /*#__PURE__*/React.createElement(Chip, {
      key: c,
      selected: cat === c,
      onClick: () => setCat(c)
    }, c))), /*#__PURE__*/React.createElement(SectionHeader, null, "Scelte dalla redazione"), /*#__PURE__*/React.createElement(ListGroup, null, list.map(a => /*#__PURE__*/React.createElement(ListRow, {
      key: a.id,
      leading: tile(a, 48),
      title: a.name,
      onClick: () => os.set({
        storeApp: a.id
      }),
      subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, a.desc, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'flex',
          gap: 6,
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        icon: a.open ? 'code' : 'lock'
      }, a.open ? 'Open source' : 'Proprietaria'), /*#__PURE__*/React.createElement(Badge, null, a.perms.length, " ", a.perms.length === 1 ? 'autorizzazione' : 'autorizzazioni'))),
      trailing: inst[a.id] ? /*#__PURE__*/React.createElement(Badge, {
        tone: "success",
        icon: "check"
      }, "Installata") : /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 18
      })
    }))), !list.length && /*#__PURE__*/React.createElement("div", {
      className: "kit-note",
      style: {
        textAlign: 'center',
        paddingTop: 32
      }
    }, "Nessuna app trovata."), /*#__PURE__*/React.createElement(SectionHeader, null, "Fonti attive"), /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
      icon: "package-check",
      title: "Repository Albori",
      subtitle: "Pacchetti compilati e firmati dal progetto",
      chevron: true,
      onClick: () => {}
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "users-round",
      title: "Repository della comunit\xE0",
      subtitle: "Mantenuto da volontari \xB7 revisione pubblica",
      chevron: true,
      onClick: () => {}
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "plus",
      title: "Aggiungi una fonte",
      onClick: () => {}
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 16
      }
    }));
  }
  function Updates({
    os
  }) {
    const {
      upd,
      updPct
    } = os.s;
    const [auto, setAuto] = React.useState(true);
    React.useEffect(() => {
      if (upd !== 'down') return;
      const t = setInterval(() => os.set(p => p.updPct >= 100 ? {
        upd: 'ready'
      } : {
        updPct: Math.min(100, p.updPct + 4)
      }), 180);
      return () => clearInterval(t);
    }, [upd]);
    const li = t => /*#__PURE__*/React.createElement("li", {
      style: {
        margin: '4px 0'
      }
    }, t);
    return /*#__PURE__*/React.createElement("div", {
      className: "kit-scroll"
    }, /*#__PURE__*/React.createElement(Header, {
      os: os,
      title: "Aggiornamenti"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '12px 16px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, "Versione installata"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-display)',
        lineHeight: 1.1
      }
    }, "1.1.3"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-mono)',
        color: 'var(--fg-2)'
      }
    }, "build 26104 \xB7 patch 5 ott 2026"))), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '20px 16px 0',
        padding: 16,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-title-sm)'
      }
    }, "Albori 1.2"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, "1,4 GB \xB7 riavvio di circa 4 minuti")), /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      icon: "arrow-up"
    }, "Disponibile")), upd === 'idle' && /*#__PURE__*/React.createElement(Button, {
      block: true,
      icon: "download",
      onClick: () => os.set({
        upd: 'down',
        updPct: 0
      })
    }, "Scarica e installa"), (upd === 'down' || upd === 'paused') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProgressBar, {
      value: updPct,
      label: "Download"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        font: 'var(--text-footnote)',
        color: 'var(--fg-2)'
      }
    }, /*#__PURE__*/React.createElement("span", null, upd === 'paused' ? 'In pausa' : 'Download in corso', " \xB7 ", updPct, "% \xB7 ", (1.4 * updPct / 100).toFixed(1).replace('.', ','), " di 1,4 GB"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      icon: upd === 'paused' ? 'play' : 'pause',
      onClick: () => os.set({
        upd: upd === 'paused' ? 'down' : 'paused'
      })
    }, upd === 'paused' ? 'Riprendi' : 'Pausa'))), upd === 'ready' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        font: 'var(--text-footnote)',
        color: 'var(--success)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-check",
      size: 16
    }), "Download completato \xB7 firma verificata"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      block: true,
      icon: "rotate-cw"
    }, "Riavvia e installa"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => os.set({
        upd: 'idle',
        updPct: 0
      })
    }, "Stanotte")))), /*#__PURE__*/React.createElement(SectionHeader, null, "Cosa contiene"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      icon: "shield-check"
    }, "Sicurezza \xB7 14 correzioni"), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: '8px 0 0',
        paddingLeft: 20,
        font: 'var(--text-body-sm)',
        color: 'var(--fg-1)'
      }
    }, li('Patch di sicurezza di novembre 2026'), li('2 vulnerabilità critiche nel modem e nel kernel'), li('Aggiornamento dei certificati di sistema'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      icon: "sparkles"
    }, "Nuove funzionalit\xE0 \xB7 3"), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: '8px 0 0',
        paddingLeft: 20,
        font: 'var(--text-body-sm)',
        color: 'var(--fg-1)'
      }
    }, li('Registro accessi esportabile in Privacy'), li('Tema automatico dall’alba al tramonto'), li('Ricerca universale anche nei file')))), /*#__PURE__*/React.createElement(SectionHeader, null, "Opzioni"), /*#__PURE__*/React.createElement(ListGroup, null, /*#__PURE__*/React.createElement(ListRow, {
      icon: "shield-check",
      title: "Installa da solo le correzioni di sicurezza",
      subtitle: "Di notte, in carica e con Wi-Fi",
      trailing: /*#__PURE__*/React.createElement(Switch, {
        checked: auto,
        onChange: setAuto,
        label: "Automatici"
      })
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "history",
      title: "Cronologia e ripristino",
      subtitle: "Torna alla 1.1.3 entro 7 giorni dall\u2019installazione",
      chevron: true,
      onClick: () => {}
    }), /*#__PURE__*/React.createElement(ListRow, {
      icon: "fingerprint",
      title: "Firma del pacchetto",
      subtitle: /*#__PURE__*/React.createElement("span", {
        style: {
          font: 'var(--text-mono)'
        }
      }, "sha256 9f3c 41ab \u2026 e1a7")
    })), /*#__PURE__*/React.createElement("div", {
      className: "kit-note"
    }, "Ultimo controllo: oggi alle 06:40."));
  }
  function Stub({
    os
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(Header, {
      os: os,
      title: os.s.stub
    }), /*#__PURE__*/React.createElement("div", {
      className: "kit-note",
      style: {
        margin: 'auto',
        textAlign: 'center',
        maxWidth: 260
      }
    }, "Schermata non inclusa in questo kit.", /*#__PURE__*/React.createElement("br", null), "Usa Indietro o il gesto Home per continuare."));
  }
  window.AlboriScreens = Object.assign(window.AlboriScreens || {}, {
    multitask: Multitask,
    store: Store,
    updates: Updates,
    stub: Stub
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/albori-os/screens-c.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.ListGroup = __ds_scope.ListGroup;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.ALBORI_APPS = __ds_scope.ALBORI_APPS;

__ds_ns.AppIcon = __ds_scope.AppIcon;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.NotificationCard = __ds_scope.NotificationCard;

__ds_ns.PhoneFrame = __ds_scope.PhoneFrame;

__ds_ns.QuickToggle = __ds_scope.QuickToggle;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.StatusBar = __ds_scope.StatusBar;

__ds_ns.Wallpaper = __ds_scope.Wallpaper;

})();
