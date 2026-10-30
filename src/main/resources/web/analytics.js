// Generated from web/*.ts by scripts/build.ts. Do not edit.

// node_modules/.pnpm/posthog-js@1.442.1/node_modules/posthog-js/dist/module.no-external.js
var e = "0.10.2";
var t = { DEBUG: (false, false), LIB_VERSION: (e, "1.442.1"), LIB_NAME: ("browser-common", "web"), JS_SDK_VERSION: e };
var i = t;
var s = "$early_access_features";
var r = "$active_feature_flags";
var n = "$feature_flag_details";
var o = "$feature_flag_errors";
var a = "$feature_flag_evaluated_at";
var l = "$feature_flag_request_id";
var c = "$minimal_flag_called_events";
var u = "$enabled_feature_flags";
var d = "$stored_group_properties";
var h = "$stored_person_properties";
var _ = "$flag_call_reported";
var p = "$flag_call_reported_session_id";
var g = "$feature_flag_payloads";
var v = "$override_feature_flags";
var f = "$override_feature_flag_payloads";
var m = "visibilitychange";
var y = "$autocapture_disabled_server_side";
var b = "$surveys";
var S = "$surveys_loaded_at";
var w = "PostHog loadExternalDependency extension not found.";
var E = "$surveys_activated";
var C = "$surveys_activated_session";
var k = "$surveys_activated_timestamps";
var x = "$people_distinct_id";
var P = "distinct_id";
var I = "$device_id";
var F = "$device_model";
var T = "__alias";
var R = "__cmpns";
var A = "$fbc";
var M = "$fbc_persistence";
var O = "$fbp";
var L = "$fbp_persistence";
var D = "__timers";
var N = "$heatmaps_enabled_server_side";
var B = "$exception_capture_enabled_server_side";
var U = "$error_tracking_suppression_rules";
var q = "$error_tracking_capture_extension_exceptions";
var H = "$web_vitals_enabled_server_side";
var z = "$dead_clicks_enabled_server_side";
var j = "$product_tours_enabled_server_side";
var W = "$logs_capture_enabled_server_side";
var V = "$web_vitals_allowed_metrics";
var G = "$session_recording_remote_config";
var K = "$session_recording_enabled_server_side";
var Q = "$replay_sample_rate";
var J = "$replay_override_sampling";
var Y = "$replay_override_linked_flag";
var Z = "$replay_override_url_trigger";
var X = "$replay_override_event_trigger";
var ee = "$sesid";
var te = "$session_is_sampled";
var ie = "$session_past_minimum_duration";
var se = "$session_recording_url_trigger_activated_session";
var re = "$session_recording_event_trigger_activated_session";
var ne = "$debug_first_full_snapshot_timestamp";
var oe = "$sess_rec_flush_size";
var ae = "$groups";
var le = "ph_product_tours";
var ce = "$product_tours_activated";
var ue = "$product_tours_activated_session";
var de = "$conversations_widget_session_id";
var he = "$conversations_ticket_id";
var _e = "$conversations_widget_state";
var pe = "$conversations_user_traits";
var ge = "$user_state";
var ve = "$client_session_props";
var fe = "$capture_rate_limit";
var me = "$initial_campaign_params";
var ye = "$initial_referrer_info";
var be = "$initial_person_info";
var Se = "$epp";
var we = "$posthog_cookieless";
var Ee = "$cookieless_mode";
var Ce = "$sdk_debug_extensions_init_method";
var ke = "$sdk_debug_extensions_init_time_ms";
var xe = "$sdk_debug_recording_script_not_loaded";
var Pe = "$sdk_debug_replay_stale_config";
var Ie = "$sdk_debug_replay_event_trigger_status";
var Fe = "$sdk_debug_replay_linked_flag_trigger_status";
var Te = "$sdk_debug_replay_matched_recording_trigger_groups";
var Re = "$sdk_debug_replay_pending_trigger_conditions";
var $e = "$sdk_debug_replay_remote_trigger_matching_config";
var Ae = "$sdk_debug_replay_trigger_groups_count";
var Me = "$sdk_debug_replay_url_trigger_status";
var Oe = "$session_recording_start_reason";
var Le = "anonymous";
var De = "identified";
var Ne = "identified_only";
var Be = "beforeunload";
var Ue = "$pageview";
var qe = "$pageleave";
var He = "$identify";
var ze = "$groupidentify";
var je = "u" > typeof window ? window : void 0;
var We = "u" > typeof globalThis ? globalThis : je;
var Ve = null == We ? void 0 : We.navigator;
var Ge = null == We ? void 0 : We.document;
var Ke = null == We ? void 0 : We.location;
var Qe = null == We ? void 0 : We.fetch;
var Je = (null == We ? void 0 : We.XMLHttpRequest) && "withCredentials" in new We.XMLHttpRequest() ? We.XMLHttpRequest : void 0;
var Ye = null == We ? void 0 : We.AbortController;
var Ze = null == We ? void 0 : We.CompressionStream;
var Xe = null == Ve ? void 0 : Ve.userAgent;
var et = "undefined" != typeof globalThis ? globalThis : je;
et && "undefined" == typeof self && (et.self = et), et && "undefined" == typeof File && (et.File = function() {
});
var tt = null != je ? je : {};
var it = (function(e5) {
  return e5.AnonymousId = "anonymous_id", e5.DistinctId = "distinct_id", e5.Props = "props", e5.EnablePersonProcessing = "enable_person_processing", e5.PersonMode = "person_mode", e5.FeatureFlagDetails = "feature_flag_details", e5.FeatureFlags = "feature_flags", e5.FeatureFlagPayloads = "feature_flag_payloads", e5.BootstrapFeatureFlagDetails = "bootstrap_feature_flag_details", e5.BootstrapFeatureFlags = "bootstrap_feature_flags", e5.BootstrapFeatureFlagPayloads = "bootstrap_feature_flag_payloads", e5.OverrideFeatureFlags = "override_feature_flags", e5.Queue = "queue", e5.AiQueue = "ai_queue", e5.AiCaptureQueue = "ai_capture_queue", e5.LogsQueue = "logs_queue", e5.OptedOut = "opted_out", e5.SessionId = "session_id", e5.SessionStartTimestamp = "session_start_timestamp", e5.SessionLastTimestamp = "session_timestamp", e5.PersonProperties = "person_properties", e5.GroupProperties = "group_properties", e5.InstalledAppBuild = "installed_app_build", e5.InstalledAppVersion = "installed_app_version", e5.SessionReplay = "session_replay", e5.PushRegistered = "push_registered", e5.SessionReplayEventTriggerActivatedSession = "session_replay_event_trigger_activated_session", e5.SurveyLastSeenDate = "survey_last_seen_date", e5.SurveysInProgress = "surveys_in_progress", e5.SurveysSeen = "surveys_seen", e5.Surveys = "surveys", e5.RemoteConfig = "remote_config", e5.FlagsEndpointWasHit = "flags_endpoint_was_hit", e5.DeviceId = "device_id", e5;
})({});
var st = (function(e5) {
  return e5.GZipJS = "gzip-js", e5.Base64 = "base64", e5;
})({});
var rt = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
var nt = ["token"];
function ot(e5, t2) {
  return -1 !== e5.indexOf(t2);
}
var at = function(e5) {
  return e5.trim();
};
var lt = function(e5) {
  return e5.replace(/^\$/, "");
};
function ct(e5) {
  var t2;
  const i2 = [];
  return null !== (t2 = JSON.stringify(e5, function(e6, t3) {
    if ("bigint" == typeof t3) return t3.toString();
    if ("function" != typeof t3 && "symbol" != typeof t3) {
      if (t3 instanceof Error) return { name: t3.name, message: t3.message, stack: t3.stack };
      if (t3 && "object" == typeof t3) {
        for (; i2.length > 0 && i2[i2.length - 1] !== this; ) i2.pop();
        if (i2.includes(t3)) return "[Circular]";
        i2.push(t3);
      }
      return t3;
    }
  })) && void 0 !== t2 ? t2 : "null";
}
var ut = Object.prototype;
var dt = ut.hasOwnProperty;
var ht = ut.toString;
var _t = Array.isArray || function(e5) {
  return "[object Array]" === ht.call(e5);
};
var pt = (e5) => "function" == typeof e5;
var gt = (e5) => e5 === Object(e5) && !_t(e5);
var vt = (e5) => {
  if (gt(e5)) {
    for (const t2 in e5) if (dt.call(e5, t2)) return false;
    return true;
  }
  return false;
};
var ft = (e5) => void 0 === e5;
var mt = (e5) => "[object String]" == ht.call(e5);
var yt = (e5) => mt(e5) && 0 === e5.trim().length;
var bt = (e5) => null === e5;
var St = (e5) => ft(e5) || bt(e5);
var wt = (e5) => "[object Number]" == ht.call(e5) && e5 == e5;
var Et = (e5) => wt(e5) && e5 > 0;
var Ct = (e5) => "[object Boolean]" === ht.call(e5);
var kt = (e5) => ot(rt, e5);
var xt = (e5) => ot(nt, e5);
function Pt(e5) {
  return null === e5 || "object" != typeof e5;
}
function It(e5, t2) {
  return {}.toString.call(e5) === `[object ${t2}]`;
}
function Ft(e5) {
  switch ({}.toString.call(e5)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object DOMError]":
    case "[object WebAssembly.Exception]":
      return true;
    default:
      return Rt(e5, Error);
  }
}
function Tt(e5) {
  return "u" > typeof Event && Rt(e5, Event);
}
function Rt(e5, t2) {
  try {
    return e5 instanceof t2;
  } catch (e6) {
    return false;
  }
}
var $t = [true, "true", 1, "1", "yes"];
var At = (e5) => ot($t, e5);
var Mt = [false, "false", 0, "0", "no"];
function Ot(e5, t2, i2, s2, r2, n2, o2) {
  try {
    var a2 = e5[n2](o2), l2 = a2.value;
  } catch (e6) {
    return void i2(e6);
  }
  a2.done ? t2(l2) : Promise.resolve(l2).then(s2, r2);
}
function Lt(e5) {
  return function() {
    var t2 = this, i2 = arguments;
    return new Promise(function(s2, r2) {
      var n2 = e5.apply(t2, i2);
      function o2(e6) {
        Ot(n2, s2, r2, o2, a2, "next", e6);
      }
      function a2(e6) {
        Ot(n2, s2, r2, o2, a2, "throw", e6);
      }
      o2(void 0);
    });
  };
}
var Dt = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterestbot", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"];
var Nt = /* @__PURE__ */ new Map();
var Bt = function(e5, t2 = []) {
  if (!e5) return false;
  const i2 = (function(e6, t3) {
    let i3 = "";
    for (let e7 = 0; t3.length > e7; e7++) {
      const s3 = t3[e7];
      i3 += s3.length + ":" + s3;
    }
    return e6.length + ":" + e6 + "|" + t3.length + ":" + i3;
  })(e5, t2), s2 = Nt.get(i2);
  if (void 0 !== s2) return s2;
  const r2 = e5.toLowerCase(), n2 = Dt.concat(t2).some((e6) => -1 !== r2.indexOf(e6.toLowerCase()));
  return 256 > Nt.size || Nt.clear(), Nt.set(i2, n2), n2;
};
function Ut(e5, t2, i2, s2, r2) {
  return t2 > i2 && (s2.warn("min cannot be greater than max."), t2 = i2), wt(e5) ? e5 > i2 ? (s2.warn(" cannot be  greater than max: " + i2 + ". Using max value instead."), i2) : t2 > e5 ? (s2.warn(" cannot be less than min: " + t2 + ". Using min value instead."), t2) : e5 : (s2.warn(" must be a number. using max or fallback. max: " + i2 + ", fallback: " + r2), Ut(null != r2 ? r2 : i2, t2, i2, s2));
}
var qt = class {
  constructor(e5) {
    this._buckets = {}, this._onBucketRateLimited = e5._onBucketRateLimited, this._bucketSize = Ut(e5.bucketSize, 0, 100, e5._logger), this._refillRate = Ut(e5.refillRate, 0, this._bucketSize, e5._logger), this._refillInterval = Ut(e5.refillInterval, 0, 864e5, e5._logger);
  }
  _applyRefill(e5, t2) {
    const i2 = Math.floor((t2 - e5.lastAccess) / this._refillInterval);
    i2 > 0 && (e5.tokens = Math.min(e5.tokens + i2 * this._refillRate, this._bucketSize), e5.lastAccess = e5.lastAccess + i2 * this._refillInterval);
  }
  consumeRateLimit(e5) {
    var t2;
    const i2 = Date.now(), s2 = String(e5);
    let r2 = this._buckets[s2];
    return r2 ? this._applyRefill(r2, i2) : (r2 = { tokens: this._bucketSize, lastAccess: i2 }, this._buckets[s2] = r2), 0 === r2.tokens || (r2.tokens--, 0 === r2.tokens && (null === (t2 = this._onBucketRateLimited) || void 0 === t2 || t2.call(this, e5)), 0 === r2.tokens);
  }
  stop() {
    this._buckets = {};
  }
};
var Ht = "Mobile";
var zt = "Android";
var jt = "Tablet";
var Wt = "Android Tablet";
var Vt = "iPad";
var Gt = "Apple Watch";
var Kt = "Safari";
var Qt = "BlackBerry";
var Jt = "Samsung Internet";
var Yt = "Chrome";
var Zt = "Chrome iOS";
var Xt = "Internet Explorer";
var ei = "Internet Explorer Mobile";
var ti = "Opera";
var ii = "Microsoft Edge";
var si = "Firefox";
var ri = "Firefox iOS";
var ni = "Nintendo";
var oi = "PlayStation";
var ai = "Xbox";
var li = "Android Mobile";
var ci = "Mobile Safari";
var ui = "Windows";
var di = "Windows Phone";
var hi = "Nokia";
var _i = "Ouya";
var pi = "Generic " + Ht.toLowerCase();
var gi = "Generic " + jt.toLowerCase();
var vi = "Konqueror";
var fi = "Oculus Browser";
var mi = "Vivaldi";
var yi = "Yandex";
var bi = "Whale";
var Si = "DuckDuckGo";
var wi = "Pale Moon";
var Ei = "Waterfox";
var Ci = "Brave";
var ki = "Claude";
var xi = "Codex";
var Pi = "ChatGPT";
var Ii = "Google Search App";
var Fi = new RegExp("Version/(\\d+(\\.\\d+)?)");
var Ti = new RegExp("(Claude|Codex|ChatGPT)\\/(\\d+(\\.\\d+)?)");
var Ri = new RegExp(ai, "i");
var $i = new RegExp("PlayStation \\w+", "i");
var Ai = new RegExp("Nintendo \\w+", "i");
var Mi = new RegExp("BlackBerry|PlayBook|BB10", "i");
var Oi = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
var Li = function(e5, t2, i2, s2) {
  t2 = t2 || "";
  const r2 = (function(e6) {
    return (null == e6 ? void 0 : e6.brave) ? Ci : null;
  })(i2);
  return r2 || ((null == s2 ? void 0 : s2.detectGoogleSearchApp) && ot(e5, "GSA/") ? Ii : ot(e5, " OPR/") && ot(e5, "Mini") ? "Opera Mini" : ot(e5, " OPR/") ? ti : Mi.test(e5) ? Qt : ot(e5, "IEMobile") || ot(e5, "WPDesktop") ? ei : ot(e5, "OculusBrowser") ? fi : ot(e5, "SamsungBrowser") ? Jt : ot(e5, "Edge") || ot(e5, "Edg/") ? ii : ot(e5, "Vivaldi/") ? mi : ot(e5, "YaBrowser/") ? yi : ot(e5, "Whale/") ? bi : ot(e5, "DuckDuckGo/") || ot(e5, "Ddg/") ? Si : ot(e5, "Claude/") ? ki : ot(e5, "Codex/") ? xi : ot(e5, "ChatGPT/") ? Pi : ot(e5, "FBIOS") ? "Facebook Mobile" : ot(e5, "UCWEB") || ot(e5, "UCBrowser") ? "UC Browser" : ot(e5, "CriOS") ? Zt : ot(e5, "CrMo") || ot(e5, Yt) ? Yt : ot(e5, zt) && ot(e5, Kt) ? li : ot(e5, "FxiOS") ? ri : ot(e5.toLowerCase(), vi.toLowerCase()) ? vi : ot(e5, "Brave/") ? Ci : ((e6, t3) => t3 && ot(t3, "Apple") || (function(e7) {
    return ot(e7, Kt) && !ot(e7, Yt) && !ot(e7, zt);
  })(e6))(e5, t2) ? ot(e5, Ht) ? ci : Kt : ot(e5, "PaleMoon/") ? wi : ot(e5, "Waterfox/") ? Ei : ot(e5, si) ? si : ot(e5, "MSIE") || ot(e5, "Trident/") ? Xt : ot(e5, "Gecko") ? si : "");
};
var Di = { [ei]: [new RegExp("rv:(\\d+(\\.\\d+)?)")], [ii]: [new RegExp("Edge?\\/(\\d+(\\.\\d+)?)")], [Yt]: [new RegExp("(Chrome|CrMo)\\/(\\d+(\\.\\d+)?)")], [Zt]: [new RegExp("CriOS\\/(\\d+(\\.\\d+)?)")], "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/(\\d+(\\.\\d+)?)")], [Kt]: [Fi], [ci]: [Fi], [ti]: [new RegExp("(Opera|OPR)\\/(\\d+(\\.\\d+)?)")], [si]: [new RegExp("Firefox\\/(\\d+(\\.\\d+)?)")], [ri]: [new RegExp("FxiOS\\/(\\d+(\\.\\d+)?)")], [vi]: [new RegExp("Konqueror[:/]?(\\d+(\\.\\d+)?)", "i")], [Qt]: [new RegExp("BlackBerry (\\d+(\\.\\d+)?)"), Fi], [li]: [new RegExp("android\\s(\\d+(\\.\\d+)?)", "i")], [Jt]: [new RegExp("SamsungBrowser\\/(\\d+(\\.\\d+)?)")], [fi]: [new RegExp("OculusBrowser\\/(\\d+(\\.\\d+)?)")], [mi]: [new RegExp("Vivaldi\\/(\\d+(\\.\\d+)?)")], [yi]: [new RegExp("YaBrowser\\/(\\d+(\\.\\d+)?)")], [bi]: [new RegExp("Whale\\/(\\d+(\\.\\d+)?)")], [Ci]: [new RegExp("Brave\\/(\\d+(\\.\\d+)?)")], [ki]: [Ti], [xi]: [Ti], [Pi]: [Ti], [Si]: [new RegExp("(DuckDuckGo|Ddg)\\/(\\d+(\\.\\d+)?)")], [wi]: [new RegExp("PaleMoon\\/(\\d+(\\.\\d+)?)")], [Ei]: [new RegExp("Waterfox\\/(\\d+(\\.\\d+)?)")], [Ii]: [new RegExp("GSA\\/(\\d+(\\.\\d+)?)")], [Xt]: [new RegExp("(rv:|MSIE )(\\d+(\\.\\d+)?)")], Mozilla: [new RegExp("rv:(\\d+(\\.\\d+)?)")] };
var Ni = function(e5, t2, i2, s2) {
  const r2 = Li(e5, t2, i2, s2), n2 = Di[r2];
  if (ft(n2)) return null;
  for (let t3 = 0; n2.length > t3; t3++) {
    const i3 = e5.match(n2[t3]);
    if (i3) return parseFloat(i3[i3.length - 2]);
  }
  return null;
};
var Bi = [[new RegExp("Xbox; Xbox (.*?)[);]", "i"), (e5) => [ai, e5 && e5[1] || ""]], [new RegExp(ni, "i"), [ni, ""]], [new RegExp(oi, "i"), [oi, ""]], [Mi, [Qt, ""]], [new RegExp(ui, "i"), (e5, t2) => {
  if (/Phone/.test(t2) || /WPDesktop/.test(t2)) return [di, ""];
  if (new RegExp(Ht).test(t2) && !/IEMobile\b/.test(t2)) return ["Windows Mobile", ""];
  const i2 = /Windows NT ([0-9.]+)/i.exec(t2);
  if (i2 && i2[1]) {
    let e6 = Oi[i2[1]] || "";
    return /arm/i.test(t2) && (e6 = "RT"), [ui, e6];
  }
  return [ui, ""];
}], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e5) => e5 && e5[3] ? ["iOS", [e5[3], e5[4], e5[5] || "0"].join(".")] : ["iOS", ""]], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e5) => {
  let t2 = "";
  return e5 && e5.length >= 3 && (t2 = ft(e5[2]) ? e5[3] : e5[2]), ["watchOS", t2];
}], [new RegExp("(Android (\\d+)\\.(\\d+)\\.?(\\d+)?|Android)", "i"), (e5) => e5 && e5[2] ? [zt, [e5[2], e5[3], e5[4] || "0"].join(".")] : [zt, ""]], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e5) => {
  const t2 = ["Mac OS X", ""];
  return e5 && e5[1] && (t2[1] = [e5[1], e5[2], e5[3] || "0"].join(".")), t2;
}], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, ["Chrome OS", ""]], [/Linux|debian/i, ["Linux", ""]]];
var Ui = function(e5) {
  for (let t2 = 0; Bi.length > t2; t2++) {
    const [i2, s2] = Bi[t2], r2 = i2.exec(e5), n2 = r2 && (pt(s2) ? s2(r2, e5) : s2);
    if (n2) return n2;
  }
  return ["", ""];
};
var qi = function(e5) {
  return Ai.test(e5) ? ni : $i.test(e5) ? oi : Ri.test(e5) ? ai : new RegExp(_i, "i").test(e5) ? _i : new RegExp("(Windows Phone|WPDesktop)", "i").test(e5) ? di : /iPad/.test(e5) ? Vt : /iPod/.test(e5) ? "iPod Touch" : /iPhone/.test(e5) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e5) ? Gt : Mi.test(e5) ? Qt : /(kobo)\s(ereader|touch)/i.test(e5) ? "Kobo" : new RegExp(hi, "i").test(e5) ? hi : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e5) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e5) ? "Kindle Fire" : /(Android|ZTE)/i.test(e5) ? new RegExp(Ht).test(e5) && !/(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e5) || /pixel[\daxl ]{1,6}/i.test(e5) && !/pixel c/i.test(e5) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e5) || /lmy47v/i.test(e5) && !/QTAQZ3/i.test(e5) ? zt : Wt : new RegExp("(pda|Mobile)", "i").test(e5) ? pi : new RegExp(jt, "i").test(e5) && !new RegExp("Tablet pc", "i").test(e5) ? gi : "";
};
var Hi = function(e5, t2) {
  var i2;
  const s2 = qi(e5);
  return s2 === Vt || s2 === Wt || "Kobo" === s2 || "Kindle Fire" === s2 || s2 === gi ? jt : s2 === ni || s2 === ai || s2 === oi || s2 === _i ? "Console" : s2 === Gt ? "Wearable" : s2 ? Ht : "Android" === (null == t2 ? void 0 : t2.userAgentDataPlatform) && (null !== (i2 = null == t2 ? void 0 : t2.maxTouchPoints) && void 0 !== i2 ? i2 : 0) > 0 ? 600 > Math.min(null !== (r2 = null == t2 ? void 0 : t2.screenWidth) && void 0 !== r2 ? r2 : 0, null !== (n2 = null == t2 ? void 0 : t2.screenHeight) && void 0 !== n2 ? n2 : 0) / (null !== (o2 = null == t2 ? void 0 : t2.devicePixelRatio) && void 0 !== o2 ? o2 : 1) ? Ht : jt : "Desktop";
  var r2, n2, o2;
};
var zi = /\bFBAV\/(\d+(?:\.\d+)*)/i;
var ji = [[/\bInstagram(?:[ /](\d+(?:\.\d+)*))?\b/i, "Instagram"], [/\bBarcelona[ /](\d+(?:\.\d+)*)?/i, "Threads"], [/\b(?:MessengerForiOS|(?:FBAN|FB_IAB)\/Orca-Android)\b/i, "Messenger", zi], [/\bFBAN\/EMA\b/i, "Facebook Lite", zi], [/\b(?:FBIOS|(?:FBAN|FB_IAB)\/(?:FB4A|FBIOS))\b/i, "Facebook", zi], [/\bLinkedInApp(?:\]?\/(\d+(?:\.\d+)*))?\b/i, "LinkedIn"], [/\bTwitter(?:Android| for (?:iPhone|iPad|Android))(?:\/(\d+(?:\.\d+)*))?\b/i, "Twitter"], [/\b(?:musical_ly|trill)(?:[_/](\d+\.\d+(?:\.\d+)*))?(?=\b|_)/i, "TikTok", /\bapp_version\/(\d+(?:\.\d+)*)/i], [/\b(?:MicroMessenger|WeChat)\/(\d+(?:\.\d+)*)?/i, "WeChat"], [/\bLine\/(\d+(?:\.\d+)*)?/i, "Line"], [/\bGSA\/(\d+(?:\.\d+)*)?/i, "Google"], [/\[Pinterest\/(?:iOS|Android)\b|\bPinterest(?: for (?:Android(?: Tablet)?|iOS))?\/(\d+(?:\.\d+)*)/i, "Pinterest"], [/\b(?:WA4A|WAiOS)\/(\d+(?:\.\d+)*)?/i, "WhatsApp"], [/\bSnapchat[ /](\d+(?:\.\d+)*)?/i, "Snapchat"], [/\bBing(?:Web|Sapphire)\/(\d+(?:\.\d+)*)?/i, "Bing"], [/\bNAVER\(inapp; search;/i, "Naver", /\bNAVER\(inapp; search;[^;)]*; (\d+(?:\.\d+)*)/i], [/\bKAKAOTALK[ /](\d+\.\d+(?:\.\d+)*)?/i, "KakaoTalk"]];
var Wi = "[Truncated]";
var Vi = "[Unserializable]";
function Gi(e5) {
  let t2 = "";
  for (let i2 = 0; e5.length > i2; i2++) {
    const s2 = e5.charCodeAt(i2);
    if (55296 > s2 || s2 > 56319) t2 += 56320 > s2 || s2 > 57343 ? e5[i2] : "\uFFFD";
    else {
      const s3 = e5.charCodeAt(i2 + 1);
      56320 > s3 || s3 > 57343 ? t2 += "\uFFFD" : (t2 += e5[i2] + e5[i2 + 1], i2++);
    }
  }
  return t2;
}
function Ki(e5, t2) {
  if (!t2) return e5;
  let i2 = [];
  try {
    i2 = Object.keys(t2);
  } catch (e6) {
    i2 = [];
  }
  for (const s2 of i2) {
    let i3;
    try {
      i3 = t2[s2];
    } catch (e6) {
      i3 = Vi;
    }
    Object.defineProperty(e5, s2, { value: i3, enumerable: true, writable: true, configurable: true });
  }
  return e5;
}
var Qi = 3e5;
var Ji = class {
  record(e5) {
    if ("too-large" === e5.kind) return;
    if ("retry-later" !== e5.kind) return void this.reset();
    if (!e5.retryAfterMs) return;
    const t2 = this.isOpen(), i2 = Date.now(), s2 = Math.min(e5.retryAfterMs, Qi);
    if (!t2) return this._installedAt = i2, void (this._until = i2 + s2);
    this._until = Math.max(this._until, Math.min(i2 + s2, this._installedAt + Qi));
  }
  remainingMs() {
    const e5 = Date.now();
    if (this._installedAt - 5e3 > e5) return this.reset(), 0;
    const t2 = Math.min(Qi, Math.max(0, this._until - e5));
    return 0 === t2 && this.reset(), t2;
  }
  isOpen() {
    return this.remainingMs() > 0;
  }
  reset() {
    this._until = 0, this._installedAt = 0;
  }
  constructor() {
    this._until = 0, this._installedAt = 0;
  }
};
var Yi = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Zi(e5, t2) {
  return "string" == typeof (i2 = e5) && Yi.test(i2) ? e5 : t2();
  var i2;
}
function Xi(e5, t2) {
  const i2 = new Error(t2);
  try {
    Object.defineProperty(i2, "name", { value: e5, writable: true, enumerable: true, configurable: true });
  } catch (e6) {
  }
  return i2;
}
function es(e5) {
  return e5 ? e5.split("#")[0] : e5;
}
function ts(e5) {
  try {
    return e5();
  } catch (e6) {
    return;
  }
}
function is(e5, t2) {
  const i2 = setTimeout(e5, t2);
  return null != i2 && i2.unref && (null == i2 || i2.unref()), i2;
}
function ss(e5, t2, i2) {
  return rs.apply(this, arguments);
}
function rs() {
  return (rs = Lt(function* (e5, t2, i2) {
    let s2;
    try {
      return yield Promise.race([e5, new Promise((e6, r2) => {
        s2 = is(() => {
          try {
            null == i2 || i2(), e6();
          } catch (e7) {
            r2(e7);
          }
        }, t2);
      })]);
    } finally {
      clearTimeout(s2);
    }
  })).apply(this, arguments);
}
function ns(e5) {
  return ns = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e6) {
    return typeof e6;
  } : function(e6) {
    return e6 && "function" == typeof Symbol && e6.constructor === Symbol && e6 !== Symbol.prototype ? "symbol" : typeof e6;
  }, ns(e5);
}
function os(e5, t2, i2) {
  return (t2 = (function(e6) {
    var t3 = (function(e7) {
      if ("object" != ns(e7) || !e7) return e7;
      var t4 = e7[Symbol.toPrimitive];
      if (void 0 !== t4) {
        var i3 = t4.call(e7, "string");
        if ("object" != ns(i3)) return i3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e7);
    })(e6);
    return "symbol" == ns(t3) ? t3 : t3 + "";
  })(t2)) in e5 ? Object.defineProperty(e5, t2, { value: i2, enumerable: true, configurable: true, writable: true }) : e5[t2] = i2, e5;
}
function as(e5, t2) {
  var i2 = Object.keys(e5);
  if (Object.getOwnPropertySymbols) {
    var s2 = Object.getOwnPropertySymbols(e5);
    t2 && (s2 = s2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e5, t3).enumerable;
    })), i2.push.apply(i2, s2);
  }
  return i2;
}
function ls(e5) {
  for (var t2 = 1; arguments.length > t2; t2++) {
    var i2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? as(Object(i2), true).forEach(function(t3) {
      os(e5, t3, i2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e5, Object.getOwnPropertyDescriptors(i2)) : as(Object(i2)).forEach(function(t3) {
      Object.defineProperty(e5, t3, Object.getOwnPropertyDescriptor(i2, t3));
    });
  }
  return e5;
}
var cs;
var us;
var ds;
var hs;
function _s(e5) {
  var t2;
  const i2 = globalThis._posthogChunkIds, s2 = globalThis._debugIds;
  if (!i2 && !s2) return;
  const r2 = i2 ? Object.keys(i2) : [], n2 = s2 ? Object.keys(s2) : [];
  if (hs && ps(i2, r2, us) && ps(s2, n2, ds)) return hs;
  us = i2 ? ls({}, i2) : void 0, ds = s2 ? ls({}, s2) : void 0, hs = {}, null !== (t2 = cs) && void 0 !== t2 || (cs = {});
  const o2 = (t3, i3) => {
    for (const r3 of t3) {
      const t4 = i3[r3];
      if (!t4) continue;
      const n3 = null == cs ? void 0 : cs[r3];
      if (n3) {
        hs[n3] = t4;
        continue;
      }
      const o3 = e5(r3);
      for (let e6 = o3.length - 1; e6 >= 0; e6--) {
        var s3;
        const i4 = null === (s3 = o3[e6]) || void 0 === s3 ? void 0 : s3.filename;
        if (i4) {
          hs[i4] = t4, cs[r3] = i4;
          break;
        }
      }
    }
  };
  return s2 && o2(n2, s2), i2 && o2(r2, i2), hs;
}
function ps(e5, t2, i2) {
  return e5 && i2 ? t2.length === Object.keys(i2).length && t2.every((t3) => e5[t3] === i2[t3]) : e5 === i2;
}
var gs = class {
  constructor(e5, t2, i2 = []) {
    this.coercers = e5, this.stackParser = t2, this.modifiers = i2;
  }
  buildFromUnknown(e5, t2 = {}) {
    const i2 = t2 && t2.mechanism || { handled: true, type: "generic" }, s2 = this.buildCoercingContext(i2, t2, 0).apply(e5), r2 = this.buildParsingContext(t2), n2 = this.parseStacktrace(s2, r2);
    return { $exception_list: this.convertToExceptionList(n2, i2), $exception_level: "error" };
  }
  modifyFrames(e5) {
    var t2 = this;
    return Lt(function* () {
      for (const i2 of e5) i2.stacktrace && i2.stacktrace.frames && _t(i2.stacktrace.frames) && (i2.stacktrace.frames = yield t2.applyModifiers(i2.stacktrace.frames));
      return e5;
    })();
  }
  coerceFallback(e5) {
    var t2;
    return { type: "Error", value: "Unknown error", stack: null === (t2 = e5.syntheticException) || void 0 === t2 ? void 0 : t2.stack, synthetic: true };
  }
  parseStacktrace(e5, t2) {
    var i2;
    let s2, r2;
    if (null != e5.cause && (s2 = this.parseStacktrace(e5.cause, t2)), "" != e5.stack && null != e5.stack) try {
      r2 = this.applyChunkIds(this.stackParser(e5.stack, e5.synthetic ? t2.skipFirstLines : 0), t2.chunkIdMap);
    } catch (e6) {
    }
    return ls(ls({}, e5), {}, { cause: s2, stack: r2, errors: null === (i2 = e5.errors) || void 0 === i2 ? void 0 : i2.map((e6) => this.parseStacktrace(e6, t2)) });
  }
  applyChunkIds(e5, t2) {
    return e5.map((e6) => (e6.filename && t2 && (e6.chunk_id = t2[e6.filename]), e6));
  }
  applyCoercers(e5, t2) {
    for (const i2 of this.coercers) if (i2.match(e5)) return i2.coerce(e5, t2);
    return this.coerceFallback(t2);
  }
  applyModifiers(e5) {
    var t2 = this;
    return Lt(function* () {
      let i2 = e5;
      for (const e6 of t2.modifiers) i2 = yield e6(i2);
      return i2;
    })();
  }
  convertToExceptionList(e5, t2) {
    const i2 = [], s2 = (e6, r2, n2) => {
      var o2;
      const a2 = i2.length, l2 = void 0 === r2 ? ls(ls({ type: "string" == typeof t2.type && t2.type.length > 0 ? t2.type : "generic" }, "boolean" == typeof t2.handled ? { handled: t2.handled } : void 0 === t2.handled ? { handled: true } : {}), {}, { synthetic: "boolean" == typeof t2.synthetic ? t2.synthetic : e6.synthetic, exception_id: a2 }) : { type: "chained", source: n2, synthetic: e6.synthetic, exception_id: a2, parent_id: r2 }, c2 = { type: e6.type, value: e6.value, mechanism: l2 };
      e6.stack && (c2.stacktrace = { type: "raw", frames: e6.stack }), i2.push(c2), e6.cause && s2(e6.cause, a2, "cause");
      for (const t3 of null !== (o2 = e6.errors) && void 0 !== o2 ? o2 : []) s2(t3, a2, "member");
    };
    return s2(e5), i2;
  }
  buildParsingContext(e5) {
    var t2;
    return { chunkIdMap: _s(this.stackParser), skipFirstLines: null !== (t2 = e5.skipFirstLines) && void 0 !== t2 ? t2 : 1 };
  }
  getAggregateErrors(e5) {
    try {
      if (Ft(e5)) {
        let i2 = Object.getPrototypeOf(e5);
        for (let s2 = 0; i2 && 100 > s2; s2++) {
          var t2;
          const s3 = null === (t2 = Object.getOwnPropertyDescriptor(i2, "constructor")) || void 0 === t2 ? void 0 : t2.value;
          if ("function" == typeof s3 && "AggregateError" === s3.name) {
            const t3 = e5.errors;
            return _t(t3) ? t3 : void 0;
          }
          i2 = Object.getPrototypeOf(i2);
        }
      }
    } catch (e6) {
    }
  }
  buildCoercingContext(e5, t2, i2 = 0) {
    let s2 = 0, r2 = 0, n2 = false;
    const o2 = /* @__PURE__ */ new Set(), a2 = [], l2 = {}, c2 = (e6, t3, i3 = 0) => {
      const c3 = u2(t3, i3), d3 = c3.apply;
      if (c3.apply = (t4) => {
        a2.push(e6);
        try {
          return d3(t4);
        } finally {
          a2.pop();
        }
      }, i3 > 4 || i3 > 0 && -1 !== a2.indexOf(e6)) return this.coerceFallback(c3);
      const h2 = "object" == typeof e6 && null !== e6 || "function" == typeof e6;
      if (0 === i3 && s2 >= 50 || h2 && o2.has(e6)) return;
      h2 && o2.add(e6), 0 === i3 && s2++;
      const _2 = this.getAggregateErrors(e6);
      let p2, g2;
      n2 || (n2 = !!_2);
      try {
        if (p2 = this.applyCoercers(e6, c3), !p2) throw l2;
      } catch (e7) {
        if (e7 === l2) return void (0 === i3 && s2--);
        if (!n2) throw e7;
        p2 = this.coerceFallback(c3);
      }
      if (!_2 || s2 >= 50) return p2;
      try {
        g2 = _2.length;
      } catch (e7) {
        return p2;
      }
      if (!Number.isInteger(g2) || 0 > g2 || g2 > 4294967295) return p2;
      const v2 = [];
      for (let e7 = 0; 50 > s2 && 1e3 > r2 && g2 > e7; e7++) {
        let i4;
        r2++;
        try {
          i4 = c3.next(_2[e7]);
        } catch (e8) {
          s2++, i4 = this.coerceFallback(u2(t3 + 1));
        }
        i4 && v2.push(i4);
      }
      return ls(ls({}, p2), {}, { errors: v2 });
    }, u2 = (i3, s3 = 0) => ls(ls({}, t2), {}, { syntheticException: 0 == i3 ? t2.syntheticException : void 0, mechanism: 0 == i3 ? e5 : {}, apply(e6) {
      const t3 = c2(e6, i3, s3 + 1);
      if (!t3) throw l2;
      return t3;
    }, next: (e6) => c2(e6, i3 + 1) }), d2 = u2(i2);
    return ls(ls({}, d2), {}, { apply: (e6) => {
      var t3;
      return null !== (t3 = c2(e6, i2)) && void 0 !== t3 ? t3 : this.coerceFallback(d2);
    } });
  }
};
var vs = /^([a-z][a-z0-9.+-]+):/i;
var fs = ["http", "https", "file", "blob", "app", "capacitor", "ionic", "webpack", "webpack-internal", "ng"];
function ms(e5) {
  if (!e5 || "<anonymous>" === e5) return false;
  const t2 = vs.exec(e5);
  return !t2 || fs.includes(t2[1].toLowerCase());
}
function ys(e5, t2, i2, s2, r2) {
  const n2 = { platform: e5, filename: t2, function: "<anonymous>" === i2 ? "?" : i2, in_app: ms(t2) };
  return ft(s2) || (n2.lineno = s2), ft(r2) || (n2.colno = r2), n2;
}
var bs = (e5, t2) => {
  const i2 = -1 !== e5.indexOf("safari-extension"), s2 = -1 !== e5.indexOf("safari-web-extension");
  return i2 || s2 ? [-1 !== e5.indexOf("@") ? e5.split("@")[0] : "?", i2 ? `safari-extension:${t2}` : `safari-web-extension:${t2}`] : [e5, t2];
};
var Ss = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var ws = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var Es = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var Cs = (e5, t2) => {
  const i2 = Ss.exec(e5);
  if (i2) {
    const [, e6, s3, r2] = i2;
    return ys(t2, e6, "?", +s3, +r2);
  }
  const s2 = ws.exec(e5);
  if (s2) {
    if (s2[2] && 0 === s2[2].indexOf("eval")) {
      const e7 = Es.exec(s2[2]);
      e7 && (s2[2] = e7[1], s2[3] = e7[2], s2[4] = e7[3]);
    }
    const [e6, i3] = bs(s2[1] || "?", s2[2]);
    return ys(t2, i3, e6, s2[3] ? +s2[3] : void 0, s2[4] ? +s2[4] : void 0);
  }
};
var ks = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var xs = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var Ps = (e5, t2) => {
  const i2 = ks.exec(e5);
  if (i2) {
    if (i2[3] && i2[3].indexOf(" > eval") > -1) {
      const e7 = xs.exec(i2[3]);
      e7 && (i2[1] = i2[1] || "eval", i2[3] = e7[1], i2[4] = e7[2], i2[5] = "");
    }
    let e6 = i2[3], s2 = i2[1] || "?";
    return [s2, e6] = bs(s2, e6), ys(t2, e6, s2, i2[4] ? +i2[4] : void 0, i2[5] ? +i2[5] : void 0);
  }
};
var Is = /\(error: (.*)\)/;
function Fs(e5, t2) {
  return e5.filename === t2.filename && e5.function === t2.function && e5.module === t2.module && e5.lineno === t2.lineno && e5.colno === t2.colno;
}
function Ts(e5) {
  for (let t2 = 1; 10 >= t2; t2++) {
    const i2 = e5.length - 2 * t2;
    if (0 > i2) break;
    let s2 = true;
    for (let r2 = 0; t2 > r2; r2++) if (!Fs(e5[i2 + r2], e5[i2 + t2 + r2])) {
      s2 = false;
      break;
    }
    if (s2) {
      for (let s3 = 0; t2 > s3; s3++) e5[i2 + s3] = e5[i2 + t2 + s3];
      return e5.length = i2 + t2, { start: i2, length: t2 };
    }
  }
}
function Rs(e5, t2) {
  const i2 = t2.start + t2.length, s2 = As(e5, t2);
  s2 && e5.splice(i2 + s2 === e5.length ? i2 : t2.start, s2);
}
function $s(e5, t2) {
  let i2 = t2.start;
  for (; i2 > 0 && Fs(e5[i2 - 1], e5[i2 - 1 + t2.length]); ) i2--;
  return t2.start - i2;
}
function As(e5, t2) {
  const i2 = t2.start + t2.length;
  let s2 = i2;
  for (; e5.length > s2 && Fs(e5[s2], e5[s2 - t2.length]); ) s2++;
  return s2 - i2;
}
function Ms(e5, t2) {
  const i2 = t2[0];
  let s2 = e5.length - (i2 ? $s(e5, i2) : 0);
  for (const i3 of t2) s2 -= As(e5, i3);
  return s2;
}
function Os(e5, t2, i2) {
  for (let s2 = 0; e5.length > s2; s2++) {
    const r2 = e5[(t2 + s2) % e5.length], n2 = e5[(i2 + s2) % e5.length];
    if (r2 !== n2) return n2 > r2;
  }
  return false;
}
var Ls = class {
  match(e5) {
    return this.isDOMException(e5) || this.isDOMError(e5);
  }
  coerce(e5, t2) {
    const i2 = mt(e5.stack);
    return { type: this.getType(e5), value: this.getValue(e5), stack: i2 ? e5.stack : void 0, cause: e5.cause ? t2.next(e5.cause) : void 0, synthetic: false };
  }
  getType(e5) {
    return this.isDOMError(e5) ? "DOMError" : "DOMException";
  }
  getValue(e5) {
    const t2 = e5.name || (this.isDOMError(e5) ? "DOMError" : "DOMException");
    return e5.message ? `${t2}: ${e5.message}` : t2;
  }
  isDOMException(e5) {
    return It(e5, "DOMException");
  }
  isDOMError(e5) {
    return It(e5, "DOMError");
  }
};
var Ds = class {
  match(e5) {
    return Ft(e5);
  }
  coerce(e5, t2) {
    var i2;
    const s2 = this.getStack(e5), r2 = void 0 === s2 ? null === (i2 = t2.syntheticException) || void 0 === i2 ? void 0 : i2.stack : void 0, n2 = !!r2;
    return { type: this.getType(e5), value: this.getMessage(e5, t2), stack: null != s2 ? s2 : r2, cause: e5.cause ? t2.next(e5.cause) : void 0, synthetic: n2 };
  }
  getType(e5) {
    return e5.name || e5.constructor.name;
  }
  getMessage(e5, t2) {
    const i2 = e5.message;
    return String(i2.error && "string" == typeof i2.error.message ? i2.error.message : i2);
  }
  getStack(e5) {
    try {
      const t2 = e5.stacktrace;
      if ("string" == typeof t2 && t2.length > 0) return t2;
      const i2 = e5.stack;
      return "string" == typeof i2 && i2.length > 0 ? i2 : void 0;
    } catch (e6) {
      return;
    }
  }
};
var Ns = class {
  match(e5) {
    return !!It(e5, "ErrorEvent") && (null != e5.error || this._hasUsableMessage(e5));
  }
  coerce(e5, t2) {
    var i2;
    if (null != e5.error) return t2.apply(e5.error);
    const s2 = t2.apply(e5.message);
    return ls(ls({}, s2), {}, { stack: null !== (i2 = this._buildLocationStack(e5)) && void 0 !== i2 ? i2 : s2.stack, synthetic: true });
  }
  _hasUsableMessage(e5) {
    return mt(e5.message) && e5.message.length > 0;
  }
  _buildLocationStack(e5) {
    var t2, i2;
    const s2 = e5, r2 = null !== (t2 = s2.lineno) && void 0 !== t2 ? t2 : 0, n2 = null !== (i2 = s2.colno) && void 0 !== i2 ? i2 : 0;
    if (mt(s2.filename) && 0 !== s2.filename.length && 0 !== r2) return `Error
    at ${s2.filename}:${r2}:${n2}`;
  }
};
var Bs = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
var Us = class {
  match(e5) {
    return "string" == typeof e5;
  }
  coerce(e5, t2) {
    var i2;
    const [s2, r2] = this.getInfos(e5);
    return { type: null != s2 ? s2 : "Error", value: null != r2 ? r2 : e5, stack: null === (i2 = t2.syntheticException) || void 0 === i2 ? void 0 : i2.stack, synthetic: true };
  }
  getInfos(e5) {
    let t2 = "Error", i2 = e5;
    const s2 = e5.match(Bs);
    return s2 && (t2 = s2[1], i2 = s2[2]), [t2, i2];
  }
};
var qs = ["fatal", "error", "warning", "log", "info", "debug"];
function Hs(e5, t2 = 40) {
  const i2 = Object.keys(e5);
  if (i2.sort(), !i2.length) return "[object has no keys]";
  for (let e6 = i2.length; e6 > 0; e6--) {
    const s2 = i2.slice(0, e6).join(", ");
    if (t2 >= s2.length) return e6 === i2.length ? s2 : s2.length > t2 ? `${s2.slice(0, t2)}...` : s2;
  }
  return "";
}
var zs = class {
  match(e5) {
    return "object" == typeof e5 && null !== e5;
  }
  coerce(e5, t2) {
    var i2, s2;
    const r2 = this.getErrorPropertyFromObject(e5);
    return r2 ? t2.apply(r2) : { type: this.getType(e5), value: this.getValue(e5), stack: null !== (i2 = this.getStack(e5)) && void 0 !== i2 ? i2 : null === (s2 = t2.syntheticException) || void 0 === s2 ? void 0 : s2.stack, level: this.isSeverityLevel(e5.level) ? e5.level : "error", synthetic: true };
  }
  getType(e5) {
    if (Tt(e5)) return e5.constructor.name;
    const t2 = "name" in e5 ? e5.name : void 0;
    return mt(t2) && !yt(t2) ? t2 : "Error";
  }
  getValue(e5) {
    if ("name" in e5 && "string" == typeof e5.name) {
      let t3 = `'${e5.name}' captured as exception`;
      return "message" in e5 && "string" == typeof e5.message && (t3 += ` with message: '${e5.message}'`), t3;
    }
    if ("message" in e5 && "string" == typeof e5.message) return e5.message;
    const t2 = this.getObjectClassName(e5);
    return `${t2 && "Object" !== t2 ? `'${t2}'` : "Object"} captured as exception with keys: ${Hs(e5)}`;
  }
  isSeverityLevel(e5) {
    return mt(e5) && !yt(e5) && qs.indexOf(e5) >= 0;
  }
  getStack(e5) {
    try {
      return mt(e5.stacktrace) && e5.stacktrace.length > 0 ? e5.stacktrace : mt(e5.stack) && e5.stack.length > 0 ? e5.stack : void 0;
    } catch (e6) {
      return;
    }
  }
  getErrorPropertyFromObject(e5) {
    for (const t2 in e5) if ({}.hasOwnProperty.call(e5, t2)) {
      const i2 = e5[t2];
      if (Ft(i2)) return i2;
    }
  }
  getObjectClassName(e5) {
    try {
      const t2 = Object.getPrototypeOf(e5);
      return t2 ? t2.constructor.name : void 0;
    } catch (e6) {
      return;
    }
  }
};
var js = class {
  match(e5) {
    return Tt(e5);
  }
  coerce(e5, t2) {
    var i2;
    const s2 = e5.constructor.name;
    return { type: s2, value: `${s2} captured as exception with keys: ${Hs(e5)}`, stack: null === (i2 = t2.syntheticException) || void 0 === i2 ? void 0 : i2.stack, synthetic: true };
  }
};
var Ws = class {
  match(e5) {
    return Pt(e5);
  }
  coerce(e5, t2) {
    var i2;
    return { type: "Error", value: `Primitive value captured as exception: ${String(e5)}`, stack: null === (i2 = t2.syntheticException) || void 0 === i2 ? void 0 : i2.stack, synthetic: true };
  }
};
var Vs = class {
  match(e5) {
    return It(e5, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(e5);
  }
  isCustomEventWrappingRejection(e5) {
    if (!Tt(e5)) return false;
    try {
      const t2 = e5.detail;
      return null != t2 && "object" == typeof t2 && "reason" in t2;
    } catch (e6) {
      return false;
    }
  }
  coerce(e5, t2) {
    var i2;
    const s2 = this.getUnhandledRejectionReason(e5);
    return Pt(s2) ? { type: "UnhandledRejection", value: `Non-Error promise rejection captured with value: ${String(s2)}`, stack: null === (i2 = t2.syntheticException) || void 0 === i2 ? void 0 : i2.stack, synthetic: true } : t2.apply(s2);
  }
  getUnhandledRejectionReason(e5) {
    try {
      if ("reason" in e5) return e5.reason;
      if ("detail" in e5 && null != e5.detail && "object" == typeof e5.detail && "reason" in e5.detail) return e5.detail.reason;
    } catch (e6) {
    }
    return e5;
  }
};
var Gs = "$message";
var Ks = "$timestamp";
var Qs = /* @__PURE__ */ new Set([Gs, Ks]);
var Js = { enabled: true, max_bytes: 32768 };
function Ys(e5) {
  var t2;
  return e5 ? { enabled: null !== (t2 = e5.enabled) && void 0 !== t2 ? t2 : Js.enabled, max_bytes: Xs(e5.max_bytes, Js.max_bytes) } : ls({}, Js);
}
var Zs = class {
  constructor(e5) {
    this._entries = [], this._totalBytes = 0, this._config = Ys(e5);
  }
  setConfig(e5) {
    this._config = Ys(e5), this._trimToMaxBytes();
  }
  add(e5) {
    const t2 = (function(e6) {
      let t3;
      try {
        t3 = ct(e6);
      } catch (e7) {
        return;
      }
      try {
        const e7 = JSON.parse(t3);
        if (!gt(e7)) return;
        const i3 = e7, s2 = i3[Gs], r2 = i3[Ks];
        if (!mt(s2) || 0 === s2.trim().length) return;
        if (!mt(r2) && !wt(r2)) return;
        return { step: i3, json: t3 };
      } catch (e7) {
        return;
      }
    })(e5);
    if (!t2) return;
    const i2 = (function(e6) {
      if ("u" > typeof TextEncoder) return new TextEncoder().encode(e6).length;
      const t3 = encodeURIComponent(e6);
      let i3 = 0;
      for (let e7 = 0; t3.length > e7; e7++) "%" === t3[e7] ? (i3 += 1, e7 += 2) : i3 += 1;
      return i3;
    })(t2.json);
    i2 > this._config.max_bytes || (this._entries.push({ step: t2.step, bytes: i2 }), this._totalBytes += i2, this._trimToMaxBytes());
  }
  getAttachable() {
    return this._entries.map((e5) => e5.step);
  }
  clear() {
    this._entries = [], this._totalBytes = 0;
  }
  size() {
    return this._entries.length;
  }
  _trimToMaxBytes() {
    for (; this._totalBytes > this._config.max_bytes && this._entries.length > 0; ) {
      const e5 = this._entries.shift();
      e5 && (this._totalBytes -= e5.bytes);
    }
  }
};
function Xs(e5, t2) {
  if (!wt(e5) || 1 / 0 === e5 || -1 / 0 === e5) return t2;
  const i2 = Math.floor(e5);
  return 0 > i2 ? t2 : i2;
}
var er = (e5) => {
  if ("string" != typeof e5) return e5;
  try {
    return JSON.parse(e5);
  } catch (t2) {
    return e5;
  }
};
function tr(e5) {
  return "string" == typeof e5 || e5;
}
function ir(e5) {
  return "string" == typeof e5 ? e5 : void 0;
}
var sr = ["$feature_flag", "$feature_flag_response", "$feature_flag_has_experiment", "$feature_flag_id", "$feature_flag_version", "$feature_flag_reason", "$feature_flag_request_id", "$feature_flag_evaluated_at", "$feature_flag_error", "locally_evaluated", "$groups", "$process_person_profile", "$geoip_disable", "$current_url", "$pathname", "$referring_domain", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid", "gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "oppref", "bfcid", "irclid", "_kx", "$session_id", "$window_id", "$lib", "$lib_version", "$device_id", "$is_server"];
var rr = "NativeGzipValidationError";
var nr = (e5) => e5.length >= 2 && 31 === e5[0] && 139 === e5[1];
var or = (e5, t2) => e5 === st.GZipJS || t2 === st.GZipJS || "gzip" === t2;
var ar = (e5) => !(!e5 || "object" != typeof e5) && "NotReadableError" === ("name" in e5 ? String(e5.name) : "");
var lr;
var cr = (e5) => {
  throw Xi(rr, `Native gzip produced invalid output: ${e5}`);
};
var ur = (dr = Lt(function* (e5, t2) {
  18 > e5.size && cr("too-short");
  const i2 = new Uint8Array(yield e5.slice(0, 10).arrayBuffer());
  nr(i2) && 8 === i2[2] || cr("invalid-header");
  const s2 = new DataView(yield e5.slice(e5.size - 8).arrayBuffer());
  s2.getUint32(0, true) !== ((e6) => {
    const t3 = (() => {
      if (lr) return lr;
      lr = [];
      for (let e7 = 0; 256 > e7; e7++) {
        let t4 = e7;
        for (let e8 = 0; 8 > e8; e8++) t4 = 1 & t4 ? 3988292384 ^ t4 >>> 1 : t4 >>> 1;
        lr[e7] = t4 >>> 0;
      }
      return lr;
    })();
    let i3 = 4294967295;
    for (let s3 = 0; e6.length > s3; s3++) i3 = t3[255 & (i3 ^ e6[s3])] ^ i3 >>> 8;
    return (4294967295 ^ i3) >>> 0;
  })(t2) && cr("invalid-crc");
  const r2 = t2.length >>> 0;
  s2.getUint32(4, true) !== r2 && cr("invalid-size");
}), function(e5, t2) {
  return dr.apply(this, arguments);
});
var dr;
function hr() {
  return hr = Lt(function* (e5, t2 = true, i2) {
    try {
      const t3 = new TextEncoder().encode(e5), i3 = new globalThis.CompressionStream("gzip"), r2 = i3.writable.getWriter(), n2 = r2.write(t3).then(() => r2.close()).catch((s2 = Lt(function* (e6) {
        try {
          yield r2.abort(e6);
        } catch (e7) {
        }
        throw e6;
      }), function(e6) {
        return s2.apply(this, arguments);
      })), o2 = new Response(i3.readable).blob(), [a2] = yield Promise.all([o2, n2]);
      return yield ur(a2, t3), a2;
    } catch (e6) {
      if (null == i2 ? void 0 : i2.rethrow) throw e6;
      return t2 && console.error("Failed to gzip compress data", e6), null;
    }
    var s2;
  }), hr.apply(this, arguments);
}
function _r(e5, t2) {
  if (null == e5) return {};
  var i2, s2, r2 = (function(e6, t3) {
    if (null == e6) return {};
    var i3 = {};
    for (var s3 in e6) if ({}.hasOwnProperty.call(e6, s3)) {
      if (t3.includes(s3)) continue;
      i3[s3] = e6[s3];
    }
    return i3;
  })(e5, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e5);
    for (s2 = 0; n2.length > s2; s2++) t2.includes(i2 = n2[s2]) || {}.propertyIsEnumerable.call(e5, i2) && (r2[i2] = e5[i2]);
  }
  return r2;
}
var pr = "[redacted]";
var gr = /^[A-Za-z0-9+/\n\r]+=*$/;
var vr = /^[A-Za-z0-9_-]+={0,2}$/;
var fr = /[-_]/;
var mr = /^data:[^,\s]*;base64,/i;
var yr = /^[A-Za-z0-9+/_-]+={0,2}$/;
var br = /\bph[a-z]_[A-Za-z0-9_-]{20,}\b/g;
var Sr = /^(authorization|cookie|set-cookie|x-api-key|api[-_]?key|api[-_]?token|access[-_]?token|refresh[-_]?token|token|password|secret|client[-_]?secret|private[-_]?key)$/i;
var wr = /[a-z][a-z0-9+.-]{0,63}:[^\s<>"]+/gi;
var Er = /[\s<>"]/;
var Cr = new RegExp(wr.source, "i");
var kr = /[a-z][a-z0-9+.-]{0,63}:\/\//i;
var xr = new RegExp(`^${kr.source}`, "i");
var Pr = new RegExp(kr.source, "gi");
var Ir = /(^|[-_./;])(auth|token|secret|password|passwd|pwd|credential|signature|sig|key|hmac|sas|bearer|jwt|session|sessionid)([-_./;]|$)/i;
var Fr = /^(code|AWSAccessKeyId|GoogleAccessId|Policy)$/i;
var Tr = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;
var Rr = /[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,255}\.[A-Za-z]{2,24}/g;
var $r = /\b(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g;
var Ar = /(^|[^\w:])((?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(?:[0-9A-Fa-f]{1,4}:){1,7}:|(?:[0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4}){0,5}|::(?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4}){0,6})))(?=$|[^\w:])/g;
var Mr = /\b\d{3}[ .-]\d{2}[ .-]\d{4}\b/g;
var Or = /\b\d(?:[ ./-]?\d){12,}\b/g;
var Lr = /\d+/g;
var Dr = /(^|[^\w+])((?:\+?1[ ./-]?)?(?:\(\d{3}\)[ ./-]?|\d{3}[ ./-])\d{3}[ ./-]\d{4})(?![\w])/g;
var Nr = /(^|[^\w])(\+\d{1,3}(?:[ ./()-]{0,2}\d){7,13})(?![\w])/g;
function Br(e5) {
  return (function(e6) {
    return Sr.test(e6);
  })(e5) || Ir.test(e5) || Fr.test(e5);
}
function Ur(e5) {
  return e5.split("&", 129).length > 128;
}
function qr(e5, t2, i2) {
  return Br(e5) || t2.includes(";") && (function(e6) {
    return e6.split(";").some((e7) => Br(e7.split("=", 1)[0]));
  })(t2) ? pr : Cr.test(t2) ? i2 ? Gr(t2, { allowNestedUrls: false, stripPunctuation: true }) : pr : t2;
}
function Hr(e5, t2) {
  const i2 = new URLSearchParams();
  let s2 = false, r2 = false;
  for (const [n2, o2] of new URLSearchParams(e5)) {
    const e6 = Kr(n2), a2 = Kr(o2);
    s2 || (s2 = e6 !== n2 || a2 !== o2);
    const l2 = qr(e6, a2, t2);
    s2 || (s2 = l2 !== a2), r2 = Br(e6) || l2 !== a2, i2.append(e6, l2);
  }
  return { changed: s2, lastFieldSensitive: r2, serialized: i2.toString() };
}
function zr(e5, t2) {
  if (!e5.includes("=")) return { value: jr(e5, t2), lastFieldSensitive: false };
  const i2 = Hr(e5, t2);
  return { value: i2.changed ? i2.serialized : e5, lastFieldSensitive: i2.lastFieldSensitive };
}
function jr(e5, t2) {
  return t2 ? Gr(e5, { allowNestedUrls: false, stripPunctuation: true }) : Cr.test(e5) ? pr : e5;
}
function Wr(e5, t2, i2) {
  return "#" === e5 ? !t2.fragment && (t2.fragment = true) : "?" === e5 && (t2.fragment ? "=" !== i2 && !t2.fragmentQuery && (t2.fragmentQuery = true) : !t2.query && (t2.query = true));
}
function Vr(e5, t2) {
  var i2;
  if (e5.length > 8192 && xr.test(e5)) return pr;
  const { address: s2, suffix: r2 } = t2.stripPunctuation ? (function(e6) {
    let t3 = e6.length;
    for (; t3 > 0 && ".,;:!?)]}'".includes(e6[t3 - 1]); ) t3--;
    return { address: e6.slice(0, t3), suffix: e6.slice(t3) };
  })(e5) : { address: e5, suffix: "" };
  let n2;
  try {
    n2 = new URL(s2);
  } catch (e6) {
    return pr + r2;
  }
  const o2 = n2.search.slice(1), a2 = "" !== n2.hash, l2 = (function(e6) {
    const t3 = e6.slice(1), i3 = t3.indexOf("?");
    return 0 > i3 ? { head: t3, tail: null } : { head: t3.slice(0, i3), tail: t3.slice(i3 + 1) };
  })(n2.hash);
  if (Ur(o2) || Ur(l2.head) || Ur(null !== (i2 = l2.tail) && void 0 !== i2 ? i2 : "")) return pr + r2;
  let c2 = false;
  (n2.username || n2.password) && (n2.username = pr, n2.password = "", c2 = true);
  const u2 = Hr(o2, t2.allowNestedUrls);
  u2.changed && (n2.search = u2.serialized, c2 = true);
  const d2 = zr(l2.head, t2.allowNestedUrls), h2 = null === l2.tail ? null : (_2 = l2.tail, d2.lastFieldSensitive ? { value: "" === _2 ? "" : pr, lastFieldSensitive: true } : zr(_2, t2.allowNestedUrls));
  var _2;
  const p2 = null === h2 ? d2.value : `${d2.value}?${h2.value}`;
  p2 !== n2.hash.slice(1) && (n2.hash = p2, c2 = true);
  const g2 = a2 ? null != h2 ? h2 : d2 : u2;
  return (c2 ? Kr(n2.toString()) : s2) + (g2.lastFieldSensitive ? "" : r2);
}
function Gr(e5, t2) {
  return e5.replace(wr, (i2) => (function(e6, t3) {
    const i3 = (function(e7) {
      if (!e7.includes("://")) return [];
      const t4 = [...e7.matchAll(Pr)].map((e8) => e8.index), i4 = [], s3 = { query: false, fragment: false, fragmentQuery: false };
      let r3 = 0, n2 = false, o2 = "";
      for (let a2 = 0; e7.length > a2 && t4.length > r3; a2++) {
        t4[r3] === a2 && (a2 > 0 && "=" !== o2 && i4.push(a2), r3++);
        const l2 = e7[a2];
        Wr(l2, s3, o2) ? (o2 = l2, n2 = true) : n2 && "=&".includes(l2) && (o2 = l2);
      }
      return i4;
    })(e6);
    if (0 === i3.length) return Vr(e6, t3);
    let s2 = "", r2 = 0;
    for (const n2 of i3) s2 += Vr(e6.slice(r2, n2), ls(ls({}, t3), {}, { stripPunctuation: false })), r2 = n2;
    return s2 + Vr(e6.slice(r2), t3);
  })(i2, ls(ls({}, t2), {}, { stripPunctuation: t2.stripPunctuation && i2.length !== e5.length })));
}
function Kr(e5) {
  return e5.replace(br, pr);
}
function Qr(e5, t2) {
  return (function(e6) {
    return e6.length >= 10240 && (gr.test(e6) || (function(e7) {
      const t3 = mr.exec(e7);
      if (!t3) return false;
      let i2;
      try {
        i2 = decodeURIComponent(e7.slice(t3[0].length));
      } catch (e8) {
        return false;
      }
      return yr.test(i2.replace(/[\r\n]/g, ""));
    })(e6) || fr.test(e6) && vr.test(e6));
  })(e5) ? "[binary data redacted - not supported by PostHog MCP analytics]" : (function(e6, t3, i2) {
    const s2 = 4 * i2.maxStringLength;
    if (e6.length > s2) {
      const r2 = t3(e6.slice(0, (function(e7, t4) {
        let i3 = t4;
        for (; i3 > 0 && !Er.test(e7[i3 - 1]); ) i3--;
        return i3;
      })(e6, s2)));
      if (r2.length >= 2 * i2.maxStringLength) return r2 + i2.truncationSuffix;
    }
    return t3(e6);
  })(e5, (e6) => (function(e7) {
    return Gr(e7, { allowNestedUrls: true, stripPunctuation: true });
  })((function(e7) {
    let t3 = e7.replace(Tr, " ");
    return t3 = t3.replace(Rr, pr), t3 = t3.replace($r, pr), t3 = t3.replace(Ar, `$1${pr}`), t3 = t3.replace(Or, Yr), t3 = t3.replace(Mr, pr), t3 = t3.replace(Dr, `$1${pr}`), t3 = t3.replace(Nr, `$1${pr}`), t3;
  })(Kr(e6))), t2);
}
function Jr(e5) {
  let t2 = 0, i2 = false;
  for (let s2 = e5.length - 1; s2 >= 0; s2--) {
    let r2 = e5.charCodeAt(s2) - 48;
    if (0 > r2 || r2 > 9) return false;
    i2 && (r2 *= 2, r2 > 9 && (r2 -= 9)), t2 += r2, i2 = !i2;
  }
  return t2 % 10 == 0;
}
function Yr(e5) {
  const t2 = [];
  for (let i3 = Lr.exec(e5); null !== i3; i3 = Lr.exec(e5)) t2.push({ digits: i3[0], start: i3.index, end: i3.index + i3[0].length });
  let i2 = "", s2 = 0, r2 = 0;
  for (; t2.length > r2; ) {
    let n2 = "", o2 = -1;
    for (let e6 = r2; t2.length > e6 && (n2 += t2[e6].digits, 19 >= n2.length); e6++) n2.length >= 13 && Jr(n2) && (o2 = e6);
    0 > o2 ? r2++ : (i2 += e5.slice(s2, t2[r2].start) + pr, s2 = t2[o2].end, r2 = o2 + 1);
  }
  return i2 + e5.slice(s2);
}
var Zr = {}.propertyIsEnumerable;
function Xr(e5, t2) {
  try {
    return sn(e5, t2, { ancestors: /* @__PURE__ */ new WeakSet(), remainingNodes: 1e4 }, 0);
  } catch (e6) {
    return [];
  }
}
function en(e5, t2, i2, s2) {
  if (0 >= i2.remainingNodes) return { stringValue: Wi };
  if (i2.remainingNodes--, Ct(e5)) return { boolValue: e5 };
  if ("bigint" == typeof e5) return (function(e6, t3) {
    const i3 = e6.toString(), s3 = BigInt("9223372036854775808");
    return e6 >= s3 || -s3 > e6 ? (null == t3 || t3.debug(`Attribute ${i3} is outside the int64 range; encoding it as a string`), { stringValue: i3 }) : { intValue: i3 };
  })(e5, t2);
  if ("number" == typeof e5) {
    if (!Number.isFinite(e5)) return { stringValue: String(e5) };
    if (Number.isInteger(e5)) {
      if (Number.isSafeInteger(e5)) return { intValue: String(e5) };
      if (typeof BigInt > "u") return { stringValue: String(e5) };
      const i3 = BigInt(e5).toString();
      return e5 >= 9223372036854776e3 || -9223372036854776e3 > e5 ? (null == t2 || t2.debug(`Attribute ${i3} is outside the int64 range; encoding it as a string`), { stringValue: i3 }) : { intValue: i3 };
    }
    return { doubleValue: e5 };
  }
  if ("string" == typeof e5) return { stringValue: Gi(e5) };
  if ("function" == typeof e5) return { stringValue: "[Function]" };
  if ("symbol" == typeof e5) return { stringValue: String(e5) };
  if ("object" == typeof e5 && null !== e5) {
    if (i2.ancestors.has(e5)) return { stringValue: "[Circular]" };
    if (s2 >= 20) return { stringValue: Wi };
    if (e5 instanceof Date) {
      const t3 = e5.getTime(), i3 = Number.isFinite(t3) ? e5.toISOString() : String(e5);
      return { stringValue: "string" == typeof i3 ? Gi(i3) : String(i3) };
    }
    i2.ancestors.add(e5);
    try {
      try {
        const r2 = e5.toJSON;
        if ("function" == typeof r2) return en(r2.call(e5), t2, i2, s2 + 1);
      } catch (e6) {
      }
      return _t(e5) ? { arrayValue: { values: tn(e5, t2, i2, s2 + 1) } } : { kvlistValue: { values: sn(e5, t2, i2, s2 + 1) } };
    } finally {
      i2.ancestors.delete(e5);
    }
  }
  return { stringValue: Gi(String(e5)) };
}
function tn(e5, t2, i2, s2) {
  const r2 = [], n2 = Math.min(e5.length, 1e3);
  let o2 = 0;
  for (; n2 > o2 && i2.remainingNodes > 0; o2++) try {
    const n3 = o2 in e5 ? e5[o2] : void 0;
    if (St(n3)) continue;
    r2.push(en(n3, t2, i2, s2));
  } catch (e6) {
    r2.push({ stringValue: Vi });
  }
  return e5.length > o2 && r2.push({ stringValue: Wi }), r2;
}
function sn(e5, t2, i2, s2) {
  const r2 = [];
  for (const n2 in e5) if (Zr.call(e5, n2)) {
    if (!n2) {
      null == t2 || t2.debug("Dropping an attribute with an empty key");
      continue;
    }
    if (r2.length >= 1e3 || 0 >= i2.remainingNodes) {
      null == t2 || t2.debug("Attributes truncated: the value exceeds the OTLP encoder budget");
      break;
    }
    try {
      const o2 = e5[n2];
      if (bt(o2) || ft(o2)) continue;
      r2.push({ key: Gi(n2), value: en(o2, t2, i2, s2) });
    } catch (e6) {
      r2.push({ key: Gi(n2), value: { stringValue: Vi } });
    }
  }
  return r2;
}
function rn(e5, t2, i2) {
  return ls(ls(ls(ls({}, Ki({}, e5.resourceAttributes)), {}, { "service.name": e5.serviceName || "unknown_service" }, e5.environment && { "deployment.environment": e5.environment }), e5.serviceVersion && { "service.version": e5.serviceVersion }), {}, { "telemetry.sdk.name": t2, "telemetry.sdk.version": i2 });
}
var nn = ["service.name", "deployment.environment", "service.version", "telemetry.sdk.name", "telemetry.sdk.version"];
function on(e5, t2) {
  const i2 = Ki({}, e5), s2 = {};
  for (const e6 of nn) ({}).hasOwnProperty.call(i2, e6) && (s2[e6] = i2[e6], delete i2[e6]);
  return [...Xr(i2, t2), ...Xr(s2, t2)];
}
var an = { darwin: "macOS", win32: "Windows", cygwin: "Windows", linux: "Linux", android: "Android", freebsd: "FreeBSD", openbsd: "OpenBSD", netbsd: "NetBSD", sunos: "SunOS", aix: "AIX", haiku: "Haiku", "Mac OS X": "macOS" };
var ln = { trace: { text: "TRACE", number: 1 }, debug: { text: "DEBUG", number: 5 }, info: { text: "INFO", number: 9 }, warn: { text: "WARN", number: 13 }, error: { text: "ERROR", number: 17 }, fatal: { text: "FATAL", number: 21 } };
var cn = ln.info;
function un(e5) {
  try {
    return Gi(String(e5));
  } catch (e6) {
    return Vi;
  }
}
function dn(e5, t2, i2, s2) {
  const r2 = e5.level || "info", { text: n2, number: o2 } = ln[r2] || cn, a2 = (function(e6 = Date.now()) {
    return String(e6) + "000000";
  })(wt(s2) ? s2 : void 0), l2 = {};
  t2.distinctId && (l2.posthogDistinctId = t2.distinctId), t2.sessionId && (l2.sessionId = t2.sessionId), t2.windowId && (l2["window.id"] = t2.windowId), St(t2.sessionStartTimestamp) || (l2.sessionStartTimestamp = String(t2.sessionStartTimestamp)), St(t2.lastActivityTimestamp) || (l2.lastActivityTimestamp = String(t2.lastActivityTimestamp)), t2.currentUrl && (l2["url.full"] = t2.currentUrl), t2.screenName && (l2["screen.name"] = t2.screenName), t2.appState && (l2["app.state"] = t2.appState), t2.activeFeatureFlags && t2.activeFeatureFlags.length > 0 && (l2.feature_flags = t2.activeFeatureFlags);
  const c2 = ls({}, l2), u2 = e5.attributes;
  if (u2) {
    let e6 = [];
    try {
      e6 = Object.keys(u2);
    } catch (t3) {
      e6 = [];
    }
    for (const t3 of e6) {
      let e7;
      try {
        e7 = u2[t3];
      } catch (t4) {
        e7 = Vi;
      }
      Object.defineProperty(c2, t3, { value: e7, enumerable: true, writable: true, configurable: true });
    }
  }
  const d2 = { timeUnixNano: a2, observedTimeUnixNano: a2, severityNumber: o2, severityText: n2, body: { stringValue: un(e5.body) }, attributes: Xr(c2, i2) };
  return e5.trace_id && (d2.traceId = e5.trace_id), e5.span_id && (d2.spanId = e5.span_id), ft(e5.trace_flags) || (d2.flags = e5.trace_flags), d2;
}
function hn(e5, t2, i2) {
  return rn(e5, t2, i2);
}
function _n(e5, t2, i2, s2) {
  return { resourceLogs: [{ resource: { attributes: on(t2) }, scopeLogs: [{ scope: { name: i2, version: s2 }, logRecords: e5 }] }] };
}
var pn = class {
  constructor(e5) {
    this._onFire = e5, this._firesAt = 0;
  }
  get pending() {
    return !!this._timer;
  }
  arm(e5) {
    this.clear(), this._firesAt = Date.now() + e5, this._timer = is(() => {
      this._timer = void 0, this._onFire();
    }, e5);
  }
  armNoEarlierThan(e5) {
    this._timer && Date.now() + e5 <= this._firesAt || this.arm(e5);
  }
  clear() {
    this._timer && (clearTimeout(this._timer), this._timer = void 0);
  }
};
function gn() {
  return 0.75 + 0.5 * Math.random();
}
function vn(e5, t2, i2, s2) {
  const r2 = Math.min(Math.max(0, t2 - 1), 6), n2 = e5 * Math.pow(2, r2);
  return Math.round((void 0 === s2 ? n2 : Math.min(n2, Math.max(s2, e5))) * i2);
}
var fn = class {
  constructor(e5, t2, i2, s2, r2, n2 = () => Promise.resolve(), o2) {
    var a2;
    this._instance = e5, this._config = t2, this._logger = i2, this._getContext = s2, this._onReady = r2, this._waitForStoragePersist = n2, this._scopeName = o2, this._flushTimer = new pn(() => this._flushInBackground()), this._flushPromise = null, this._evictedSinceAdvance = 0, this._queueGeneration = 0, this._retryAfter = new Ji(), this._consecutiveFlushFailures = 0, this._flushJitter = 1, this._intervalWindowStart = 0, this._intervalLogCount = 0, this._droppedWarned = false, this._maxBufferSize = t2.maxBufferSize, this._maxQueueSize = Math.max(null !== (a2 = t2.maxQueueSize) && void 0 !== a2 ? a2 : t2.maxBufferSize, t2.maxBufferSize), this._flushIntervalMs = t2.flushIntervalMs, this._maxBatchRecordsPerPost = t2.maxBatchRecordsPerPost, this._rateCapWindowMs = t2.rateCapWindowMs, this._maxLogsPerInterval = t2.maxLogsPerInterval;
  }
  clearQueue() {
    this._queueGeneration++, this._instance.setPersistedProperty(it.LogsQueue, []);
  }
  reset() {
    this._flushTimer.clear(), this._intervalWindowStart = 0, this._intervalLogCount = 0, this._droppedWarned = false, this._consecutiveFlushFailures = 0, this._flushJitter = 1, this._retryAfter.reset(), this._maxBatchRecordsPerPost = this._config.maxBatchRecordsPerPost;
  }
  onReconnect() {
    this._consecutiveFlushFailures = 0, this._flushJitter = 1, this._retryAfter.isOpen() ? this._hasQueuedRecords() && this._armFlushTimer() : this._flushInBackground();
  }
  captureLog(e5, t2) {
    var i2;
    if (this._instance.isDisabled) return;
    if (this._instance.optedOut) return;
    if (!(null == e5 ? void 0 : e5.body)) return;
    const s2 = this._runBeforeSend(e5);
    if (null === s2) return;
    if (!s2.body) return void this._logger.info("Log was rejected in beforeSend function");
    if (!this._checkRateLimit()) return;
    const r2 = { record: dn(s2, null !== (i2 = null == t2 ? void 0 : t2.context) && void 0 !== i2 ? i2 : this._getContext(), this._logger, null == t2 ? void 0 : t2.occurredAtMs) };
    this._onReady(() => this._enqueue(r2));
  }
  _runBeforeSend(e5) {
    const t2 = this._config.beforeSend;
    if (!t2) return e5;
    const i2 = _t(t2) ? t2 : [t2];
    let s2 = e5;
    for (const e6 of i2) try {
      const t3 = e6(s2);
      if (!t3) return this._logger.info("Log was rejected in beforeSend function"), null;
      s2 = t3;
    } catch (e7) {
      return this._logger.error("Error in beforeSend function for log:", e7), null;
    }
    return s2;
  }
  _checkRateLimit() {
    if (void 0 === this._maxLogsPerInterval) return true;
    const e5 = Date.now(), t2 = e5 - this._intervalWindowStart;
    return this._rateCapWindowMs > t2 && t2 >= 0 || (this._intervalWindowStart = e5, this._intervalLogCount = 0, this._droppedWarned = false), this._maxLogsPerInterval > this._intervalLogCount ? (this._intervalLogCount++, true) : (this._droppedWarned || (this._logger.warn(`captureLog dropping logs: exceeded ${this._maxLogsPerInterval} logs per ${this._rateCapWindowMs}ms`), this._droppedWarned = true), false);
  }
  flush() {
    var e5 = this;
    return Lt(function* () {
      if (!e5._instance.isDisabled) return e5._flushPromise || (e5._flushPromise = e5._flushInner().finally(() => {
        e5._flushPromise = null;
      })), e5._flushPromise;
    })();
  }
  _flushInner() {
    var e5 = this;
    return Lt(function* () {
      var t2;
      e5._flushTimer.clear();
      let i2 = null !== (t2 = e5._instance.getPersistedProperty(it.LogsQueue)) && void 0 !== t2 ? t2 : [];
      if (0 === i2.length) return;
      const s2 = i2.length;
      let r2 = 0;
      for (; i2.length > 0 && s2 > r2; ) {
        var n2, o2;
        const t3 = e5._queueGeneration;
        e5._evictedSinceAdvance = 0;
        const s3 = Math.min(i2.length, e5._maxBatchRecordsPerPost), a2 = i2.slice(0, s3), l2 = _n(a2.map((e6) => e6.record), e5._buildResourceAttributes(), null !== (n2 = e5._scopeName) && void 0 !== n2 ? n2 : e5._instance.getLibraryId(), e5._instance.getLibraryVersion()), c2 = yield e5._instance._sendLogsBatch(l2);
        if (e5._queueGeneration !== t3) return;
        if ("too-large" === c2.kind && a2.length > 1) e5._maxBatchRecordsPerPost = Math.max(1, Math.floor(a2.length / 2)), e5._logger.warn(`Logs batch of size ${a2.length} was too large for the ingestion endpoint, reducing batch size to ${e5._maxBatchRecordsPerPost}`);
        else {
          if (e5._retryAfter.record(c2), e5._flushTimer.pending && e5._flushTimer.arm(Math.max(e5._flushIntervalMs, e5._retryAfter.remainingMs())), "retry-later" === c2.kind) throw c2.error;
          if ("too-large" === c2.kind ? e5._logger.warn("Dropping a single log record with batch size 1 \u2014 the record is larger than the server cap and cannot be split further.") : "ok" === c2.kind && e5._config.maxBatchRecordsPerPost > e5._maxBatchRecordsPerPost && (e5._maxBatchRecordsPerPost = Math.min(e5._config.maxBatchRecordsPerPost, e5._maxBatchRecordsPerPost + 1)), yield e5._persistQueueAdvance(a2.length), i2 = null !== (o2 = e5._instance.getPersistedProperty(it.LogsQueue)) && void 0 !== o2 ? o2 : [], r2 += a2.length, "fatal" === c2.kind) throw c2.error;
        }
      }
    })();
  }
  _persistQueueAdvance(e5) {
    var t2 = this;
    return Lt(function* () {
      var i2;
      const s2 = Math.max(0, e5 - t2._evictedSinceAdvance), r2 = null !== (i2 = t2._instance.getPersistedProperty(it.LogsQueue)) && void 0 !== i2 ? i2 : [];
      t2._instance.setPersistedProperty(it.LogsQueue, r2.slice(s2)), yield t2._waitForStoragePersist();
    })();
  }
  _buildResourceAttributes() {
    return hn(this._config, this._instance.getLibraryId(), this._instance.getLibraryVersion());
  }
  _enqueue(e5) {
    var t2;
    if (this._instance.optedOut) return;
    const i2 = null !== (t2 = this._instance.getPersistedProperty(it.LogsQueue)) && void 0 !== t2 ? t2 : [];
    this._maxQueueSize > i2.length || (i2.shift(), this._evictedSinceAdvance++, this._logger.info("Logs queue is full, dropping oldest record.")), i2.push(e5), this._instance.setPersistedProperty(it.LogsQueue, i2), this._maxBufferSize > i2.length || this._retryAfter.isOpen() ? this._armFlushTimer() : this._flushInBackground();
  }
  _armFlushTimer() {
    this._flushTimer.pending || this._flushTimer.arm(Math.max(this._flushIntervalMs, this._retryAfter.remainingMs()));
  }
  _nextFlushDelay() {
    return Math.max(vn(this._flushIntervalMs, this._consecutiveFlushFailures, this._flushJitter, 3e4), this._retryAfter.remainingMs());
  }
  _hasQueuedRecords() {
    const e5 = this._instance.getPersistedProperty(it.LogsQueue);
    return !!e5 && e5.length > 0;
  }
  shutdown(e5) {
    var t2 = this;
    return Lt(function* () {
      t2._flushTimer.clear();
      const i2 = t2.flush().catch(() => {
      });
      void 0 !== e5 ? yield ss(i2, e5) : yield i2;
    })();
  }
  flushWithTimeout(e5) {
    var t2 = this;
    return Lt(function* () {
      const i2 = t2.flush();
      yield ss(i2, e5, () => {
        i2.catch(() => {
        });
      });
    })();
  }
  _flushInBackground() {
    this.flush().then(() => {
      this._consecutiveFlushFailures = 0, this._flushJitter = 1;
    }, (e5) => {
      this._consecutiveFlushFailures++, this._flushJitter = gn(), this._logger.error("PostHog logs flush failed:", e5);
    }).finally(() => {
      !this._instance.isDisabled && this._hasQueuedRecords() && this._flushTimer.armNoEarlierThan(this._nextFlushDelay());
    });
  }
};
var mn = /^[0-9a-f]+$/;
function yn(e5, t2, i2) {
  return "string" == typeof e5 && e5.length === t2 && e5 !== i2 && mn.test(e5);
}
var bn = /^([0-9a-f]{2})-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})(-.*)?$/;
var Sn = "00";
var wn = [0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1e3, 2500, 5e3, 7500, 1e4];
function En(e5) {
  return String(e5) + "000000";
}
function Cn(e5, t2, i2, s2) {
  let r2 = "";
  return s2 && (r2 = Object.keys(s2).sort().map((e6) => `${JSON.stringify(e6)}:${JSON.stringify(s2[e6])}`).join(",")), `${e5}\0${t2}\0${null != i2 ? i2 : ""}\0${r2}`;
}
var kn = class {
  constructor(e5, t2, i2) {
    this._instance = e5, this._config = t2, this._logger = i2, this._series = /* @__PURE__ */ new Map(), this._flushTimer = new pn(() => this.flush().catch((e6) => {
      this._logger.error("Metrics flush failed:", e6);
    })), this._flushPromise = null, this._seriesCapWarned = false, this._typeByName = /* @__PURE__ */ new Map(), this._typeCollisionWarned = /* @__PURE__ */ new Set(), this._retryAfter = new Ji(), this._consecutiveFlushFailures = 0, this._flushJitter = 1, this._generation = 0;
  }
  count(e5, t2 = 1, i2) {
    this._capture({ name: e5, type: "count", value: t2, unit: null == i2 ? void 0 : i2.unit, attributes: null == i2 ? void 0 : i2.attributes });
  }
  gauge(e5, t2, i2) {
    this._capture({ name: e5, type: "gauge", value: t2, unit: null == i2 ? void 0 : i2.unit, attributes: null == i2 ? void 0 : i2.attributes });
  }
  histogram(e5, t2, i2) {
    this._capture({ name: e5, type: "histogram", value: t2, unit: null == i2 ? void 0 : i2.unit, attributes: null == i2 ? void 0 : i2.attributes });
  }
  flush() {
    var e5 = this;
    const t2 = this._flushPromise, i2 = (function() {
      var i3 = Lt(function* () {
        t2 && (yield t2.catch(() => {
        })), yield e5._doFlush();
      });
      return function() {
        return i3.apply(this, arguments);
      };
    })()().finally(() => {
      this._flushPromise === i2 && (this._flushPromise = null);
    });
    return this._flushPromise = i2, i2;
  }
  drainWindow() {
    if (0 === this._series.size) return null;
    const e5 = this._series;
    return this._series = /* @__PURE__ */ new Map(), this._seriesCapWarned = false, this._typeByName = /* @__PURE__ */ new Map(), this._typeCollisionWarned = /* @__PURE__ */ new Set(), this._buildPayload(e5);
  }
  reset() {
    this._generation++, this._retryAfter.reset(), this._consecutiveFlushFailures = 0, this._flushJitter = 1, this._flushTimer.clear(), this._series = /* @__PURE__ */ new Map(), this._flushPromise = null, this._seriesCapWarned = false, this._typeByName = /* @__PURE__ */ new Map(), this._typeCollisionWarned = /* @__PURE__ */ new Set();
  }
  _capture(e5) {
    if (this._instance.isDisabled || this._instance.optedOut) return;
    const t2 = this._runBeforeSend(e5);
    if (null === t2) return;
    if (!t2.name || "string" != typeof t2.name) return void this._logger.warn("Dropping metric with empty name");
    if ("number" != typeof t2.value || !Number.isFinite(t2.value)) return void this._logger.warn(`Dropping metric '${t2.name}': value must be a finite number`);
    if ("count" === t2.type && 0 > t2.value) return void this._logger.warn(`Dropping count '${t2.name}': counters are monotonic, value must be >= 0`);
    let i2, s2;
    try {
      i2 = t2.attributes ? ls({}, t2.attributes) : void 0, s2 = Cn(t2.type, t2.name, t2.unit, i2);
    } catch (e6) {
      return void this._logger.warn(`Dropping metric '${t2.name}': attributes could not be serialized`, e6);
    }
    let r2 = this._series.get(s2);
    if (!r2) {
      if (!this._admitNewSeries()) return;
      r2 = { name: t2.name, type: t2.type, unit: t2.unit, attributes: i2, windowStartMs: Date.now() }, this._series.set(s2, r2);
    }
    const n2 = this._typeByName.get(t2.name);
    void 0 === n2 ? this._typeByName.set(t2.name, t2.type) : n2 === t2.type || this._typeCollisionWarned.has(t2.name) || (this._typeCollisionWarned.add(t2.name), this._logger.warn(`Metric name '${t2.name}' is already used as a ${n2}; recording it as a ${t2.type} too will blend both series in charts. Use a distinct name.`)), this._fold(r2, t2.value);
    const o2 = this._activeTraceContext();
    o2 && (r2.exemplar = ls(ls({}, o2), {}, { value: t2.value, timeMs: Date.now() })), this._armFlushTimer();
  }
  _activeTraceContext() {
    try {
      var e5, t2;
      const i2 = (function(e6) {
        const t3 = (function(e7) {
          if ("string" != typeof e7) return;
          const t4 = bn.exec(e7.trim());
          if (!t4) return;
          const [, i4, s2, r2, n2, o2] = t4;
          return "ff" === i4 || "00" === i4 && o2 || !(function(e8) {
            return yn(e8, 32, "00000000000000000000000000000000");
          })(s2) || !(function(e8) {
            return yn(e8, 16, "0000000000000000");
          })(r2) ? void 0 : { version: i4, traceId: s2, spanId: r2, flags: n2 };
        })(e6);
        return t3 && { traceId: t3.traceId, spanId: t3.spanId, flags: (i3 = t3.flags, 1 & parseInt(i3, 16) ? "01" : Sn) };
        var i3;
      })(null === (e5 = (t2 = this._instance).getActiveSpan) || void 0 === e5 || null === (e5 = e5.call(t2)) || void 0 === e5 ? void 0 : e5.traceparent());
      if (i2 && "01" === i2.flags) return { traceId: i2.traceId, spanId: i2.spanId };
    } catch (e6) {
    }
  }
  _admitNewSeries() {
    return this._config.maxSeriesPerFlush > this._series.size || (this._seriesCapWarned || (this._seriesCapWarned = true, this._logger.warn(`Metric series cap reached (${this._config.maxSeriesPerFlush} per flush window); dropping new series until the next flush. Reduce attribute cardinality.`)), false);
  }
  _fold(e5, t2) {
    switch (e5.type) {
      case "count":
        var i2;
        e5.total = (null !== (i2 = e5.total) && void 0 !== i2 ? i2 : 0) + t2;
        break;
      case "gauge":
        e5.last = t2;
        break;
      case "histogram": {
        e5.hist || (e5.hist = { count: 0, sum: 0, min: t2, max: t2, bucketCounts: new Array(wn.length + 1).fill(0) });
        const i3 = e5.hist;
        i3.count += 1, i3.sum += t2, i3.min = Math.min(i3.min, t2), i3.max = Math.max(i3.max, t2), i3.bucketCounts[(function(e6, t3) {
          for (let i4 = 0; t3.length > i4; i4++) if (t3[i4] >= e6) return i4;
          return t3.length;
        })(t2, wn)] += 1;
        break;
      }
    }
  }
  _runBeforeSend(e5) {
    const t2 = this._config.beforeSend;
    if (!t2) return e5;
    const i2 = _t(t2) ? t2 : [t2];
    let s2 = e5;
    for (const e6 of i2) try {
      const t3 = e6(s2);
      if (!t3) return this._logger.info("Metric was rejected in beforeSend function"), null;
      s2 = t3;
    } catch (e7) {
      return this._logger.error("Error in beforeSend function for metric:", e7), null;
    }
    return s2;
  }
  _armFlushTimer() {
    this._flushTimer.pending || this._flushTimer.arm(this._nextFlushDelay());
  }
  _nextFlushDelay() {
    return Math.max(vn(this._config.flushIntervalMs, this._consecutiveFlushFailures, this._flushJitter, 3e4), this._retryAfter.remainingMs());
  }
  _doFlush() {
    var e5 = this;
    return Lt(function* () {
      if (e5._flushTimer.clear(), 0 === e5._series.size) return;
      const t2 = e5._series;
      e5._series = /* @__PURE__ */ new Map(), e5._seriesCapWarned = false, e5._typeByName = /* @__PURE__ */ new Map(), e5._typeCollisionWarned = /* @__PURE__ */ new Set();
      const i2 = e5._generation, s2 = yield e5._instance._sendMetricsBatch(e5._buildPayload(t2));
      if (i2 === e5._generation) switch (e5._retryAfter.record(s2), "retry-later" === s2.kind ? (e5._consecutiveFlushFailures++, e5._flushJitter = gn()) : (e5._consecutiveFlushFailures = 0, e5._flushJitter = 1), e5._flushTimer.pending && e5._flushTimer.arm(e5._nextFlushDelay()), s2.kind) {
        case "ok":
          return;
        case "retry-later":
          return e5._mergeWindowBack(t2), void e5._flushTimer.armNoEarlierThan(e5._nextFlushDelay());
        case "too-large":
          return void e5._logger.warn("Metrics batch exceeded the server size limit and was dropped");
        case "fatal":
          return void e5._logger.error("Failed to send metrics batch:", s2.error);
      }
    })();
  }
  _buildPayload(e5) {
    return t2 = this._buildMetrics(e5), i2 = (function(e6, t3, i3) {
      return rn(e6, t3, i3);
    })(this._config, this._instance.getLibraryId(), this._instance.getLibraryVersion()), s2 = this._instance.getLibraryId(), r2 = this._instance.getLibraryVersion(), { resourceMetrics: [{ resource: { attributes: on(i2) }, scopeMetrics: [{ scope: { name: s2, version: r2 }, metrics: t2 }] }] };
    var t2, i2, s2, r2;
  }
  _buildMetrics(e5) {
    const t2 = En(Date.now()), i2 = /* @__PURE__ */ new Map();
    for (const o2 of e5.values()) {
      var s2;
      const e6 = Cn(o2.type, o2.name, o2.unit, void 0);
      let a2 = i2.get(e6);
      a2 || (a2 = ls({ name: o2.name }, o2.unit && { unit: o2.unit }), "count" === o2.type ? a2.sum = { aggregationTemporality: 1, isMonotonic: true, dataPoints: [] } : "gauge" === o2.type ? a2.gauge = { dataPoints: [] } : a2.histogram = { aggregationTemporality: 1, dataPoints: [] }, i2.set(e6, a2));
      const l2 = Xr(null !== (s2 = o2.attributes) && void 0 !== s2 ? s2 : {}, this._logger), c2 = En(o2.windowStartMs), u2 = xn(o2.exemplar);
      if ("count" === o2.type) {
        var r2;
        const e7 = ls({ attributes: l2, startTimeUnixNano: c2, timeUnixNano: t2, asDouble: null !== (r2 = o2.total) && void 0 !== r2 ? r2 : 0 }, u2);
        a2.sum.dataPoints.push(e7);
      } else if ("gauge" === o2.type) {
        var n2;
        const e7 = ls({ attributes: l2, timeUnixNano: t2, asDouble: null !== (n2 = o2.last) && void 0 !== n2 ? n2 : 0 }, u2);
        a2.gauge.dataPoints.push(e7);
      } else if (o2.hist) {
        const e7 = ls({ attributes: l2, startTimeUnixNano: c2, timeUnixNano: t2, count: o2.hist.count, sum: o2.hist.sum, min: o2.hist.min, max: o2.hist.max, bucketCounts: o2.hist.bucketCounts, explicitBounds: wn }, u2);
        a2.histogram.dataPoints.push(e7);
      }
    }
    return Array.from(i2.values());
  }
  _mergeWindowBack(e5) {
    for (const [r2, n2] of e5) {
      var t2;
      const e6 = this._series.get(r2);
      if (e6) switch (e6.windowStartMs = Math.min(e6.windowStartMs, n2.windowStartMs), e6.exemplar = null !== (t2 = e6.exemplar) && void 0 !== t2 ? t2 : n2.exemplar, e6.type) {
        case "count":
          var i2, s2;
          e6.total = (null !== (i2 = e6.total) && void 0 !== i2 ? i2 : 0) + (null !== (s2 = n2.total) && void 0 !== s2 ? s2 : 0);
          break;
        case "gauge":
          break;
        case "histogram":
          if (n2.hist) if (e6.hist) {
            e6.hist.count += n2.hist.count, e6.hist.sum += n2.hist.sum, e6.hist.min = Math.min(e6.hist.min, n2.hist.min), e6.hist.max = Math.max(e6.hist.max, n2.hist.max);
            for (let t3 = 0; e6.hist.bucketCounts.length > t3; t3++) e6.hist.bucketCounts[t3] += n2.hist.bucketCounts[t3];
          } else e6.hist = n2.hist;
      }
      else this._admitNewSeries() && this._series.set(r2, n2);
    }
  }
};
function xn(e5) {
  return e5 ? { exemplars: [{ filteredAttributes: [], timeUnixNano: En(e5.timeMs), asDouble: e5.value, traceId: e5.traceId, spanId: e5.spanId }] } : {};
}
var Pn = (e5, { debugEnabled: i2 } = {}) => {
  const s2 = { _log(s3, ...r2) {
    let n2;
    try {
      n2 = typeof window > "u" ? void 0 : window;
    } catch (e6) {
      return;
    }
    n2 && (t.DEBUG || n2.POSTHOG_DEBUG || i2) && !ft(n2.console) && n2.console && ("__rrweb_original__" in n2.console[s3] ? n2.console[s3].__rrweb_original__ : n2.console[s3])(e5, ...r2);
  }, debug(...e6) {
    s2._log("debug", ...e6);
  }, info(...e6) {
    s2._log("log", ...e6);
  }, warn(...e6) {
    s2._log("warn", ...e6);
  }, error(...e6) {
    s2._log("error", ...e6);
  }, critical(...t2) {
    console.error(e5, ...t2);
  }, uninitializedWarning(e6) {
    s2.error(`You must initialize PostHog before calling ${e6}`);
  }, createLogger: (t2, i3) => Pn(`${e5} ${t2}`, i3) };
  return s2;
};
var In = Pn("[PostHog.js]");
var Fn = In.createLogger;
function Tn(e5, t2) {
  _t(e5) && e5.forEach(t2);
}
function Rn(e5, t2) {
  if (!St(e5)) if (_t(e5)) e5.forEach(t2);
  else if (((e6) => e6 instanceof FormData)(e5)) e5.forEach((e6, i2) => t2(e6, i2));
  else for (const i2 in e5) dt.call(e5, i2) && t2(e5[i2], i2);
}
var $n = function(e5, ...t2) {
  for (const i2 of t2) for (const t3 in i2) void 0 !== i2[t3] && (e5[t3] = i2[t3]);
  return e5;
};
function An(e5) {
  const t2 = Object.keys(e5);
  let i2 = t2.length;
  const s2 = new Array(i2);
  for (; i2--; ) s2[i2] = [t2[i2], e5[t2[i2]]];
  return s2;
}
var Mn = function(e5) {
  return function(...t2) {
    try {
      return e5.apply(this, t2);
    } catch (e6) {
      In.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), In.critical(e6);
    }
  };
};
var On = function(e5) {
  const t2 = {};
  return Rn(e5, function(e6, i2) {
    (mt(e6) && e6.length > 0 || wt(e6)) && (t2[i2] = e6);
  }), t2;
};
function Ln(e5) {
  const t2 = ls({}, e5);
  for (const i2 of ["name", "message", "stack", "cause", "errors"]) try {
    i2 in e5 && (t2[i2] = e5[i2]);
  } catch (e6) {
  }
  return t2;
}
var Dn = ["herokuapp.com", "vercel.app", "netlify.app"];
function Nn(e5) {
  const t2 = null == e5 ? void 0 : e5.hostname;
  if (!mt(t2)) return false;
  const i2 = t2.split(".").slice(-2).join(".");
  for (const e6 of Dn) if (i2 === e6) return false;
  return true;
}
function Bn(e5, t2, i2, s2) {
  const { capture: r2 = false, passive: n2 = true } = null != s2 ? s2 : {};
  null == e5 || e5.addEventListener(t2, i2, { capture: r2, passive: n2 });
}
function Un(e5) {
  return "ph_toolbar_internal" === e5.name;
}
var qn = (e5) => {
  if (Ge) {
    try {
      const t2 = e5 + "=", i2 = Ge.cookie.split(";").filter((e6) => e6.length);
      for (let e6 = 0; i2.length > e6; e6++) {
        let s2 = i2[e6];
        for (; " " == s2.charAt(0); ) s2 = s2.substring(1, s2.length);
        if (0 === s2.indexOf(t2)) return decodeURIComponent(s2.substring(t2.length, s2.length));
      }
    } catch (e6) {
    }
    return null;
  }
};
var Hn = class e2 {
  constructor(e5) {
    if (this.bytes = e5, 16 !== e5.length) throw new TypeError("not 128-bit length");
  }
  static fromFieldsV7(t2, i2, s2, r2) {
    if (!Number.isInteger(t2) || !Number.isInteger(i2) || !Number.isInteger(s2) || !Number.isInteger(r2) || 0 > t2 || 0 > i2 || 0 > s2 || 0 > r2 || t2 > 281474976710655 || i2 > 4095 || s2 > 1073741823 || r2 > 4294967295) throw new RangeError("invalid field value");
    const n2 = new Uint8Array(16);
    return n2[0] = t2 / Math.pow(2, 40), n2[1] = t2 / Math.pow(2, 32), n2[2] = t2 / Math.pow(2, 24), n2[3] = t2 / Math.pow(2, 16), n2[4] = t2 / 256, n2[5] = t2, n2[6] = 112 | i2 >>> 8, n2[7] = i2, n2[8] = 128 | s2 >>> 24, n2[9] = s2 >>> 16, n2[10] = s2 >>> 8, n2[11] = s2, n2[12] = r2 >>> 24, n2[13] = r2 >>> 16, n2[14] = r2 >>> 8, n2[15] = r2, new e2(n2);
  }
  toString() {
    let e5 = "";
    for (let t2 = 0; this.bytes.length > t2; t2++) e5 = e5 + (this.bytes[t2] >>> 4).toString(16) + (15 & this.bytes[t2]).toString(16), 3 !== t2 && 5 !== t2 && 7 !== t2 && 9 !== t2 || (e5 += "-");
    if (36 !== e5.length) throw new Error("Invalid UUIDv7 was generated");
    return e5;
  }
  clone() {
    return new e2(this.bytes.slice(0));
  }
  equals(e5) {
    return 0 === this.compareTo(e5);
  }
  compareTo(e5) {
    for (let t2 = 0; 16 > t2; t2++) {
      const i2 = this.bytes[t2] - e5.bytes[t2];
      if (0 !== i2) return Math.sign(i2);
    }
    return 0;
  }
};
var zn = class {
  generate() {
    const e5 = this.generateOrAbort();
    if (!ft(e5)) return e5;
    {
      this._timestamp = 0;
      const e6 = this.generateOrAbort();
      if (ft(e6)) throw new Error("Could not generate UUID after timestamp reset");
      return e6;
    }
  }
  generateOrAbort() {
    const e5 = (() => {
      const e6 = Date.now();
      return wt(e6) && isFinite(e6) ? Math.min(Math.max(Math.floor(e6), 0), 281474976710655) : 0;
    })();
    if (e5 > this._timestamp) this._timestamp = e5, this._resetCounter();
    else {
      if (this._timestamp >= e5 + 1e4) return;
      this._counter++, this._counter > 4398046511103 && (this._timestamp++, this._resetCounter());
    }
    return Hn.fromFieldsV7(this._timestamp, Math.trunc(this._counter / Math.pow(2, 30)), this._counter & Math.pow(2, 30) - 1, this._random.nextUint32());
  }
  _resetCounter() {
    this._counter = 1024 * this._random.nextUint32() + (1023 & this._random.nextUint32());
  }
  constructor() {
    this._timestamp = 0, this._counter = 0, this._random = new Vn();
  }
};
var jn = (e5) => {
  if ("u" > typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
  for (let t2 = 0; e5.length > t2; t2++) e5[t2] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
  return e5;
};
var Wn;
var Vn = class {
  nextUint32() {
    var e5;
    return this._buffer.length > this._cursor || ((null !== (e5 = Wn) && void 0 !== e5 ? e5 : Wn = "u" > typeof window && !ft(window.crypto) && crypto.getRandomValues ? (e6) => {
      try {
        return crypto.getRandomValues(e6);
      } catch (t2) {
        return jn(e6);
      }
    } : jn)(this._buffer), this._cursor = 0), this._buffer[this._cursor++];
  }
  constructor() {
    this._buffer = new Uint32Array(8), this._cursor = 1 / 0;
  }
};
var Gn;
var Kn = () => Qn().toString();
var Qn = () => (Gn || (Gn = new zn())).generate();
var Jn = "";
var Yn = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
var Zn = null;
var Xn = { _is_supported() {
  if (!bt(Zn)) return Zn;
  if (Zn = false, Ge) try {
    const e5 = `__ph_cookie_support_${Kn()}`;
    Xn._set(e5, "xyz"), Zn = '"xyz"' === qn(e5), Xn._remove(e5);
  } catch (e5) {
    Zn = false;
  }
  return Zn;
}, _error(e5) {
  In.error("cookieStore error: " + e5);
}, _get: qn, _parse(e5) {
  let t2;
  try {
    t2 = JSON.parse(Xn._get(e5)) || {};
  } catch (e6) {
  }
  return t2;
}, _set(e5, t2, i2, s2, r2) {
  if (!Ge) return false;
  try {
    let n2 = "", o2 = "";
    const a2 = (function(e6, t3) {
      if (t3) {
        let t4 = (function(e7, t5 = Ge) {
          if (Jn) return Jn;
          if (!t5) return "";
          if (["localhost", "127.0.0.1"].includes(e7)) return "";
          const i3 = e7.split(".");
          let s3 = Math.min(i3.length, 8);
          const r3 = "dmn_chk_" + Kn();
          for (; !Jn && s3--; ) {
            const e8 = i3.slice(s3).join("."), n3 = r3 + "=1;domain=." + e8 + ";path=/";
            t5.cookie = n3 + ";max-age=3", t5.cookie.includes(r3) && (t5.cookie = n3 + ";max-age=0", Jn = e8);
          }
          return Jn;
        })(e6);
        if (!t4) {
          const i3 = ((e7) => {
            const t5 = e7.match(Yn);
            return t5 ? t5[0] : "";
          })(e6);
          i3 !== t4 && In.info("Warning: cookie subdomain discovery mismatch", i3, t4), t4 = i3;
        }
        return t4 ? "; domain=." + t4 : "";
      }
      return "";
    })(Ge.location.hostname, s2);
    if (i2) {
      const e6 = /* @__PURE__ */ new Date();
      e6.setTime(e6.getTime() + 864e5 * i2), n2 = "; expires=" + e6.toUTCString();
    }
    r2 && (o2 = "; secure");
    const l2 = e5 + "=" + encodeURIComponent(JSON.stringify(t2)) + n2 + "; SameSite=Lax; path=/" + a2 + o2;
    return l2.length > 3686.4 && In.warn("cookieStore warning: large cookie, len=" + l2.length), Ge.cookie = l2, true;
  } catch (e6) {
    return false;
  }
}, _remove(e5, t2) {
  if ((null == Ge ? void 0 : Ge.cookie) && (!t2 || !bt(qn(e5)))) try {
    Xn._set(e5, "", -1, t2);
  } catch (e6) {
    return;
  }
} };
var eo = null;
var to = { _is_supported() {
  if (!bt(eo)) return eo;
  let e5 = true;
  if (ft(je)) e5 = false;
  else try {
    const t2 = "__mplssupport__";
    to._set(t2, "xyz"), '"xyz"' !== to._get(t2) && (e5 = false), to._remove(t2);
  } catch (t2) {
    e5 = false;
  }
  return e5 || In.error("localStorage unsupported; falling back to cookie store"), eo = e5, e5;
}, _error(e5) {
  In.error("localStorage error: " + e5);
}, _get(e5) {
  try {
    return null == je ? void 0 : je.localStorage.getItem(e5);
  } catch (e6) {
    to._error(e6);
  }
  return null;
}, _parse(e5) {
  try {
    return JSON.parse(to._get(e5)) || {};
  } catch (e6) {
  }
  return null;
}, _set(e5, t2) {
  try {
    return null == je || je.localStorage.setItem(e5, JSON.stringify(t2)), true;
  } catch (e6) {
    to._error(e6);
  }
  return false;
}, _remove(e5) {
  try {
    null == je || je.localStorage.removeItem(e5);
  } catch (e6) {
    to._error(e6);
  }
} };
var io = [h, r, u, n, g, l, a, o, _];
var so = [I, P, ee, te, Se, be, M, ge];
var ro = (e5) => e5 + "_cpm";
var no = ["__proto__", "constructor", "prototype"];
var oo = (e5) => {
  if (!gt(e5)) return {};
  const t2 = {};
  return Object.keys(e5).forEach((i2) => {
    -1 === no.indexOf(i2) && (t2[i2] = e5[i2]);
  }), t2;
};
var ao = (e5, t2 = []) => {
  const i2 = {};
  return [...so, ...t2].forEach((t3) => {
    const s2 = e5[t3];
    ft(s2) || bt(s2) || "" === s2 || (i2[t3] = s2);
  }), i2;
};
var lo = (e5) => {
  let t2 = 5381, i2 = 2166136261;
  for (let s2 = 0; e5.length > s2; s2++) {
    const r2 = e5.charCodeAt(s2);
    t2 = 33 * t2 ^ r2, i2 = Math.imul(i2 ^ r2, 16777619);
  }
  return e5.length.toString(36) + "." + (t2 >>> 0).toString(36) + "." + (i2 >>> 0).toString(36);
};
var co = (e5, t2) => ({ p: t2, f: lo(JSON.stringify(e5)) });
var uo = (e5, t2) => {
  if (!t2) return { properties: [], isValid: false };
  try {
    const i2 = Xn._parse(ro(e5)), s2 = (null == i2 ? void 0 : i2.f) === lo(t2) && _t(i2.p);
    return { properties: s2 ? i2.p : [], isValid: s2 };
  } catch (e6) {
    return { properties: [], isValid: false };
  }
};
var ho = (e5, t2) => t2 + "|" + (Xn._get(ro(e5)) || "");
var _o = {};
var po = { _is_supported: () => true, _error(e5) {
  In.error("memoryStorage error: " + e5);
}, _get: (e5) => e5 in _o ? _o[e5] : null, _parse: (e5) => e5 in _o ? _o[e5] : null, _set: (e5, t2) => (_o[e5] = t2, true), _remove(e5) {
  delete _o[e5];
} };
var go = null;
var vo = { _is_supported() {
  if (!bt(go)) return go;
  if (go = true, ft(je)) go = false;
  else try {
    const e5 = "__support__";
    vo._set(e5, "xyz"), '"xyz"' !== vo._get(e5) && (go = false), vo._remove(e5);
  } catch (e5) {
    go = false;
  }
  return go;
}, _error(e5) {
  In.error("sessionStorage error: ", e5);
}, _get(e5) {
  try {
    return null == je ? void 0 : je.sessionStorage.getItem(e5);
  } catch (e6) {
    vo._error(e6);
  }
  return null;
}, _parse(e5) {
  try {
    return JSON.parse(vo._get(e5)) || null;
  } catch (e6) {
  }
  return null;
}, _set(e5, t2) {
  try {
    return null == je || je.sessionStorage.setItem(e5, JSON.stringify(t2)), true;
  } catch (e6) {
    vo._error(e6);
  }
  return false;
}, _remove(e5) {
  try {
    null == je || je.sessionStorage.removeItem(e5);
  } catch (e6) {
    vo._error(e6);
  }
} };
var fo = class {
  constructor(e5) {
    this._instance = e5;
  }
  get _config() {
    return this._instance.config;
  }
  get consent() {
    return this._getDnt() ? 0 : this._storedConsent;
  }
  isOptedOut() {
    return "always" === this._config.cookieless_mode || this.isRejected() || -1 === this.consent && "on_reject" === this._config.cookieless_mode;
  }
  isOptedIn() {
    return !this.isOptedOut();
  }
  isExplicitlyOptedOut() {
    return 0 === this.consent;
  }
  isRejected() {
    return 0 === this.consent || -1 === this.consent && this._config.opt_out_capturing_by_default;
  }
  optInOut(e5) {
    this._storage._set(this._storageKey, e5 ? 1 : 0, this._config.cookie_expiration, this._config.cross_subdomain_cookie, this._config.secure_cookie);
  }
  reset() {
    this._storage._remove(this._storageKey, this._config.cross_subdomain_cookie);
  }
  get _storageKey() {
    const { token: e5, opt_out_capturing_cookie_prefix: t2, consent_persistence_name: i2 } = this._instance.config;
    return i2 || (t2 ? t2 + e5 : "__ph_opt_in_out_" + e5);
  }
  get _storedConsent() {
    const e5 = this._storage._get(this._storageKey);
    return At(e5) ? 1 : ot(Mt, e5) ? 0 : -1;
  }
  get _storage() {
    const e5 = this._config.opt_out_capturing_persistence_type, t2 = "localStorage" === e5 ? to : Xn, i2 = t2._is_supported() ? t2 : po;
    if (!this._persistentStore || this._persistentStore !== i2) {
      this._persistentStore = i2;
      const t3 = "localStorage" === e5 ? Xn : to;
      t3._get(this._storageKey) && (this._persistentStore._get(this._storageKey) || this.optInOut(At(t3._get(this._storageKey))), t3._remove(this._storageKey, this._config.cross_subdomain_cookie));
    }
    return this._persistentStore;
  }
  _getDnt() {
    return !!this._config.respect_dnt && [null == Ve ? void 0 : Ve.doNotTrack, null == Ve ? void 0 : Ve.msDoNotTrack, tt.doNotTrack, null == Ve ? void 0 : Ve.globalPrivacyControl].some((e5) => At(e5));
  }
};
function mo(e5, t2) {
  var i2;
  const s2 = null == e5 || null === (i2 = e5.config) || void 0 === i2 ? void 0 : i2.get_current_url;
  if (!pt(s2)) return t2;
  try {
    const e6 = s2(t2);
    return mt(e6) && e6 ? e6 : t2;
  } catch (e6) {
    return In.error("Error in get_current_url, falling back to window.location.href", e6), t2;
  }
}
function yo(e5) {
  var t2;
  return e5 instanceof Element && ("__POSTHOG_TOOLBAR__" === e5.id || !!(null === (t2 = e5.closest) || void 0 === t2 ? void 0 : t2.call(e5, ".toolbar-global-fade-container")));
}
function bo(e5) {
  return !!e5 && 1 === e5.nodeType;
}
function So(e5, t2) {
  return !!e5 && !!e5.tagName && e5.tagName.toLowerCase() === t2.toLowerCase();
}
function wo(e5) {
  return !!e5 && 3 === e5.nodeType;
}
function Eo(e5) {
  return !!e5 && 11 === e5.nodeType && bo(e5.host);
}
function Co(e5) {
  return e5 ? at(e5).split(/\s+/) : [];
}
function ko(e5, t2) {
  const i2 = (function(e6) {
    var t3;
    const i3 = typeof window > "u" ? void 0 : window, s2 = null == i3 || null === (t3 = i3.location) || void 0 === t3 ? void 0 : t3.href;
    return ft(s2) ? void 0 : mo(e6, s2);
  })(t2);
  return !!(i2 && e5 && e5.some((e6) => i2.match(e6)));
}
function xo(e5) {
  let t2 = "";
  switch (typeof e5.className) {
    case "string":
      t2 = e5.className;
      break;
    case "object":
      t2 = (e5.className && "baseVal" in e5.className ? e5.className.baseVal : null) || e5.getAttribute("class") || "";
      break;
    default:
      t2 = "";
  }
  return Co(t2);
}
function Po(e5) {
  return St(e5) ? null : at(e5).split(/(\s+)/).filter((e6) => sa(e6)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Io(e5) {
  let t2 = "";
  return Ko(e5) && !Qo(e5) && e5.childNodes && e5.childNodes.length && Rn(e5.childNodes, function(e6) {
    var i2;
    wo(e6) && e6.textContent && (t2 += null !== (i2 = Po(e6.textContent)) && void 0 !== i2 ? i2 : "");
  }), at(t2);
}
function Fo(e5) {
  var t2;
  return ft(e5.target) ? e5.srcElement || null : (null === (t2 = e5.target) || void 0 === t2 ? void 0 : t2.shadowRoot) ? e5.composedPath()[0] || null : e5.target || null;
}
var To = ["a", "button", "form", "input", "select", "textarea", "label"];
function Ro(e5, t2) {
  const i2 = e5.matches || e5.matchesSelector || e5.msMatchesSelector || e5.mozMatchesSelector || e5.webkitMatchesSelector || e5.oMatchesSelector;
  try {
    return !!i2 && i2.call(e5, t2);
  } catch (e6) {
    return false;
  }
}
function $o(e5, t2) {
  if (ft(t2)) return true;
  for (const i2 of e5) if (t2.some((e6) => Ro(i2, e6))) return true;
  return false;
}
function Ao(e5) {
  const t2 = e5.parentNode;
  return !(!t2 || !bo(t2)) && t2;
}
var Mo = [".ph-no-autocapture", "[data-ph-no-autocapture]"];
var Oo = ["next", "previous", "prev", ">", "<", "\u2192", "\u2190", "\u203A", "\u2039", "\xBB", "\xAB", "\u25B6", "\u25C0", "\u276F", "\u276E"];
var Lo = [...Oo, "+", "-", "\u2212", "\u2013"];
var Do = Lo.length + 10;
var No = ["button", "a", "input", "select", "textarea", "label"];
var Bo = ["button", "link", "tab", "menuitem", "option"];
var Uo = (e5, t2) => /[a-z0-9]/i.test(t2) ? ot(Lo, t2) ? new RegExp(`\\b${t2}\\b`).test(e5) : e5.includes(t2) : e5 === t2;
var qo = (e5) => ot(No, e5.tagName.toLowerCase()) || ot(Bo, (e5.getAttribute("role") || "").toLowerCase());
function Ho(e5) {
  let t2 = "", i2 = "";
  const s2 = (e6) => {
    bo(e6) && Ko(e6) && !Qo(e6) && (t2 += ` ${Io(e6)}`, i2 = i2 || e6.getAttribute("aria-label") || "", Rn(e6.childNodes, s2));
  };
  s2(e5), t2 = at(t2.replace(/\s+/g, " "));
  const r2 = (sa(t2) ? t2 : "").toLowerCase(), n2 = e5.getAttribute("aria-label") || (r2 ? "" : i2);
  return { safeText: r2, ariaLabel: at(n2).toLowerCase() };
}
var zo = [".ph-no-rageclick", ".ph-no-capture"];
var jo = ["", "text", "search", "email", "password", "url", "tel", "number"];
function Wo(e5, t2) {
  if (!(typeof window > "u" ? void 0 : window) || Vo(e5)) return false;
  let i2, s2, r2;
  var n2, o2;
  if (Ct(t2) ? (i2 = !!t2 && zo, s2 = void 0, r2 = false) : (i2 = null !== (n2 = null == t2 ? void 0 : t2.css_selector_ignorelist) && void 0 !== n2 ? n2 : zo, s2 = null == t2 ? void 0 : t2.content_ignorelist, r2 = null !== (o2 = null == t2 ? void 0 : t2.ignore_text_selection) && void 0 !== o2 && o2), false === i2) return false;
  if (r2 && (function(e6) {
    return !(!e6 || !bo(e6)) && (!!So(e6, "textarea") || (So(e6, "input") ? ot(jo, (e6.getAttribute("type") || "").toLowerCase()) : (function(e7) {
      var t3;
      if (e7.isContentEditable) return true;
      const i3 = null === (t3 = e7.getAttribute) || void 0 === t3 ? void 0 : t3.call(e7, "contenteditable");
      return "true" === i3 || "" === i3;
    })(e6)));
  })(e5)) return false;
  const { targetElementList: a2 } = Go(e5, false);
  return !(s2 && (function(e6, { safeText: t3, ariaLabel: i3 }) {
    let s3;
    if (true === e6) s3 = Oo;
    else {
      if (!_t(e6)) return false;
      if (e6.length > Do) return In.error(`[PostHog] content_ignorelist array cannot exceed ${Do} items. Use css_selector_ignorelist for more complex matching.`), false;
      s3 = e6.map((e7) => e7.toLowerCase());
    }
    return s3.some((e7) => Uo(t3, e7) || Uo(i3, e7));
  })(s2, (function(e6, t3) {
    for (const e7 of t3) if (qo(e7)) return Ho(e7);
    for (const e7 of t3) {
      try {
        var i3;
        if ("pointer" !== (null === (i3 = window) || void 0 === i3 ? void 0 : i3.getComputedStyle(e7).getPropertyValue("cursor"))) break;
      } catch (e8) {
        break;
      }
      const t4 = Ho(e7);
      if (t4.safeText || t4.ariaLabel) return t4;
    }
    return Ho(e6);
  })(e5, a2)) || $o(a2, i2));
}
var Vo = (e5) => !e5 || So(e5, "html") || !bo(e5);
var Go = (e5, t2) => {
  const i2 = typeof window > "u" ? void 0 : window;
  if (!i2 || Vo(e5)) return { parentIsUsefulElement: false, targetElementList: [] };
  let s2 = false;
  const r2 = [e5];
  let n2 = e5;
  for (; n2.parentNode && !So(n2, "body"); ) {
    if (Eo(n2.parentNode)) {
      r2.push(n2.parentNode.host), n2 = n2.parentNode.host;
      continue;
    }
    const e6 = Ao(n2);
    if (!e6) break;
    if (t2 || To.indexOf(e6.tagName.toLowerCase()) > -1) s2 = true;
    else try {
      const t3 = i2.getComputedStyle(e6);
      t3 && "pointer" === t3.getPropertyValue("cursor") && (s2 = true);
    } catch (e7) {
    }
    r2.push(e6), n2 = e6;
  }
  return { parentIsUsefulElement: s2, targetElementList: r2 };
};
function Ko(e5) {
  const t2 = /* @__PURE__ */ new Set();
  let i2 = 0;
  for (let s3 = e5; s3.parentNode && !So(s3, "body"); s3 = s3.parentNode) {
    if (i2++ >= 1e3 || t2.has(s3)) return false;
    t2.add(s3);
    const e6 = xo(s3);
    if (ot(e6, "ph-sensitive") || ot(e6, "ph-no-capture")) return false;
  }
  if (ot(xo(e5), "ph-include")) return true;
  const s2 = e5.type || "";
  if (mt(s2)) switch (s2.toLowerCase()) {
    case "hidden":
    case "password":
      return false;
  }
  const r2 = e5.name || e5.id || "";
  return !mt(r2) || !/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r2.replace(/[^a-zA-Z0-9]/g, ""));
}
function Qo(e5) {
  return !!(So(e5, "input") && !["button", "checkbox", "submit", "reset"].includes(e5.type) || So(e5, "select") || So(e5, "textarea") || "true" === e5.getAttribute("contenteditable"));
}
var Jo = new RegExp("^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$");
var Yo = /(^|[^0-9A-Za-z_])([0-9][0-9 -]*[0-9])(?=$|[^0-9A-Za-z_])/g;
var Zo = [16, 15, 14, 13];
var Xo = new RegExp("^(\\d{3}-?\\d{2}-?\\d{4})$");
var ea = new RegExp("(^|[^0-9])((?!000|666)[0-9]{3}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4})(?=$|([^0-9]))", "g");
var ta = /[0-9A-Za-z_]/;
function ia(e5) {
  let t2 = 0, i2 = false;
  for (let s2 = e5.length - 1; s2 >= 0; s2--) {
    let r2 = e5.charCodeAt(s2) - 48;
    i2 && (r2 *= 2, r2 > 9 && (r2 -= 9)), t2 += r2, i2 = !i2;
  }
  return t2 % 10 == 0;
}
function sa(e5, t2 = true) {
  if (St(e5)) return false;
  if (mt(e5)) {
    if (e5 = at(e5), t2 ? Jo.test((e5 || "").replace(/[- ]/g, "")) : (function(e6) {
      let t3;
      for (Yo.lastIndex = 0; t3 = Yo.exec(e6); ) {
        const e7 = t3[2];
        if (!e7) continue;
        const i2 = e7.replace(/[- ]/g, "");
        for (let e8 = 0; i2.length > e8; e8++) for (const t4 of Zo) {
          const s2 = e8 + t4;
          if (i2.length >= s2) {
            const t5 = i2.slice(e8, s2);
            if (Jo.test(t5) && ia(t5)) return true;
          }
        }
      }
      return false;
    })(e5)) return false;
    if (t2 ? Xo.test(e5) : (function(e6) {
      let t3;
      for (ea.lastIndex = 0; t3 = ea.exec(e6); ) {
        const e7 = t3[1], i2 = t3[3];
        if (!(e7 && i2 && ta.test(e7) && ta.test(i2))) return true;
      }
      return false;
    })(e5)) return false;
  }
  return true;
}
function ra(e5) {
  let t2 = Io(e5);
  return t2 = `${t2} ${na(e5)}`.trim(), sa(t2) ? t2 : "";
}
function na(e5) {
  let t2 = "";
  return e5 && e5.childNodes && e5.childNodes.length && Rn(e5.childNodes, function(e6) {
    var i2;
    if (e6 && "span" === (null === (i2 = e6.tagName) || void 0 === i2 ? void 0 : i2.toLowerCase())) try {
      const i3 = Io(e6);
      t2 = `${t2} ${i3}`.trim(), e6.childNodes && e6.childNodes.length && (t2 = `${t2} ${na(e6)}`.trim());
    } catch (e7) {
      In.error("[AutoCapture]", e7);
    }
  }), t2;
}
function oa(e5) {
  return e5.replace(/"|\\"/g, '\\"');
}
function aa(e5) {
  const t2 = e5.attr__class;
  if (t2) return _t(t2) ? t2 : Co(t2);
}
var la = Fn("[Dead Clicks]");
var ca = () => true;
var ua = (e5) => {
  var t2;
  const i2 = !!(null === (t2 = e5.instance.persistence) || void 0 === t2 ? void 0 : t2.get_property(z)), s2 = e5.instance.config.capture_dead_clicks;
  return Ct(s2) ? s2 : !!gt(s2) || i2;
};
var da = class {
  get lazyLoadedDeadClicksAutocapture() {
    return this._lazyLoadedDeadClicksAutocapture;
  }
  constructor(e5, t2, i2) {
    this.instance = e5, this.isEnabled = t2, this.onCapture = i2, this.startIfEnabledOrStop();
  }
  onRemoteConfig(e5) {
    if (!e5.ok) return;
    const t2 = e5.config;
    "captureDeadClicks" in t2 && (this.instance.persistence && this.instance.persistence.register({ [z]: t2.captureDeadClicks }), this.startIfEnabledOrStop());
  }
  startIfEnabledOrStop() {
    this.isEnabled(this) ? this._loadScript(() => {
      this._start();
    }) : this.stop();
  }
  _loadScript(e5) {
    var t2, i2, s2;
    (null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.initDeadClicksAutocapture) ? e5() : null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this.instance, "dead-clicks-autocapture", (t3) => {
      t3 ? la.error("failed to load script", t3) : e5();
    });
  }
  _start() {
    var e5;
    if (Ge) {
      if (!this._lazyLoadedDeadClicksAutocapture && (null === (e5 = tt.__PosthogExtensions__) || void 0 === e5 ? void 0 : e5.initDeadClicksAutocapture)) {
        const e6 = gt(this.instance.config.capture_dead_clicks) ? ls({}, this.instance.config.capture_dead_clicks) : {};
        e6.__onCapture = this.onCapture, this.onCapture && (e6.capture_dead_swipes = false), this._lazyLoadedDeadClicksAutocapture = tt.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, e6), this._lazyLoadedDeadClicksAutocapture.start(Ge), la.info("starting...");
      }
    } else la.error("`document` not found. Cannot start.");
  }
  stop() {
    this._lazyLoadedDeadClicksAutocapture && (this._lazyLoadedDeadClicksAutocapture.stop(), this._lazyLoadedDeadClicksAutocapture = void 0, la.info("stopping..."));
  }
};
var ha = Fn("[SegmentIntegration]");
function _a(e5, t2, i2 = true) {
  const s2 = e5.config.segment;
  if (!s2) return t2();
  const { analytics: r2, filterProperties: n2 } = ((e6) => pt(e6.register))(o2 = s2) ? { analytics: o2 } : o2;
  var o2;
  !(function(e6, t3, i3, s3) {
    const r3 = (t4) => {
      const r4 = () => t4.anonymousId() || Kn();
      e6.config.get_device_id = r4, s3 && t4.id() && (e6.register({ distinct_id: t4.id(), $device_id: r4() }), e6.persistence.set_property(ge, De)), i3(s3 ? void 0 : t4.anonymousId() || void 0);
    }, n3 = t3.user();
    "then" in n3 && pt(n3.then) ? n3.then(r3) : r3(n3);
  })(e5, r2, (i3) => {
    r2.register(((e6, t3, { filterProperties: i4 } = {}) => {
      "undefined" != typeof Promise && Promise.resolve || ha.warn("This browser does not have Promise support, and can not use the segment integration");
      const s3 = (s4, r3) => {
        if (!r3) return s4;
        const n3 = !!t3 && s4.event.anonymousId === t3 && !s4.event.userId;
        n3 || s4.event.userId || s4.event.anonymousId === e6.get_distinct_id() || (ha.info("No userId set, resetting PostHog"), e6.reset()), n3 || (t3 = void 0), s4.event.userId && s4.event.userId !== e6.get_distinct_id() && (ha.info("UserId set, identifying with PostHog"), e6.identify(s4.event.userId));
        let o3 = e6.calculateEventProperties(r3, s4.event.properties);
        if (!St(i4)) {
          const e7 = s4.event.properties || {}, t4 = {};
          for (const i5 of Object.keys(o3)) dt.call(e7, i5) || (t4[i5] = o3[i5]);
          const r4 = ((e8, t5) => {
            const i5 = _t(e8) ? e8 : [e8];
            let s5 = ls({}, t5);
            for (const e9 of i5) try {
              if (s5 = e9(s5), St(s5)) return null;
            } catch (e10) {
              return ha.error("Error in Segment filterProperties:", e10), null;
            }
            return s5;
          })(i4, t4);
          if (St(r4)) return s4;
          o3 = r4;
        }
        return s4.event.properties = Object.assign({}, o3, s4.event.properties), s4;
      };
      return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded() {
        return true;
      }, load() {
        return Promise.resolve();
      }, track(e7) {
        return s3(e7, e7.event.event);
      }, page(e7) {
        return s3(e7, Ue);
      }, identify(e7) {
        return s3(e7, He);
      }, screen(e7) {
        return s3(e7, "$screen");
      } };
    })(e5, i3, { filterProperties: n2 })).then(() => {
      t2();
    }, (e6) => {
      ha.error("Failed to register the Segment integration", e6), t2();
    });
  }, i2);
}
var pa = "posthog-js";
function ga(e5, { organization: t2, projectId: i2, prefix: s2, severityAllowList: r2 = ["error"], sendExceptionsToPostHog: n2 = true } = {}) {
  return (o2) => {
    var a2, l2, c2, u2, d2;
    if ("*" !== r2 && !r2.includes(o2.level) || !e5.__loaded) return o2;
    o2.tags || (o2.tags = {});
    const h2 = e5.requestRouter.endpointFor("ui", `/project/${e5.config.token}/person/${e5.get_distinct_id()}`);
    o2.tags["PostHog Person URL"] = h2, e5.sessionRecordingStarted() && (o2.tags["PostHog Recording URL"] = e5.get_session_replay_url({ withTimestamp: true }));
    const _2 = (null === (a2 = o2.exception) || void 0 === a2 ? void 0 : a2.values) || [], p2 = _2.map((e6) => ls(ls({}, e6), {}, { stacktrace: e6.stacktrace ? ls(ls({}, e6.stacktrace), {}, { type: "raw", frames: (e6.stacktrace.frames || []).map((e7) => ls(ls({}, e7), {}, { platform: "web:javascript" })) }) : void 0 })), g2 = { $exception_message: (null === (l2 = _2[0]) || void 0 === l2 ? void 0 : l2.value) || o2.message, $exception_type: null === (c2 = _2[0]) || void 0 === c2 ? void 0 : c2.type, $exception_level: o2.level, $exception_list: p2, $sentry_event_id: o2.event_id, $sentry_exception: o2.exception, $sentry_exception_message: (null === (u2 = _2[0]) || void 0 === u2 ? void 0 : u2.value) || o2.message, $sentry_exception_type: null === (d2 = _2[0]) || void 0 === d2 ? void 0 : d2.type, $sentry_tags: o2.tags };
    var v2;
    return t2 && i2 && (g2.$sentry_url = (s2 || "https://sentry.io/organizations/") + t2 + "/issues/?project=" + i2 + "&query=" + o2.event_id), n2 && (null === (v2 = e5.exceptions) || void 0 === v2 || v2.sendExceptionEvent(g2)), o2;
  };
}
var va = class {
  constructor(e5, t2, i2, s2, r2, n2) {
    this.name = pa, this.setupOnce = function(o2) {
      o2(ga(e5, { organization: t2, projectId: i2, prefix: s2, severityAllowList: r2, sendExceptionsToPostHog: null == n2 || n2 }));
    };
  }
};
var fa = class {
  constructor(e5) {
    this._onSessionIdChange = (e6, t2, i2) => {
      i2 && (i2.noSessionId || i2.activityTimeout || i2.sessionPastMaximumLength || i2.crossTabAdoption) && (In.info("[PageViewManager] Session rotated, clearing pageview state", { sessionId: e6, changeReason: i2 }), this._currentPageview = void 0, this._instance.scrollManager.resetContext());
    }, this._instance = e5, this._setupSessionRotationHandler();
  }
  _setupSessionRotationHandler() {
    var e5;
    this._unsubscribeSessionId = null === (e5 = this._instance.sessionManager) || void 0 === e5 ? void 0 : e5.onSessionId(this._onSessionIdChange);
  }
  destroy() {
    var e5;
    null === (e5 = this._unsubscribeSessionId) || void 0 === e5 || e5.call(this), this._unsubscribeSessionId = void 0;
  }
  doPageView(e5, t2) {
    var i2;
    const s2 = this._previousPageViewProperties(e5, t2);
    return this._currentPageview = { pathname: null !== (i2 = null == je ? void 0 : je.location.pathname) && void 0 !== i2 ? i2 : "", pageViewId: t2, timestamp: e5 }, this._instance.scrollManager.resetContext(), s2;
  }
  doPageLeave(e5) {
    var t2;
    return this._previousPageViewProperties(e5, null === (t2 = this._currentPageview) || void 0 === t2 ? void 0 : t2.pageViewId);
  }
  doEvent() {
    var e5;
    return { $pageview_id: null === (e5 = this._currentPageview) || void 0 === e5 ? void 0 : e5.pageViewId };
  }
  _previousPageViewProperties(e5, t2) {
    const i2 = this._currentPageview;
    if (!i2) return { $pageview_id: t2 };
    let s2 = { $pageview_id: t2, $prev_pageview_id: i2.pageViewId };
    const r2 = this._instance.scrollManager.getContext();
    if (r2 && !this._instance.config.disable_scroll_properties) {
      let { maxScrollHeight: e6, lastScrollY: t3, maxScrollY: i3, maxContentHeight: n2, lastContentY: o2, maxContentY: a2 } = r2;
      if (!(ft(e6) || ft(t3) || ft(i3) || ft(n2) || ft(o2) || ft(a2))) {
        e6 = Math.ceil(e6), t3 = Math.ceil(t3), i3 = Math.ceil(i3), n2 = Math.ceil(n2), o2 = Math.ceil(o2), a2 = Math.ceil(a2);
        const r3 = e6 > 1 ? Ut(t3 / e6, 0, 1, In) : 1, l2 = e6 > 1 ? Ut(i3 / e6, 0, 1, In) : 1, c2 = n2 > 1 ? Ut(o2 / n2, 0, 1, In) : 1, u2 = n2 > 1 ? Ut(a2 / n2, 0, 1, In) : 1;
        s2 = $n(s2, { $prev_pageview_last_scroll: t3, $prev_pageview_last_scroll_percentage: r3, $prev_pageview_max_scroll: i3, $prev_pageview_max_scroll_percentage: l2, $prev_pageview_last_content: o2, $prev_pageview_last_content_percentage: c2, $prev_pageview_max_content: a2, $prev_pageview_max_content_percentage: u2 });
      }
    }
    return i2.pathname && (s2.$prev_pageview_pathname = i2.pathname), i2.timestamp && (s2.$prev_pageview_duration = (e5.getTime() - i2.timestamp.getTime()) / 1e3), s2;
  }
};
var ma = ["flags", "surveys"];
var ya = { [x]: { exposure: "hidden" }, [T]: { exposure: "hidden" }, [R]: { exposure: "hidden" }, [D]: { exposure: "hidden" }, [M]: { exposure: "hidden" }, [L]: { exposure: "hidden" }, [y]: { exposure: "event" }, [N]: { exposure: "hidden" }, [W]: { exposure: "hidden" }, [B]: { exposure: "event" }, [U]: { exposure: "hidden" }, [q]: { exposure: "event" }, [H]: { exposure: "event" }, [z]: { exposure: "event" }, [j]: { exposure: "hidden" }, [V]: { exposure: "event" }, [G]: { exposure: "hidden" }, [K]: { exposure: "hidden" }, [ee]: { exposure: "hidden" }, [te]: { exposure: "event" }, [Q]: { exposure: "event", shouldSkipFromEventProperties: (e5) => bt(e5) }, [ie]: { exposure: "event" }, [se]: { exposure: "event" }, [re]: { exposure: "event" }, [ne]: { exposure: "event" }, [oe]: { exposure: "hidden" }, [u]: { exposure: "hidden", storageGroup: "flags" }, [r]: { exposure: "hidden", storageGroup: "flags" }, [s]: { exposure: "hidden" }, [n]: { exposure: "hidden", storageGroup: "flags" }, [g]: { exposure: "hidden", storageGroup: "flags" }, [l]: { exposure: "hidden", storageGroup: "flags", volatile: true }, [c]: { exposure: "hidden", storageGroup: "flags" }, [v]: { exposure: "hidden" }, [f]: { exposure: "hidden" }, [h]: { exposure: "hidden" }, [d]: { exposure: "hidden" }, [b]: { exposure: "hidden", storageGroup: "surveys" }, [S]: { exposure: "hidden", storageGroup: "surveys", volatile: true }, [E]: { exposure: "event" }, [C]: { exposure: "hidden" }, [k]: { exposure: "hidden" }, [le]: { exposure: "hidden" }, [ce]: { exposure: "hidden" }, [ue]: { exposure: "hidden" }, [de]: { exposure: "event" }, [he]: { exposure: "event" }, [_e]: { exposure: "event" }, [pe]: { exposure: "event" }, [_]: { exposure: "hidden" }, [p]: { exposure: "hidden" }, [ae]: { exposure: "event" }, [o]: { exposure: "hidden" }, [a]: { exposure: "hidden", storageGroup: "flags", volatile: true }, [ge]: { exposure: "hidden" }, [ve]: { exposure: "hidden" }, [fe]: { exposure: "hidden" }, [me]: { exposure: "hidden" }, [ye]: { exposure: "hidden" }, [be]: { exposure: "hidden" }, [Se]: { exposure: "hidden" }, [J]: { exposure: "event" }, [Y]: { exposure: "event" }, [Z]: { exposure: "event" }, [X]: { exposure: "event" }, [Ce]: { exposure: "event" }, [ke]: { exposure: "event" }, [xe]: { exposure: "hidden" }, [Pe]: { exposure: "hidden" }, [Ie]: { exposure: "hidden" }, [Fe]: { exposure: "hidden" }, [Te]: { exposure: "hidden" }, [Re]: { exposure: "hidden" }, [$e]: { exposure: "hidden" }, [Ae]: { exposure: "hidden" }, [Me]: { exposure: "hidden" }, [Oe]: { exposure: "event" } };
var ba = [["$posthog_sr_group_event_trigger_", { exposure: "hidden" }], ["$posthog_sr_group_url_trigger_", { exposure: "hidden" }], ["$posthog_sr_group_sampling_", { exposure: "hidden" }]];
var Sa = (e5) => {
  const t2 = ya[e5];
  if (t2) return t2;
  for (const [t3, i2] of ba) if (0 === e5.indexOf(t3)) return i2;
};
function wa() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e5) {
    return;
  }
}
var Ea = (e5) => {
  const t2 = typeof document > "u" ? void 0 : document, i2 = null == t2 ? void 0 : t2.createElement("a");
  return ft(i2) ? null : (i2.href = e5, i2);
};
var Ca = () => {
  try {
    return "u" > typeof window && false !== window.navigator.onLine;
  } catch (e5) {
    return false;
  }
};
var ka = (e5, t2) => e5 >= t2 && Ca();
var xa = (e5, t2, i2, s2) => {
  if (0 === e5) {
    if (Ca()) {
      const e6 = t2 + 1;
      return e6 === i2 && s2(), e6;
    }
    return t2;
  }
  return 0;
};
var Pa = (e5, t2) => {
  try {
    let i2;
    return JSON.stringify(e5, (e6, t3) => {
      var s2;
      return Ft(t3) ? (null !== (s2 = i2) && void 0 !== s2 || (i2 = /* @__PURE__ */ new WeakMap()), i2.has(t3) || i2.set(t3, Ln(t3)), i2.get(t3)) : "bigint" == typeof t3 ? t3.toString() : t3;
    }, t2);
  } catch (t3) {
    return ct(e5);
  }
};
var Ia = function(e5, t2) {
  const i2 = ((e5.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&");
  let s2;
  for (let e6 = 0; i2.length > e6; e6++) {
    const r2 = i2[e6].split(/=(.*)/);
    if (r2[0] === t2) {
      s2 = r2;
      break;
    }
  }
  if (!_t(s2) || 2 > s2.length) return "";
  {
    let e6 = s2[1].replace(/\+/g, " ");
    try {
      e6 = decodeURIComponent(e6);
    } catch (t3) {
      In.error("Skipping decoding for malformed query param: " + e6);
    }
    return e6;
  }
};
var Fa = function(e5, t2, i2) {
  if (!e5 || !t2 || !t2.length) return e5;
  const s2 = e5.split(/#(.*)/), r2 = s2[1], n2 = (s2[0] || "").split(/\?(.*)/), o2 = n2[1], a2 = n2[0], l2 = (o2 || "").split("&"), c2 = [];
  for (let e6 = 0; l2.length > e6; e6++) {
    const s3 = l2[e6].split("?");
    let r3 = 0;
    for (; s3.length > r3 && !t2.includes(s3[r3].split("=")[0]); ) r3++;
    c2.push(s3.length > r3 ? s3.slice(0, r3).concat(s3[r3].split("=")[0] + "=" + i2).join("?") : l2[e6]);
  }
  let u2 = a2;
  return null != o2 && (u2 += "?" + c2.join("&")), null != r2 && (u2 += "#" + r2), u2;
};
var Ta = function(e5, t2) {
  const i2 = e5.match(new RegExp(t2 + "=([^&]*)"));
  return i2 ? i2[1] : null;
};
var Ra = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "oppref", "bfcid", "irclid", "_kx"];
var $a = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid", ...Ra];
var Aa = "<masked>";
var Ma = ["li_fat_id"];
function Oa(e5, t2, i2) {
  if (!Ge) return {};
  const s2 = t2 ? [...Ra, ...i2 || []] : [], r2 = La(Fa(Ge.URL, s2, Aa), e5), n2 = (function() {
    const e6 = {};
    return Rn(Ma, function(t3) {
      const i3 = qn(t3);
      e6[t3] = i3 || null;
    }), e6;
  })();
  return $n(n2, r2);
}
function La(e5, t2) {
  const i2 = $a.concat(t2 || []), s2 = {};
  return Rn(i2, function(t3) {
    const i3 = Ia(e5, t3);
    s2[t3] = i3 || null;
  }), s2;
}
function Da(e5) {
  const t2 = (function(e6) {
    return e6 ? 0 === e6.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === e6.search("https?://(.*)bing.com") ? "bing" : 0 === e6.search("https?://(.*)yahoo.com") ? "yahoo" : 0 === e6.search("https?://(.*)duckduckgo.com") ? "duckduckgo" : null : null;
  })(e5), i2 = "yahoo" != t2 ? "q" : "p", s2 = {};
  if (!bt(t2)) {
    s2.$search_engine = t2;
    const e6 = Ge ? Ia(Ge.referrer, i2) : "";
    e6.length && (s2.ph_keyword = e6);
  }
  return s2;
}
function Na() {
  return navigator.language || navigator.userLanguage;
}
function Ba() {
  const e5 = Na();
  return "string" == typeof e5 ? e5.split("-")[0] : void 0;
}
var Ua = "$direct";
function qa() {
  return (null == Ge ? void 0 : Ge.referrer) || Ua;
}
function Ha(e5, t2, i2 = false) {
  const s2 = e5 ? [...Ra, ...t2 || []] : [], r2 = i2 ? es(null == Ke ? void 0 : Ke.href) : null == Ke ? void 0 : Ke.href, n2 = null == r2 ? void 0 : r2.substring(0, 1e3);
  return { r: qa().substring(0, 1e3), u: n2 ? Fa(n2, s2, Aa) : void 0 };
}
function za(e5, t2 = false) {
  var i2;
  const { r: s2, u: r2 } = e5, n2 = t2 ? es(r2) : r2, o2 = { $referrer: s2, $referring_domain: null == s2 ? void 0 : s2 == Ua ? Ua : null === (i2 = Ea(s2)) || void 0 === i2 ? void 0 : i2.host };
  if (n2) {
    o2.$current_url = n2;
    const e6 = Ea(n2);
    o2.$host = null == e6 ? void 0 : e6.host, o2.$pathname = null == e6 ? void 0 : e6.pathname;
    const t3 = La(n2);
    $n(o2, t3);
  }
  if (s2) {
    const e6 = Da(s2);
    $n(o2, e6);
  }
  return o2;
}
function ja() {
  try {
    return (/* @__PURE__ */ new Date()).getTimezoneOffset();
  } catch (e5) {
    return;
  }
}
var Wa = { flags: a, surveys: S };
var Va = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
var Ga = (e5) => `${e5}_cookie_identity_change_pending`;
var Ka = (e5) => {
  let t2 = "", i2 = 0;
  for (const s2 of e5) {
    const e6 = encodeURIComponent(JSON.stringify(s2).slice(1, -1)).length;
    if (i2 + e6 > 1e3) break;
    t2 += s2, i2 += e6;
  }
  return t2;
};
var Qa = "main";
var Ja = [u, r, n, g, l, a, c, h];
var Ya = (e5) => -1 !== Ja.indexOf(e5);
var Za = [M, L];
var Xa = (e5) => -1 !== Za.indexOf(e5);
var el = (e5, t2) => {
  try {
    return JSON.stringify(e5) === JSON.stringify(t2);
  } catch (i2) {
    return e5 === t2;
  }
};
var tl = (e5) => {
  if (!e5) return {};
  const t2 = JSON.parse(e5);
  return gt(t2) ? t2 : {};
};
var il = (e5, t2) => {
  Rn(e5, (i2, s2) => {
    const r2 = Sa(s2);
    r2 && "event" !== r2.exposure || {}.hasOwnProperty.call(t2, s2) || delete e5[s2];
  });
};
var sl = class {
  constructor(e5, t2, i2 = true, s2 = !e5.cookieless_mode) {
    if (this._slotState = {}, this._splitStorageEligible = false, this._storesIdentityInCookie = false, this._splitStorage = false, this._cookieIdentityChangePending = false, this._cookieSyncSuppressed = false, this._pendingCrossTabFeatureFlagChanges = /* @__PURE__ */ new Map(), this._storageMigrationInProgress = false, this._localIdentityChangePending = false, this._crossTabFeatureFlagIdentityMismatch = false, this._metaIdentifierChangePending = /* @__PURE__ */ new Set(), this._crossTabFeatureFlagHandlers = /* @__PURE__ */ new Set(), this._config = e5, this._ownsSplitStorage = i2, this.props = {}, this._campaign_params_url = void 0, this._name = ((e6) => {
      let t3 = "";
      return e6.token && (t3 = e6.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e6.persistence_name ? "ph_" + e6.persistence_name : "ph_" + t3 + "_posthog";
    })(e5), this._disabled = e5.disable_persistence || !!t2, this._storage = this._buildStorage(e5), this._splitStorage = this._resolveSplitStorage(e5), this.load(s2), this._markLoadedCrossTabFeatureFlagChangesPending(), e5.debug && In.info("Persistence loaded", e5.persistence, ls({}, this.props)), this.update_config(e5, e5, t2), this.save(), je) {
      const e6 = () => this.flush();
      Bn(je, "beforeunload", e6, { capture: false }), Bn(je, "pagehide", e6, { capture: false }), this._onStorage = (e7) => {
        if (this._splitStorageEligible && (!e7.storageArea || e7.storageArea === (null == je ? void 0 : je.localStorage)) && e7.key) if (e7.key !== this._name) {
          if (this._splitStorage) {
            const t3 = ma.find((t4) => e7.key === this._groupEntryName(t4));
            t3 && this._syncCrossTabFeatureFlagProperties(e7.key, t3);
          }
        } else this._syncCrossTabFeatureFlagProperties(e7.key, Qa);
      }, Bn(je, "storage", this._onStorage);
    }
  }
  markCrossTabFeatureFlagChanges(e5) {
    Object.entries(e5).forEach(([e6, t2]) => {
      const i2 = this._pendingCrossTabFeatureFlagChanges.get(e6);
      if (!Ya(e6) || true === i2) return;
      if (true === t2) return void this._setCrossTabFeatureFlagChangesPending(e6, true);
      const s2 = new Set(i2 || []);
      t2.forEach((e7) => s2.add(e7)), s2.size && this._setCrossTabFeatureFlagChangesPending(e6, s2);
    });
  }
  onCrossTabFeatureFlagChange(e5) {
    return this._crossTabFeatureFlagHandlers.add(e5), () => this._crossTabFeatureFlagHandlers.delete(e5);
  }
  destroy() {
    this._onStorage && je && (je.removeEventListener("storage", this._onStorage), this._onStorage = void 0), this._crossTabFeatureFlagHandlers.clear();
  }
  _syncCrossTabFeatureFlagProperties(e5, t2, i2 = true) {
    if (this._disabled) return false;
    let s2, r2;
    try {
      if (r2 = to._get(e5), bt(r2)) {
        const e6 = this._slotWriteState(t2);
        return e6.storageValue = null, t2 !== Qa && (e6.persisted = false), false;
      }
      s2 = tl(r2);
    } catch (e6) {
      return false;
    }
    const n2 = t2 === Qa ? s2 : to._parse(this._name);
    if (n2 && this._hasCrossTabFeatureFlagIdentityMismatch(n2)) return false;
    const o2 = this._mergeCrossTabFeatureFlagProperties(s2, t2, i2);
    return t2 === Qa && this._splitStorage && !el(this._partitionProps().main, s2) || this._rememberCrossTabStorageFingerprint(s2, t2, true, r2), o2;
  }
  _hasCrossTabFeatureFlagIdentityMismatch(e5) {
    const t2 = this.props[P], i2 = e5[P];
    return !ft(t2) && !ft(i2) && t2 !== i2;
  }
  _rememberCrossTabStorageFingerprint(e5, t2, i2, s2) {
    const r2 = this._slotWriteState(t2);
    r2.storageValue = s2, t2 !== Qa && (r2.persisted = i2);
    try {
      r2.fingerprint = this._entryFingerprint(e5, t2);
    } catch (e6) {
      r2.fingerprint = void 0;
    }
  }
  _mergeCrossTabFeatureFlagProperties(e5, t2, i2) {
    let s2 = false;
    return Ja.forEach((i3) => {
      var r2;
      const n2 = null === (r2 = Sa(i3)) || void 0 === r2 ? void 0 : r2.storageGroup;
      if (t2 === Qa && this._splitStorage && n2 || t2 !== Qa && n2 !== t2) return;
      const o2 = i3 in e5, a2 = this._mergePendingCrossTabFeatureFlagChanges(i3, o2 ? e5[i3] : void 0), l2 = this._pendingCrossTabFeatureFlagChanges.has(i3) ? i3 in this.props : o2;
      l2 === i3 in this.props && el(a2, this.props[i3]) || (l2 ? this._setProp(i3, a2, false) : this._deleteProp(i3, false), s2 = true);
    }), s2 && i2 && this._crossTabFeatureFlagHandlers.forEach((e6) => e6()), s2;
  }
  _reconcileCrossTabFeatureFlagPropertiesBeforeWrite() {
    if (!this._splitStorageEligible) return false;
    try {
      this._crossTabFeatureFlagIdentityMismatch = false;
      const e5 = to._get(this._name), t2 = this._slotWriteState(Qa);
      let i2, s2 = false, r2 = false;
      if (e5 !== t2.storageValue) if (bt(e5)) t2.storageValue = null;
      else {
        if (i2 = tl(e5), this._crossTabFeatureFlagIdentityMismatch = !this._localIdentityChangePending && this._hasCrossTabFeatureFlagIdentityMismatch(i2), this._crossTabFeatureFlagIdentityMismatch) return false;
        r2 = this._mergeCrossTabFeatureFlagProperties(i2, Qa, false), !this._splitStorage || el(this._partitionProps().main, i2) ? this._rememberCrossTabStorageFingerprint(i2, Qa, true, e5) : t2.storageValue = e5, s2 = true;
      }
      return this._splitStorage && ma.forEach((e6) => {
        const t3 = to._get(this._groupEntryName(e6)), n2 = this._slotWriteState(e6), o2 = i2 || {}, a2 = s2 && Ja.some((t4) => {
          var i3;
          return (null === (i3 = Sa(t4)) || void 0 === i3 ? void 0 : i3.storageGroup) === e6 && t4 in o2;
        });
        if (t3 === n2.storageValue && !a2) return;
        if (bt(t3)) return n2.storageValue = null, n2.persisted = false, void (a2 && (r2 = this._mergeCrossTabFeatureFlagProperties(o2, e6, false) || r2));
        const l2 = tl(t3);
        r2 = this._mergeCrossTabFeatureFlagProperties(l2, e6, false) || r2, this._rememberCrossTabStorageFingerprint(l2, e6, true, t3);
      }), r2;
    } catch (e5) {
      return false;
    }
  }
  _setCrossTabFeatureFlagChangesPending(e5, t2) {
    this._pendingCrossTabFeatureFlagChanges.set(e5, t2);
    const i2 = Sa(e5);
    (null == i2 ? void 0 : i2.volatile) || (this._slotWriteState((this._splitStorage ? null == i2 ? void 0 : i2.storageGroup : void 0) || Qa).fingerprint = void 0, this._markGroupDirty(e5));
  }
  _markAllCrossTabFeatureFlagChangesPending() {
    Ja.forEach((e5) => this._pendingCrossTabFeatureFlagChanges.set(e5, true));
  }
  _markLoadedCrossTabFeatureFlagChangesPending() {
    if (this._splitStorageEligible) try {
      const e5 = to._get(this._name), t2 = tl(e5);
      this._slotWriteState(Qa).storageValue = e5, Ja.forEach((e6) => {
        var i2;
        const s2 = this._splitStorage ? null === (i2 = Sa(e6)) || void 0 === i2 ? void 0 : i2.storageGroup : void 0, r2 = s2 ? to._get(this._groupEntryName(s2)) : null;
        if (s2) {
          const e7 = this._slotWriteState(s2);
          e7.storageValue = r2, e7.persisted = !bt(r2);
        }
        const n2 = s2 && !bt(r2) ? tl(r2) : t2;
        e6 in this.props ? this._markPendingCrossTabFeatureFlagChanges(e6, n2[e6], this.props[e6]) : e6 in n2 && this._setCrossTabFeatureFlagChangesPending(e6, true);
      });
    } catch (e5) {
    }
  }
  _mergePendingCrossTabFeatureFlagChanges(e5, t2) {
    const i2 = this._pendingCrossTabFeatureFlagChanges.get(e5);
    if (!i2) return t2;
    if (true === i2) return this.props[e5];
    if ("$active_feature_flags" === e5) {
      const s3 = new Set(_t(t2) ? t2 : []), r3 = new Set(_t(this.props[e5]) ? this.props[e5] : []);
      return i2.forEach((e6) => r3.has(e6) ? s3.add(e6) : s3.delete(e6)), Array.from(s3);
    }
    const s2 = gt(t2) ? ls({}, t2) : {}, r2 = gt(this.props[e5]) ? this.props[e5] : {};
    return i2.forEach((e6) => {
      e6 in r2 ? s2[e6] = r2[e6] : delete s2[e6];
    }), s2;
  }
  _markPendingCrossTabFeatureFlagChanges(e5, t2, i2) {
    if (!Ya(e5)) return;
    const s2 = this._pendingCrossTabFeatureFlagChanges.get(e5);
    if (true === s2) return;
    let r2 = t2;
    if (this._splitStorageEligible) try {
      var n2;
      const t3 = this._splitStorage ? null === (n2 = Sa(e5)) || void 0 === n2 ? void 0 : n2.storageGroup : void 0, i3 = t3 ? this._groupEntryName(t3) : this._name;
      r2 = tl(to._get(i3))[e5];
    } catch (e6) {
    }
    const o2 = new Set(s2 || []);
    if ("$active_feature_flags" === e5) {
      if (!ft(t2) && !_t(t2) || !ft(r2) && !_t(r2) || !_t(i2)) return void this._setCrossTabFeatureFlagChangesPending(e5, true);
      const s3 = new Set(t2 || []), n3 = new Set(r2 || []), a2 = new Set(i2);
      (/* @__PURE__ */ new Set([...s3, ...a2])).forEach((e6) => {
        s3.has(e6) !== a2.has(e6) && o2.add(e6);
      }), o2.forEach((e6) => {
        n3.has(e6) === a2.has(e6) && o2.delete(e6);
      });
    } else {
      if (!gt(i2)) return void (el(r2, i2) ? this._pendingCrossTabFeatureFlagChanges.delete(e5) : this._setCrossTabFeatureFlagChangesPending(e5, true));
      {
        if (!ft(t2) && !gt(t2) || ft(t2) && vt(i2) && ft(r2)) return void this._setCrossTabFeatureFlagChangesPending(e5, true);
        const s3 = gt(t2) ? t2 : {}, n3 = gt(r2) ? r2 : {};
        (/* @__PURE__ */ new Set([...Object.keys(s3), ...Object.keys(i2)])).forEach((e6) => {
          e6 in s3 == e6 in i2 && el(s3[e6], i2[e6]) || o2.add(e6);
        }), o2.forEach((e6) => {
          e6 in n3 == e6 in i2 && el(n3[e6], i2[e6]) && o2.delete(e6);
        });
      }
    }
    o2.size ? this._setCrossTabFeatureFlagChangesPending(e5, o2) : this._pendingCrossTabFeatureFlagChanges.delete(e5);
  }
  _saveDebounceMs() {
    var e5;
    const t2 = null === (e5 = this._config) || void 0 === e5 ? void 0 : e5.persistence_save_debounce_ms;
    return wt(t2) && t2 > 0 ? t2 : 0;
  }
  _rememberCurrentCookieProperties(e5) {
    if (this._config.cookieWinsOnConflict && "localstorage+cookie" === this._config.persistence.toLowerCase()) if (e5) try {
      const t2 = ao(e5, this._config.cookie_persisted_properties || []), i2 = co(t2, this._config.cookie_persisted_properties || []), s2 = JSON.stringify(t2) + "|" + JSON.stringify(i2), r2 = Xn._get(this._name) || void 0;
      r2 && ho(this._name, r2) === s2 && (this._lastSeenCookiePropertiesFingerprint = s2, this._lastSeenMainCookieValue = r2);
    } catch (e6) {
    }
    else try {
      const e6 = Xn._get(this._name) || void 0;
      this._lastSeenCookiePropertiesFingerprint = e6 ? ho(this._name, e6) : void 0, this._lastSeenMainCookieValue = e6;
    } catch (e6) {
    }
  }
  syncCookieProperties() {
    return this._syncCookieProperties(this._config);
  }
  _syncCookieProperties(e5, t2 = false) {
    if (this._disabled && !t2 || this._cookieSyncSuppressed || !e5.cookieWinsOnConflict || "localstorage+cookie" !== e5.persistence.toLowerCase()) return false;
    let i2;
    try {
      i2 = Xn._get(this._name) || void 0;
    } catch (e6) {
    }
    if (!i2 || i2 === this._lastSeenMainCookieValue) return false;
    const s2 = ho(this._name, i2);
    let c2;
    try {
      c2 = oo(JSON.parse(i2));
    } catch (e6) {
      return false;
    }
    if ((Xn._get(this._name) || void 0) !== i2) return false;
    this._lastSeenCookiePropertiesFingerprint = s2, this._lastSeenMainCookieValue = i2;
    const p2 = uo(this._name, i2), v2 = [...so, ...p2.properties], f2 = {};
    if (Object.keys(c2).forEach((e6) => {
      const t3 = c2[e6];
      (ft(t3) || bt(t3) || "" === t3 || "$user_state" === e6 && "anonymous" !== t3 && "identified" !== t3) && (f2[e6] = true, delete c2[e6]);
    }), vt(c2)) return false;
    const m2 = "distinct_id" in c2 || "anonymous" === c2.$user_state || "identified" === c2.$user_state, y2 = this.props, b2 = y2[P], S2 = y2[ge], w2 = $n({}, y2);
    [...so, ...e5.cookie_persisted_properties || []].forEach((e6) => {
      if (-1 !== v2.indexOf(e6) && !(e6 in c2) && !f2[e6] && (m2 || "distinct_id" !== e6 && "$user_state" !== e6)) {
        const t3 = w2[e6];
        (p2.isValid || -1 === so.indexOf(e6) || false !== t3 && 0 !== t3) && delete w2[e6];
      }
    }), this.props = $n(w2, c2), Ja.forEach((e6) => {
      const t3 = e6 in this.props;
      e6 in y2 === t3 && el(y2[e6], this.props[e6]) || (t3 ? this._markPendingCrossTabFeatureFlagChanges(e6, y2[e6], this.props[e6]) : this._setCrossTabFeatureFlagChangesPending(e6, true));
    }), !m2 || "$user_state" in c2 || "$user_state" in this.props || this._setProp(ge, Le);
    const E2 = this.props[P], C2 = this.props[ge];
    return !m2 || E2 === b2 && C2 === S2 || (this._localIdentityChangePending = true, this._cookieIdentityChangePending = true, vo._set(Ga(this._name), true), this._deleteProp(h), this._deleteProp(r), this._deleteProp(u), this._deleteProp(n), this._deleteProp(g), this._deleteProp(l), this._deleteProp(a), this._deleteProp(o), this._deleteProp(_), "anonymous" !== C2 || "identified" !== S2 && "anonymous" !== c2.$user_state && (ft(b2) || E2 === b2) || (il(this.props, c2), this._deleteProp(d)), "identified" === C2 ? this.props.$user_id = E2 : delete this.props.$user_id, this._deleteProp(T)), true;
  }
  consumeCookieIdentityChange() {
    const e5 = Ga(this._name), t2 = this._cookieIdentityChangePending || !!vo._get(e5);
    return this._cookieIdentityChangePending = false, t2 && vo._remove(e5), t2;
  }
  _beginCookieSyncSuppression(e5 = false) {
    return !(this._cookieSyncSuppressed || this._disabled && !e5 || !this._config.cookieWinsOnConflict || "localstorage+cookie" !== this._config.persistence.toLowerCase() || (this._cookieSyncSuppressed = true, 0));
  }
  _publishSuppressedCookieSnapshot() {
    this._cookieSyncSuppressed && (ft(this._pendingSaveTimer) || (clearTimeout(this._pendingSaveTimer), this._pendingSaveTimer = void 0), delete this._slotState[Qa], this._writeNow(true));
  }
  _endCookieSyncSuppression(e5 = true) {
    if (this._cookieSyncSuppressed) try {
      e5 ? this._publishSuppressedCookieSnapshot() : ft(this._pendingSaveTimer) || (clearTimeout(this._pendingSaveTimer), this._pendingSaveTimer = void 0);
    } finally {
      this._cookieSyncSuppressed = false;
    }
  }
  isDisabled() {
    return !!this._disabled;
  }
  _buildStorage(e5) {
    -1 === Va.indexOf(e5.persistence.toLowerCase()) && (In.critical("Unknown persistence type " + e5.persistence + "; falling back to localStorage+cookie"), e5.persistence = "localStorage+cookie");
    const t2 = ((e6 = [], t3 = false, i3 = () => false) => {
      const s3 = [...so, ...e6];
      return ls(ls({}, to), {}, { _rawText(e7) {
        return [Xn._get(e7), Xn._get(ro(e7)), to._get(e7)].join("\0");
      }, _parse(e7) {
        try {
          let n3, o2 = {};
          try {
            n3 = Xn._get(e7) || void 0, o2 = n3 ? oo(JSON.parse(n3)) : {};
          } catch (e8) {
          }
          const a2 = JSON.parse(to._get(e7) || "{}");
          let l2;
          if (t3) {
            const t4 = uo(e7, n3), i4 = [...so, ...t4.properties], c2 = {};
            Object.keys(o2).forEach((e8) => {
              const t5 = o2[e8];
              bt(t5) || "" === t5 || "$user_state" === e8 && "anonymous" !== t5 && "identified" !== t5 || (c2[e8] = t5);
            });
            const u2 = "distinct_id" in c2 || "anonymous" === c2.$user_state || "identified" === c2.$user_state;
            if (Object.keys(c2).length > 0) {
              var r3;
              const e8 = a2[P], n4 = null !== (r3 = a2.$user_state) && void 0 !== r3 ? r3 : Le;
              s3.forEach((e9) => {
                if (-1 !== i4.indexOf(e9) && !(e9 in o2) && (u2 || "distinct_id" !== e9 && "$user_state" !== e9)) {
                  const i5 = a2[e9];
                  (t4.isValid || -1 === so.indexOf(e9) || false !== i5 && 0 !== i5) && delete a2[e9];
                }
              }), !u2 || "$user_state" in o2 || "$user_state" in a2 || (a2[ge] = Le), !u2 || ("distinct_id" in c2 ? c2[P] : a2[P]) === e8 && ("$user_state" in c2 ? c2[ge] : a2[ge]) === n4 || (io.forEach((e9) => delete a2[e9]), "identified" === c2.$user_state && "distinct_id" in c2 ? a2.$user_id = c2[P] : delete a2.$user_id, "identified" !== c2.$user_state && (delete a2[ae], delete a2[d]), delete a2.__alias);
            }
            l2 = $n(a2, c2);
          } else l2 = $n(o2, a2);
          return i3() || to._set(e7, l2), l2;
        } catch (e8) {
        }
        return null;
      }, _set(i4, s4, r3, n3, o2, a2) {
        const l2 = to._set(i4, s4, void 0, void 0, a2);
        try {
          const c2 = ao(s4, e6);
          if (Object.keys(c2).length) {
            if (t3) {
              const t4 = ro(i4), u2 = co(c2, e6);
              if (Xn._set(t4, u2, r3, n3, o2, a2), Xn._get(t4) !== JSON.stringify(u2)) {
                Xn._remove(t4, n3);
                const e7 = ao(s4);
                return Xn._set(i4, e7, r3, n3, o2, a2), l2;
              }
            }
            Xn._set(i4, c2, r3, n3, o2, a2);
          }
        } catch (e7) {
          to._error(e7);
        }
        return l2;
      }, _remove(e7, t4) {
        try {
          null == je || je.localStorage.removeItem(e7), Xn._remove(e7, t4), Xn._remove(ro(e7), t4);
        } catch (e8) {
          to._error(e8);
        }
      } });
    })(e5.cookie_persisted_properties || [], e5.cookieWinsOnConflict, () => !!this._disabled);
    let i2, s2 = false, r2 = false;
    const n2 = e5.persistence.toLowerCase();
    return "localstorage" === n2 && to._is_supported() ? (i2 = to, r2 = true) : "localstorage+cookie" === n2 && t2._is_supported() ? (i2 = t2, r2 = true, s2 = true) : "sessionstorage" === n2 && vo._is_supported() ? i2 = vo : "memory" === n2 ? i2 = po : "cookie" === n2 && Xn._is_supported() ? (i2 = Xn, s2 = true) : t2._is_supported() ? (i2 = t2, r2 = true, s2 = true) : Xn._is_supported() ? (i2 = Xn, s2 = true) : i2 = po, this._splitStorageEligible = r2, this._storesIdentityInCookie = s2, i2;
  }
  _groupEntryName(e5) {
    return `${this._name}__${e5}`;
  }
  _resolveSplitStorage(e5) {
    return this._splitStorageEligible && !!e5.split_storage;
  }
  properties() {
    const e5 = {};
    return Rn(this.props, (t2, i2) => {
      const s2 = Sa(i2);
      if (!s2 || "event" === s2.exposure) {
        var r2;
        if (null == s2 || null === (r2 = s2.shouldSkipFromEventProperties) || void 0 === r2 ? void 0 : r2.call(s2, t2)) return;
        e5[i2] = t2;
      }
    }), e5;
  }
  load(e5 = false) {
    if (this._disabled && !e5) return;
    const t2 = this._config.cookieWinsOnConflict && "localstorage+cookie" === this._config.persistence.toLowerCase(), i2 = t2 ? to._parse(this._name) : null;
    let s2 = {};
    if (t2) try {
      s2 = oo(Xn._parse(this._name)), Rn(s2, (e6, t3) => {
        (ft(e6) || bt(e6) || "" === e6) && delete s2[t3];
      });
    } catch (e6) {
    }
    const r2 = this._storage._parse(this._name);
    if (r2 && (this.props = $n({}, r2)), this._splitStorage && this._loadGroupEntries(), t2 && r2) {
      var n2, o2;
      const e6 = null == i2 ? void 0 : i2[P], t3 = null !== (n2 = null == i2 ? void 0 : i2.$user_state) && void 0 !== n2 ? n2 : Le, a2 = r2[P], l2 = null !== (o2 = r2.$user_state) && void 0 !== o2 ? o2 : Le;
      if (a2 !== e6 || l2 !== t3) {
        this._cookieIdentityChangePending = true, this._disabled || vo._set(Ga(this._name), true);
        const i3 = $n({}, this.props);
        io.forEach((e7) => delete i3[e7]), "anonymous" !== l2 || "identified" !== t3 && "anonymous" !== s2.$user_state && (ft(e6) || a2 === e6) || (il(i3, s2), delete i3[d]), this.props = i3;
        const r3 = /* @__PURE__ */ new Set();
        io.forEach((e7) => {
          var t4;
          const i4 = null === (t4 = Sa(e7)) || void 0 === t4 ? void 0 : t4.storageGroup;
          i4 && r3.add(i4);
        }), r3.forEach((e7) => {
          if (this._disabled) return;
          const t4 = {};
          Rn(this.props, (i4, s3) => {
            var r4;
            (null === (r4 = Sa(s3)) || void 0 === r4 ? void 0 : r4.storageGroup) === e7 && (t4[s3] = i4);
          }), vt(t4) ? (to._remove(this._groupEntryName(e7)), this._slotState[e7] = {}) : to._set(this._groupEntryName(e7), t4) && (this._slotState[e7] = { persisted: true, fingerprint: this._entryFingerprint(t4, e7) });
        });
      }
    }
    vo._get(Ga(this._name)) && (this._cookieIdentityChangePending = true);
  }
  _loadGroupEntries() {
    for (const e5 of ma) {
      const t2 = to._parse(this._groupEntryName(e5));
      if (t2 && !vt(t2)) {
        const i2 = this._slotWriteState(e5);
        i2.persisted = true, this._mainCarriesGroupKey(e5) || (i2.fingerprint = this._entryFingerprint(t2, e5)), this._groupEntryIsStale(e5, t2) || $n(this.props, t2);
      }
    }
  }
  _mainCarriesGroupKey(e5) {
    return Object.keys(this.props).some((t2) => {
      var i2;
      return (null === (i2 = Sa(t2)) || void 0 === i2 ? void 0 : i2.storageGroup) === e5;
    });
  }
  _groupEntryIsStale(e5, t2) {
    const i2 = Wa[e5];
    if (!i2) return false;
    const s2 = t2[i2], r2 = this.props[i2];
    return wt(s2) && wt(r2) && r2 > s2;
  }
  refreshKey(e5) {
    this._refreshKeys([e5]);
  }
  _refreshKeys(e5) {
    if (this._disabled) return;
    let t2, i2 = false;
    const s2 = () => (i2 || (t2 = this._storage._parse(this._name), i2 = true), t2);
    e5.forEach((e6) => {
      var t3;
      if (this._metaIdentifierChangePending.has(e6)) return;
      const i3 = this._splitStorage ? null === (t3 = Sa(e6)) || void 0 === t3 ? void 0 : t3.storageGroup : void 0, r2 = i3 ? to._parse(this._groupEntryName(i3)) : s2();
      if (r2 && e6 in r2) this._setProp(e6, r2[e6], false);
      else {
        if (i3) {
          const t4 = s2();
          if (t4 && e6 in t4) return void this._setProp(e6, t4[e6], false);
        }
        this._deleteProp(e6, false);
      }
    });
  }
  refreshMetaIdentifiers() {
    if (this._disabled) return;
    const e5 = this._storageSnapshot();
    (ft(e5) || e5 !== this._metaIdentifierStorageSnapshot) && (this._refreshKeys(Za), this._rememberMetaIdentifierStorageSnapshot(e5));
  }
  _rememberMetaIdentifierStorageSnapshot(e5 = this._storageSnapshot()) {
    this._metaIdentifierStorageSnapshot = 0 === this._metaIdentifierChangePending.size ? e5 : void 0;
  }
  _storageSnapshot() {
    const e5 = this._storage._rawText ? this._storage._rawText(this._name) : this._storage._get(this._name);
    return mt(e5) ? e5 : void 0;
  }
  save() {
    if (this._disabled) return;
    const e5 = this._saveDebounceMs();
    e5 > 0 ? ft(this._pendingSaveTimer) && (this._pendingSaveTimer = setTimeout(() => {
      this._pendingSaveTimer = void 0, this._writeNow();
    }, e5)) : this._writeNow();
  }
  flush() {
    ft(this._pendingSaveTimer) || (clearTimeout(this._pendingSaveTimer), this._pendingSaveTimer = void 0, this._writeNow());
  }
  _writeNow(e5 = false) {
    if (this._disabled || this._cookieSyncSuppressed && !e5) return;
    e5 || (this.syncCookieProperties(), this._config.cookieWinsOnConflict && "localstorage+cookie" === this._config.persistence.toLowerCase() || this.refreshMetaIdentifiers());
    const t2 = !e5 && !this._storageMigrationInProgress;
    t2 || (this._crossTabFeatureFlagIdentityMismatch = false);
    const i2 = !!t2 && this._reconcileCrossTabFeatureFlagPropertiesBeforeWrite();
    if (this._crossTabFeatureFlagIdentityMismatch) return void (this._config.debug && In.warn("skipping persistence write because storage belongs to a different distinct ID"));
    if (this._splitStorage) return this._writeNowSplit(), void (i2 && this._crossTabFeatureFlagHandlers.forEach((e6) => e6()));
    const s2 = this._writeEntry(this._storage, this._name, this.props, Qa);
    "written" === s2 && this._rememberCurrentCookieProperties(this.props), "failed" !== s2 && (this._pendingCrossTabFeatureFlagChanges.clear(), this._localIdentityChangePending = false, this._metaIdentifierChangePending.clear()), "written" === s2 && this._rememberMetaIdentifierStorageSnapshot(), i2 && this._crossTabFeatureFlagHandlers.forEach((e6) => e6());
  }
  _writeNowSplit() {
    const { main: e5, groups: t2 } = this._partitionProps(), i2 = this._writeEntry(this._storage, this._name, e5, Qa);
    "written" === i2 && this._rememberCurrentCookieProperties(e5), "failed" !== i2 && (this._localIdentityChangePending = false, this._metaIdentifierChangePending.clear(), Ja.forEach((e6) => {
      var t3;
      (null === (t3 = Sa(e6)) || void 0 === t3 ? void 0 : t3.storageGroup) || this._pendingCrossTabFeatureFlagChanges.delete(e6);
    })), "written" === i2 && this._rememberMetaIdentifierStorageSnapshot();
    for (const e6 of ma) {
      var s2;
      const i3 = t2[e6];
      if (vt(i3) && !(null === (s2 = this._slotState[e6]) || void 0 === s2 ? void 0 : s2.persisted)) {
        Ja.forEach((t3) => {
          var i4;
          (null === (i4 = Sa(t3)) || void 0 === i4 ? void 0 : i4.storageGroup) === e6 && this._pendingCrossTabFeatureFlagChanges.delete(t3);
        });
        continue;
      }
      const r2 = this._writeEntry(to, this._groupEntryName(e6), i3, e6);
      "failed" !== r2 && Ja.forEach((t3) => {
        const i4 = Sa(t3);
        (null == i4 ? void 0 : i4.storageGroup) !== e6 || "written" !== r2 && i4.volatile || this._pendingCrossTabFeatureFlagChanges.delete(t3);
      });
    }
  }
  _partitionProps() {
    const e5 = {}, t2 = { flags: {}, surveys: {} };
    return Rn(this.props, (i2, s2) => {
      var r2;
      const n2 = null === (r2 = Sa(s2)) || void 0 === r2 ? void 0 : r2.storageGroup;
      n2 ? t2[n2][s2] = i2 : e5[s2] = i2;
    }), { main: e5, groups: t2 };
  }
  _entryFingerprint(e5, t2) {
    if (t2 === Qa) return JSON.stringify(e5) + "|" + this._expire_days + "|" + this._cross_subdomain + "|" + this._secure;
    const i2 = {};
    return Rn(e5, (e6, t3) => {
      var s2;
      i2[t3] = (null === (s2 = Sa(t3)) || void 0 === s2 ? void 0 : s2.volatile) ? "__volatile__" : e6;
    }), JSON.stringify(i2);
  }
  _writeEntry(e5, t2, i2, s2) {
    const r2 = this._slotWriteState(s2);
    if (s2 !== Qa && !r2.dirty && !ft(r2.fingerprint)) return "skipped";
    let n2;
    try {
      if (n2 = this._entryFingerprint(i2, s2), n2 === r2.fingerprint) return r2.dirty = false, "skipped";
    } catch (e6) {
      n2 = void 0;
    }
    return e5._set(t2, i2, this._expire_days, this._cross_subdomain, this._secure, this._config.debug) ? (r2.dirty = false, s2 !== Qa && (r2.persisted = true), ft(n2) || (r2.fingerprint = n2), this._splitStorageEligible && (r2.storageValue = to._get(t2)), "written") : (this._config.debug && In.warn(`failed to persist storage entry "${t2}"; will retry on next save`), "failed");
  }
  remove({ keepGroupEntries: e5 = false } = {}) {
    if (this._markAllCrossTabFeatureFlagChangesPending(), ft(this._pendingSaveTimer) || (clearTimeout(this._pendingSaveTimer), this._pendingSaveTimer = void 0), this._storage._remove(this._name, false), this._storage._remove(this._name, true), !e5 && this._ownsSplitStorage) for (const e6 of ma) to._remove(this._groupEntryName(e6));
    e5 ? delete this._slotState[Qa] : this._slotState = {}, this._lastSeenCookiePropertiesFingerprint = void 0, this._lastSeenMainCookieValue = void 0;
  }
  clear() {
    this.remove(), this.props = {};
  }
  register_once(e5, t2, i2) {
    if (gt(e5)) {
      this.syncCookieProperties(), ft(t2) && (t2 = "None"), this._expire_days = ft(i2) ? this._default_expiry : i2;
      let s2 = false;
      if (Rn(e5, (e6, i3) => {
        this.props.hasOwnProperty(i3) && this.props[i3] !== t2 || (this._setProp(i3, e6), s2 = true);
      }), s2) return this.save(), true;
    }
    return false;
  }
  register(e5, t2) {
    if (gt(e5)) {
      this.syncCookieProperties(), this._expire_days = ft(t2) ? this._default_expiry : t2;
      let i2 = false;
      if (Rn(e5, (t3, s2) => {
        e5.hasOwnProperty(s2) && (this.props[s2] !== t3 || gt(t3) || _t(t3)) && (this._setProp(s2, t3), i2 = true);
      }), i2) return this.save(), true;
    }
    return false;
  }
  unregister(e5) {
    this.syncCookieProperties();
    const t2 = "string" == typeof e5 ? [e5] : e5;
    let i2 = false;
    for (const e6 of t2) e6 in this.props && (this._deleteProp(e6), i2 = true);
    i2 && this.save();
  }
  update_campaign_params() {
    const e5 = null == Ge ? void 0 : Ge.URL;
    if (e5 === this._campaign_params_url) return;
    const t2 = Oa(this._config.custom_campaign_params, this._config.mask_personal_data_properties, this._config.custom_personal_data_properties), i2 = !vt(On(t2));
    return i2 && this.register(t2), this._campaign_params_url = e5, i2 ? t2 : void 0;
  }
  update_search_keyword() {
    this.register((function() {
      const e5 = null == Ge ? void 0 : Ge.referrer;
      return e5 ? Da(e5) : {};
    })());
  }
  update_referrer_info() {
    var e5;
    this.register_once({ $referrer: qa(), $referring_domain: (null == Ge ? void 0 : Ge.referrer) && (null === (e5 = Ea(Ge.referrer)) || void 0 === e5 ? void 0 : e5.host) || Ua }, void 0);
  }
  set_initial_person_info() {
    if (this.props.$initial_campaign_params || this.props.$initial_referrer_info) return;
    const e5 = Ha(this._config.mask_personal_data_properties, this._config.custom_personal_data_properties, this._config.disable_capture_url_hashes);
    this.register_once({ [be]: this._storesIdentityInCookie ? { r: Ka(e5.r), u: e5.u ? Ka(e5.u) : void 0 } : e5 }, void 0);
  }
  get_initial_props() {
    const e5 = {};
    Rn([ye, me], (t3) => {
      const i2 = this.props[t3];
      i2 && Rn(i2, function(t4, i3) {
        e5["$initial_" + lt(i3)] = t4;
      });
    });
    const t2 = this.props[be];
    if (t2) {
      const i2 = (function(e6, t3 = false) {
        const i3 = za(e6, t3), s2 = {};
        return Rn(i3, function(e7, t4) {
          s2[`$initial_${lt(t4)}`] = e7;
        }), s2;
      })(t2, this._config.disable_capture_url_hashes);
      $n(e5, i2);
    }
    return e5;
  }
  safe_merge(e5) {
    return Rn(this.props, function(t2, i2) {
      i2 in e5 || (e5[i2] = t2);
    }), e5;
  }
  update_config(e5, t2, i2) {
    const s2 = e5.persistence !== t2.persistence, r2 = !((e6, t3) => {
      if (e6.length !== t3.length) return false;
      const i3 = [...e6].sort(), s3 = [...t3].sort();
      return i3.every((e7, t4) => e7 === s3[t4]);
    })(e5.cookie_persisted_properties || [], t2.cookie_persisted_properties || []), n2 = s2 || r2, o2 = e5.cookieWinsOnConflict !== t2.cookieWinsOnConflict, a2 = e5.disable_persistence || !!i2, l2 = !!this._disabled && !a2;
    a2 || this._syncCookieProperties(t2, l2), this._config = e5, !a2 && (s2 || r2 || o2) && (this._lastSeenCookiePropertiesFingerprint = void 0, this._lastSeenMainCookieValue = void 0, this._syncCookieProperties(ls(ls({}, e5), {}, { cookie_persisted_properties: t2.cookie_persisted_properties }), l2));
    const c2 = n2 || o2 ? this._buildStorage(e5) : this._storage;
    this._truncateExistingPersonInfoForCookie();
    const u2 = this._resolveSplitStorage(e5), d2 = n2 || u2 !== this._splitStorage, h2 = !a2 && (d2 || e5.cross_subdomain_cookie !== this._cross_subdomain || e5.secure_cookie !== this._secure) && this._beginCookieSyncSuppression(l2);
    this._storageMigrationInProgress = d2;
    try {
      if (this._default_expiry = this._expire_days = e5.cookie_expiration, this.set_disabled(a2), this.set_cross_subdomain(e5.cross_subdomain_cookie), this.set_secure(e5.secure_cookie), d2) {
        const e6 = this.props;
        this.clear(), this._storage = c2, this._splitStorage = u2, this.props = e6, this.save();
      } else o2 && (this._storage = c2, a2 || (delete this._slotState[Qa], this._writeNow()));
    } finally {
      this._storageMigrationInProgress = false, h2 && this._endCookieSyncSuppression();
    }
  }
  _truncateExistingPersonInfoForCookie() {
    const e5 = this.props[be];
    if (!this._storesIdentityInCookie || !gt(e5) || "string" != typeof e5.r) return;
    const t2 = Ka(e5.r), i2 = "string" == typeof e5.u ? Ka(e5.u) : e5.u;
    t2 === e5.r && i2 === e5.u || this._setProp(be, ls(ls({}, e5), {}, { r: t2, u: i2 }));
  }
  set_disabled(e5) {
    this._disabled = e5, this._disabled ? this.remove() : this.save();
  }
  set_cross_subdomain(e5) {
    e5 !== this._cross_subdomain && (this._cross_subdomain = e5, this.remove({ keepGroupEntries: true }), this.save());
  }
  set_secure(e5) {
    e5 !== this._secure && (this._secure = e5, this.remove({ keepGroupEntries: true }), this.save());
  }
  set_event_timer(e5, t2) {
    const i2 = this.props.__timers || {};
    i2[e5] = t2, this._setProp(D, i2), this.save();
  }
  remove_event_timer(e5) {
    const t2 = this.props.__timers || {}, i2 = t2[e5];
    return ft(i2) || (delete t2[e5], this._setProp(D, t2), this.save()), i2;
  }
  get_property(e5) {
    return this.props[e5];
  }
  set_property(e5, t2) {
    this._setProp(e5, t2), this.save();
  }
  _setProp(e5, t2, i2 = true) {
    var s2;
    const r2 = this.props[e5];
    this.props[e5] = t2, i2 && ("distinct_id" !== e5 && "$user_state" !== e5 || r2 === t2 || (this._localIdentityChangePending = true), Xa(e5) && !el(r2, t2) && this._metaIdentifierChangePending.add(e5), this._markPendingCrossTabFeatureFlagChanges(e5, r2, t2), (null === (s2 = Sa(e5)) || void 0 === s2 ? void 0 : s2.volatile) || this._markGroupDirty(e5));
  }
  _deleteProp(e5, t2 = true) {
    delete this.props[e5], t2 && (Ya(e5) && this._setCrossTabFeatureFlagChangesPending(e5, true), Xa(e5) && this._metaIdentifierChangePending.add(e5), this._markGroupDirty(e5));
  }
  _markGroupDirty(e5) {
    var t2;
    const i2 = null === (t2 = Sa(e5)) || void 0 === t2 ? void 0 : t2.storageGroup;
    i2 && (this._slotWriteState(i2).dirty = true);
  }
  _slotWriteState(e5) {
    return this._slotState[e5] || (this._slotState[e5] = {});
  }
};
var rl = { GZipJS: "gzip-js", Base64: "base64" };
var nl = { Activation: "events", Cancellation: "cancelEvents" };
var cl = { Popover: "popover", API: "api", Widget: "widget", ExternalSurvey: "external_survey" };
var _l = { SHOWN: "survey shown", DISMISSED: "survey dismissed", SENT: "survey sent", ABANDONED: "survey abandoned" };
var pl = { SURVEY_ID: "$survey_id", SURVEY_NAME: "$survey_name", SURVEY_RESPONSE: "$survey_response", SURVEY_ITERATION: "$survey_iteration", SURVEY_ITERATION_START_DATE: "$survey_iteration_start_date", SURVEY_PARTIALLY_COMPLETED: "$survey_partially_completed", SURVEY_SUBMISSION_ID: "$survey_submission_id", SURVEY_QUESTIONS: "$survey_questions", SURVEY_COMPLETED: "$survey_completed", PRODUCT_TOUR_ID: "$product_tour_id", SURVEY_LAST_SEEN_DATE: "$survey_last_seen_date", SURVEY_LANGUAGE: "$survey_language" };
var gl = { Popover: "popover", Inline: "inline" };
function vl(e5) {
  let t2 = true;
  return { dispose() {
    if (t2) {
      t2 = false;
      const i2 = e5();
      i2 && pt(i2.then) && i2.then(void 0, () => {
      });
    }
  } };
}
var ml = { SHOWN: "product tour shown", DISMISSED: "product tour dismissed", COMPLETED: "product tour completed", STEP_SHOWN: "product tour step shown", STEP_COMPLETED: "product tour step completed", BUTTON_CLICKED: "product tour button clicked", STEP_SELECTOR_FAILED: "product tour step selector failed", BANNER_CONTAINER_SELECTOR_FAILED: "product tour banner container selector failed", BANNER_ACTION_CLICKED: "product tour banner action clicked" };
var yl = { TOUR_ID: "$product_tour_id", TOUR_NAME: "$product_tour_name", TOUR_ITERATION: "$product_tour_iteration", TOUR_RENDER_REASON: "$product_tour_render_reason", TOUR_STEP_ID: "$product_tour_step_id", TOUR_STEP_ORDER: "$product_tour_step_order", TOUR_STEP_TYPE: "$product_tour_step_type", TOUR_DISMISS_REASON: "$product_tour_dismiss_reason", TOUR_BUTTON_TEXT: "$product_tour_button_text", TOUR_BUTTON_ACTION: "$product_tour_button_action", TOUR_BUTTON_LINK: "$product_tour_button_link", TOUR_BUTTON_TOUR_ID: "$product_tour_button_tour_id", TOUR_STEPS_COUNT: "$product_tour_steps_count", TOUR_STEP_SELECTOR: "$product_tour_step_selector", TOUR_STEP_SELECTOR_FOUND: "$product_tour_step_selector_found", TOUR_STEP_ELEMENT_TAG: "$product_tour_step_element_tag", TOUR_STEP_ELEMENT_ID: "$product_tour_step_element_id", TOUR_STEP_ELEMENT_CLASSES: "$product_tour_step_element_classes", TOUR_STEP_ELEMENT_TEXT: "$product_tour_step_element_text", TOUR_ERROR: "$product_tour_error", TOUR_MATCHES_COUNT: "$product_tour_matches_count", TOUR_FAILURE_PHASE: "$product_tour_failure_phase", TOUR_WAITED_FOR_ELEMENT: "$product_tour_waited_for_element", TOUR_WAIT_DURATION_MS: "$product_tour_wait_duration_ms", TOUR_BANNER_SELECTOR: "$product_tour_banner_selector", TOUR_LINKED_SURVEY_ID: "$product_tour_linked_survey_id", USE_MANUAL_SELECTOR: "$use_manual_selector", INFERENCE_DATA_PRESENT: "$inference_data_present", TOUR_LAST_SEEN_DATE: "$product_tour_last_seen_date", TOUR_TYPE: "$product_tour_type" };
var bl = Fn("[RateLimiter]");
var Sl = class {
  constructor(e5) {
    this.serverLimits = {}, this.lastEventRateLimited = false, this.checkForLimiting = (e6) => {
      const t2 = e6.text;
      if (t2 && t2.length) try {
        (JSON.parse(t2).quota_limited || []).forEach((e7) => {
          bl.info(`${e7 || "events"} is quota limited.`), this.serverLimits[e7] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
        });
      } catch (e7) {
        return void bl.warn(`could not rate limit - continuing. Error: "${null == e7 ? void 0 : e7.message}"`, { text: t2 });
      }
    }, this.instance = e5, this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
  }
  get captureEventsPerSecond() {
    var e5;
    return (null === (e5 = this.instance.config.rate_limiting) || void 0 === e5 ? void 0 : e5.events_per_second) || 10;
  }
  get captureEventsBurstLimit() {
    var e5;
    return Math.max((null === (e5 = this.instance.config.rate_limiting) || void 0 === e5 ? void 0 : e5.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond);
  }
  clientRateLimitContext(e5 = false) {
    var t2, i2, s2;
    const { captureEventsBurstLimit: r2, captureEventsPerSecond: n2 } = this, o2 = (/* @__PURE__ */ new Date()).getTime(), a2 = null !== (t2 = null === (i2 = this.instance.persistence) || void 0 === i2 ? void 0 : i2.get_property("$capture_rate_limit")) && void 0 !== t2 ? t2 : { tokens: r2, last: o2 };
    a2.tokens += Math.max(0, o2 - a2.last) / 1e3 * n2, a2.last = Math.max(a2.last, o2), a2.tokens > r2 && (a2.tokens = r2);
    const l2 = 1 > a2.tokens;
    if (l2 || e5 || (a2.tokens = Math.max(0, a2.tokens - 1)), l2 && !e5) {
      const e6 = (wt(a2.dropped) ? a2.dropped : 0) + 1;
      a2.dropped = e6, !this.lastEventRateLimited && this._captureWarning(e6) && (a2.dropped = 0);
    }
    return this.lastEventRateLimited = l2, null === (s2 = this.instance.persistence) || void 0 === s2 || s2.set_property("$capture_rate_limit", a2), { isRateLimited: l2, remainingTokens: a2.tokens };
  }
  _isPropertyAllowed(e5) {
    const t2 = this.instance.config.property_denylist;
    return !_t(t2) || !t2.includes(e5);
  }
  _triggeringPage() {
    var e5;
    if (this._isPropertyAllowed("$current_url") && this._isPropertyAllowed("$pathname") && (null == Ke ? void 0 : Ke.pathname)) return `${null !== (e5 = Ke.origin) && void 0 !== e5 ? e5 : ""}${Ke.pathname}`;
  }
  _captureWarning(e5) {
    var t2, i2;
    const { captureEventsBurstLimit: s2, captureEventsPerSecond: r2 } = this, n2 = this._triggeringPage(), o2 = this._isPropertyAllowed("$session_id") ? null === (t2 = (i2 = this.instance).get_session_id) || void 0 === t2 ? void 0 : t2.call(i2) : void 0, a2 = [`${e5} event(s) dropped since the last warning`, n2 ? `triggered on ${n2}` : void 0, o2 ? `session ${o2}` : void 0].filter(Boolean).join(", ");
    return !!this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: `posthog-js client rate limited: ${a2}. Config is set to ${r2} events per second and ${s2} events burst limit.` }, { skip_client_rate_limiting: true });
  }
  isServerRateLimited(e5) {
    const t2 = this.serverLimits[e5 || "events"] || false;
    return false !== t2 && (/* @__PURE__ */ new Date()).getTime() < t2;
  }
};
var wl = Fn("[RemoteConfig]");
var El = class {
  constructor(e5) {
    this._instance = e5;
  }
  get remoteConfig() {
    var e5;
    return null === (e5 = tt._POSTHOG_REMOTE_CONFIG) || void 0 === e5 || null === (e5 = e5[this._instance.config.token]) || void 0 === e5 ? void 0 : e5.config;
  }
  _loadRemoteConfigJs(e5) {
    var t2, i2, s2;
    (null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.loadExternalDependency) ? null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this._instance, "remote-config", () => e5(this.remoteConfig)) : e5();
  }
  _loadRemoteConfigJSON(e5) {
    this._instance._send_request({ method: "GET", url: this._instance.requestRouter.endpointFor("assets", `/array/${this._instance.config.token}/config`), callback: e5 });
  }
  load() {
    try {
      if (this.remoteConfig) return wl.info("Using preloaded remote config", this.remoteConfig), void this._onRemoteConfig(this.remoteConfig);
      if (this._instance._shouldDisableFlags()) return void wl.warn("Remote config is disabled. Falling back to local config.");
      this._loadRemoteConfigJs((e5) => {
        if (!e5) return wl.info("No config found after loading remote JS config. Falling back to JSON."), void this._loadRemoteConfigJSON((e6) => {
          this._onRemoteConfig(e6.json, e6);
        });
        this._onRemoteConfig(e5);
      });
    } catch (e5) {
      wl.error("Error loading remote config", e5), this._onRemoteConfig();
    }
  }
  _onRemoteConfig(e5, t2) {
    !e5 && t2 && (0 === t2.statusCode ? t2.error || wl.warn("Failed to fetch remote config from PostHog.") : wl.error("Failed to fetch remote config from PostHog."));
    try {
      this._instance._onRemoteConfig(e5 ? { ok: true, config: e5 } : { ok: false });
    } catch (e6) {
      wl.error("Error applying remote config", e6);
    }
    if (false !== (null == e5 ? void 0 : e5.hasFeatureFlags) && !this._instance.config.advanced_disable_feature_flags_on_first_load) try {
      var i2;
      null === (i2 = this._instance.featureFlags) || void 0 === i2 || i2.ensureFlagsLoaded();
    } catch (e6) {
      wl.error("Error loading feature flags", e6);
    }
  }
};
var kl = Uint8Array;
var xl = Uint16Array;
var Pl = Uint32Array;
var Il = new kl([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var Fl = new kl([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var Tl = new kl([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var Rl = function(e5, t2) {
  for (var i2 = new xl(31), s2 = 0; 31 > s2; ++s2) i2[s2] = t2 += 1 << e5[s2 - 1];
  var r2 = new Pl(i2[30]);
  for (s2 = 1; 30 > s2; ++s2) for (var n2 = i2[s2]; i2[s2 + 1] > n2; ++n2) r2[n2] = n2 - i2[s2] << 5 | s2;
  return [i2, r2];
};
var $l = Rl(Il, 2);
var Al = $l[1];
$l[0][28] = 258, Al[258] = 28;
for (Ml = Rl(Fl, 0)[1], Ol = new xl(32768), Ll = 0; 32768 > Ll; ++Ll) {
  Dl = (43690 & Ll) >>> 1 | (21845 & Ll) << 1;
  Ol[Ll] = ((65280 & (Dl = (61680 & (Dl = (52428 & Dl) >>> 2 | (13107 & Dl) << 2)) >>> 4 | (3855 & Dl) << 4)) >>> 8 | (255 & Dl) << 8) >>> 1;
}
var Dl;
var Ml;
var Ol;
var Ll;
var Nl = function(e5, t2, i2) {
  for (var s2 = e5.length, r2 = 0, n2 = new xl(t2); s2 > r2; ++r2) ++n2[e5[r2] - 1];
  var o2, a2 = new xl(t2);
  for (r2 = 0; t2 > r2; ++r2) a2[r2] = a2[r2 - 1] + n2[r2 - 1] << 1;
  if (i2) {
    o2 = new xl(1 << t2);
    var l2 = 15 - t2;
    for (r2 = 0; s2 > r2; ++r2) if (e5[r2]) for (var c2 = r2 << 4 | e5[r2], u2 = t2 - e5[r2], d2 = a2[e5[r2] - 1]++ << u2, h2 = d2 | (1 << u2) - 1; h2 >= d2; ++d2) o2[Ol[d2] >>> l2] = c2;
  } else for (o2 = new xl(s2), r2 = 0; s2 > r2; ++r2) o2[r2] = Ol[a2[e5[r2] - 1]++] >>> 15 - e5[r2];
  return o2;
};
var Bl = new kl(288);
for (Ll = 0; 144 > Ll; ++Ll) Bl[Ll] = 8;
for (Ll = 144; 256 > Ll; ++Ll) Bl[Ll] = 9;
for (Ll = 256; 280 > Ll; ++Ll) Bl[Ll] = 7;
for (Ll = 280; 288 > Ll; ++Ll) Bl[Ll] = 8;
var Ul = new kl(32);
for (Ll = 0; 32 > Ll; ++Ll) Ul[Ll] = 5;
var ql = Nl(Bl, 9, 0);
var Hl = Nl(Ul, 5, 0);
var zl = function(e5) {
  return (e5 / 8 | 0) + (7 & e5 && 1);
};
var jl = function(e5, t2, i2) {
  (null == t2 || 0 > t2) && (t2 = 0), (null == i2 || i2 > e5.length) && (i2 = e5.length);
  var s2 = new (e5 instanceof xl ? xl : e5 instanceof Pl ? Pl : kl)(i2 - t2);
  return s2.set(e5.subarray(t2, i2)), s2;
};
var Wl = function(e5, t2, i2) {
  var s2 = t2 / 8 | 0;
  e5[s2] |= i2 <<= 7 & t2, e5[s2 + 1] |= i2 >>> 8;
};
var Vl = function(e5, t2, i2) {
  var s2 = t2 / 8 | 0;
  e5[s2] |= i2 <<= 7 & t2, e5[s2 + 1] |= i2 >>> 8, e5[s2 + 2] |= i2 >>> 16;
};
var Gl = function(e5, t2) {
  for (var i2 = [], s2 = 0; e5.length > s2; ++s2) e5[s2] && i2.push({ s: s2, f: e5[s2] });
  var r2 = i2.length, n2 = i2.slice();
  if (!r2) return [new kl(0), 0];
  if (1 == r2) {
    var o2 = new kl(i2[0].s + 1);
    return o2[i2[0].s] = 1, [o2, 1];
  }
  i2.sort(function(e6, t3) {
    return e6.f - t3.f;
  }), i2.push({ s: -1, f: 25001 });
  var a2 = i2[0], l2 = i2[1], c2 = 0, u2 = 1, d2 = 2;
  for (i2[0] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 }; u2 != r2 - 1; ) a2 = i2[i2[d2].f > i2[c2].f ? c2++ : d2++], l2 = i2[c2 != u2 && i2[d2].f > i2[c2].f ? c2++ : d2++], i2[u2++] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 };
  var h2 = n2[0].s;
  for (s2 = 1; r2 > s2; ++s2) n2[s2].s > h2 && (h2 = n2[s2].s);
  var _2 = new xl(h2 + 1), p2 = Kl(i2[u2 - 1], _2, 0);
  if (p2 > t2) {
    s2 = 0;
    var g2 = 0, v2 = p2 - t2, f2 = 1 << v2;
    for (n2.sort(function(e6, t3) {
      return _2[t3.s] - _2[e6.s] || e6.f - t3.f;
    }); r2 > s2; ++s2) {
      var m2 = n2[s2].s;
      if (t2 >= _2[m2]) break;
      g2 += f2 - (1 << p2 - _2[m2]), _2[m2] = t2;
    }
    for (g2 >>>= v2; g2 > 0; ) {
      var y2 = n2[s2].s;
      t2 > _2[y2] ? g2 -= 1 << t2 - _2[y2]++ - 1 : ++s2;
    }
    for (; s2 >= 0 && g2; --s2) {
      var b2 = n2[s2].s;
      _2[b2] == t2 && (--_2[b2], ++g2);
    }
    p2 = t2;
  }
  return [new kl(_2), p2];
};
var Kl = function(e5, t2, i2) {
  return -1 == e5.s ? Math.max(Kl(e5.l, t2, i2 + 1), Kl(e5.r, t2, i2 + 1)) : t2[e5.s] = i2;
};
var Ql = function(e5) {
  for (var t2 = e5.length; t2 && !e5[--t2]; ) ;
  for (var i2 = new xl(++t2), s2 = 0, r2 = e5[0], n2 = 1, o2 = function(e6) {
    i2[s2++] = e6;
  }, a2 = 1; t2 >= a2; ++a2) if (e5[a2] == r2 && a2 != t2) ++n2;
  else {
    if (!r2 && n2 > 2) {
      for (; n2 > 138; n2 -= 138) o2(32754);
      n2 > 2 && (o2(n2 > 10 ? n2 - 11 << 5 | 28690 : n2 - 3 << 5 | 12305), n2 = 0);
    } else if (n2 > 3) {
      for (o2(r2), --n2; n2 > 6; n2 -= 6) o2(8304);
      n2 > 2 && (o2(n2 - 3 << 5 | 8208), n2 = 0);
    }
    for (; n2--; ) o2(r2);
    n2 = 1, r2 = e5[a2];
  }
  return [i2.subarray(0, s2), t2];
};
var Jl = function(e5, t2) {
  for (var i2 = 0, s2 = 0; t2.length > s2; ++s2) i2 += e5[s2] * t2[s2];
  return i2;
};
var Yl = function(e5, t2, i2) {
  var s2 = i2.length, r2 = zl(t2 + 2);
  e5[r2] = 255 & s2, e5[r2 + 1] = s2 >>> 8, e5[r2 + 2] = 255 ^ e5[r2], e5[r2 + 3] = 255 ^ e5[r2 + 1];
  for (var n2 = 0; s2 > n2; ++n2) e5[r2 + n2 + 4] = i2[n2];
  return 8 * (r2 + 4 + s2);
};
var Zl = function(e5, t2, i2, s2, r2, n2, o2, a2, l2, c2, u2) {
  Wl(t2, u2++, i2), ++r2[256];
  for (var d2 = Gl(r2, 15), h2 = d2[0], _2 = d2[1], p2 = Gl(n2, 15), g2 = p2[0], v2 = p2[1], f2 = Ql(h2), m2 = f2[0], y2 = f2[1], b2 = Ql(g2), S2 = b2[0], w2 = b2[1], E2 = new xl(19), C2 = 0; m2.length > C2; ++C2) E2[31 & m2[C2]]++;
  for (C2 = 0; S2.length > C2; ++C2) E2[31 & S2[C2]]++;
  for (var k2 = Gl(E2, 7), x2 = k2[0], P2 = k2[1], I2 = 19; I2 > 4 && !x2[Tl[I2 - 1]]; --I2) ;
  var F2, T2, R2, A2, M2 = c2 + 5 << 3, O2 = Jl(r2, Bl) + Jl(n2, Ul) + o2, L2 = Jl(r2, h2) + Jl(n2, g2) + o2 + 14 + 3 * I2 + Jl(E2, x2) + (2 * E2[16] + 3 * E2[17] + 7 * E2[18]);
  if (O2 >= M2 && L2 >= M2) return Yl(t2, u2, e5.subarray(l2, l2 + c2));
  if (Wl(t2, u2, 1 + (O2 > L2)), u2 += 2, O2 > L2) {
    F2 = Nl(h2, _2, 0), T2 = h2, R2 = Nl(g2, v2, 0), A2 = g2;
    var D2 = Nl(x2, P2, 0);
    for (Wl(t2, u2, y2 - 257), Wl(t2, u2 + 5, w2 - 1), Wl(t2, u2 + 10, I2 - 4), u2 += 14, C2 = 0; I2 > C2; ++C2) Wl(t2, u2 + 3 * C2, x2[Tl[C2]]);
    u2 += 3 * I2;
    for (var N2 = [m2, S2], B2 = 0; 2 > B2; ++B2) {
      var U2 = N2[B2];
      for (C2 = 0; U2.length > C2; ++C2) Wl(t2, u2, D2[q2 = 31 & U2[C2]]), u2 += x2[q2], q2 > 15 && (Wl(t2, u2, U2[C2] >>> 5 & 127), u2 += U2[C2] >>> 12);
    }
  } else F2 = ql, T2 = Bl, R2 = Hl, A2 = Ul;
  for (C2 = 0; a2 > C2; ++C2) if (s2[C2] > 255) {
    var q2;
    Vl(t2, u2, F2[257 + (q2 = s2[C2] >>> 18 & 31)]), u2 += T2[q2 + 257], q2 > 7 && (Wl(t2, u2, s2[C2] >>> 23 & 31), u2 += Il[q2]);
    var H2 = 31 & s2[C2];
    Vl(t2, u2, R2[H2]), u2 += A2[H2], H2 > 3 && (Vl(t2, u2, s2[C2] >>> 5 & 8191), u2 += Fl[H2]);
  } else Vl(t2, u2, F2[s2[C2]]), u2 += T2[s2[C2]];
  return Vl(t2, u2, F2[256]), u2 + T2[256];
};
var Xl = new Pl([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var ec = new kl(0);
var tc = (function() {
  for (var e5 = new Pl(256), t2 = 0; 256 > t2; ++t2) {
    for (var i2 = t2, s2 = 9; --s2; ) i2 = (1 & i2 && 3988292384) ^ i2 >>> 1;
    e5[t2] = i2;
  }
  return e5;
})();
var ic = function(e5, t2, i2) {
  for (; i2; ++t2) e5[t2] = i2, i2 >>>= 8;
};
function sc(e5, t2) {
  void 0 === t2 && (t2 = {});
  var i2 = /* @__PURE__ */ (function() {
    var e6 = 4294967295;
    return { p(t3) {
      for (var i3 = e6, s3 = 0; t3.length > s3; ++s3) i3 = tc[255 & i3 ^ t3[s3]] ^ i3 >>> 8;
      e6 = i3;
    }, d() {
      return 4294967295 ^ e6;
    } };
  })(), s2 = e5.length;
  i2.p(e5);
  var r2, n2, o2, a2, l2, c2, u2 = (a2 = 10 + ((r2 = t2).filename && r2.filename.length + 1 || 0), l2 = 8, (function(e6, t3, i3, s3, r3, n3) {
    var o3 = e6.length, a3 = new kl(s3 + o3 + 5 * (1 + Math.floor(o3 / 7e3)) + r3), l3 = a3.subarray(s3, a3.length - r3), c3 = 0;
    if (!t3 || 8 > o3) for (var u3 = 0; o3 >= u3; u3 += 65535) {
      var d3 = u3 + 65535;
      o3 > d3 ? c3 = Yl(l3, c3, e6.subarray(u3, d3)) : (l3[u3] = n3, c3 = Yl(l3, c3, e6.subarray(u3, o3)));
    }
    else {
      for (var h2 = Xl[t3 - 1], _2 = h2 >>> 13, p2 = 8191 & h2, g2 = (1 << i3) - 1, v2 = new xl(32768), f2 = new xl(g2 + 1), m2 = Math.ceil(i3 / 3), y2 = 2 * m2, b2 = function(t4) {
        return (e6[t4] ^ e6[t4 + 1] << m2 ^ e6[t4 + 2] << y2) & g2;
      }, S2 = new Pl(25e3), w2 = new xl(288), E2 = new xl(32), C2 = 0, k2 = 0, x2 = (u3 = 0, 0), P2 = 0, I2 = 0; o3 > u3; ++u3) {
        var F2 = b2(u3), T2 = 32767 & u3, R2 = f2[F2];
        if (v2[T2] = R2, f2[F2] = T2, u3 >= P2) {
          var A2 = o3 - u3;
          if ((C2 > 7e3 || x2 > 24576) && A2 > 423) {
            c3 = Zl(e6, l3, 0, S2, w2, E2, k2, x2, I2, u3 - I2, c3), x2 = C2 = k2 = 0, I2 = u3;
            for (var M2 = 0; 286 > M2; ++M2) w2[M2] = 0;
            for (M2 = 0; 30 > M2; ++M2) E2[M2] = 0;
          }
          var O2 = 2, L2 = 0, D2 = p2, N2 = T2 - R2 & 32767;
          if (A2 > 2 && F2 == b2(u3 - N2)) for (var B2 = Math.min(_2, A2) - 1, U2 = Math.min(32767, u3), q2 = Math.min(258, A2); U2 >= N2 && --D2 && T2 != R2; ) {
            if (e6[u3 + O2] == e6[u3 + O2 - N2]) {
              for (var H2 = 0; q2 > H2 && e6[u3 + H2] == e6[u3 + H2 - N2]; ++H2) ;
              if (H2 > O2) {
                if (O2 = H2, L2 = N2, H2 > B2) break;
                var z2 = Math.min(N2, H2 - 2), j2 = 0;
                for (M2 = 0; z2 > M2; ++M2) {
                  var W2 = u3 - N2 + M2 + 32768 & 32767, V2 = W2 - v2[W2] + 32768 & 32767;
                  V2 > j2 && (j2 = V2, R2 = W2);
                }
              }
            }
            N2 += (T2 = R2) - (R2 = v2[T2]) + 32768 & 32767;
          }
          if (L2) {
            S2[x2++] = 268435456 | Al[O2] << 18 | Ml[L2];
            var G2 = 31 & Al[O2], K2 = 31 & Ml[L2];
            k2 += Il[G2] + Fl[K2], ++w2[257 + G2], ++E2[K2], P2 = u3 + O2, ++C2;
          } else S2[x2++] = e6[u3], ++w2[e6[u3]];
        }
      }
      c3 = Zl(e6, l3, n3, S2, w2, E2, k2, x2, I2, u3 - I2, c3), n3 || (c3 = Yl(l3, c3, ec));
    }
    return jl(a3, 0, s3 + zl(c3) + r3);
  })(n2 = e5, null == (o2 = t2).level ? 6 : o2.level, null == o2.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(n2.length)))) : 12 + o2.mem, a2, l2, !c2)), d2 = u2.length;
  return (function(e6, t3) {
    var i3 = t3.filename;
    if (e6[0] = 31, e6[1] = 139, e6[2] = 8, e6[8] = 2 > t3.level ? 4 : 9 == t3.level ? 2 : 0, e6[9] = 3, 0 != t3.mtime && ic(e6, 4, Math.floor(new Date(t3.mtime || Date.now()) / 1e3)), i3) {
      e6[3] = 8;
      for (var s3 = 0; i3.length >= s3; ++s3) e6[s3 + 10] = i3.charCodeAt(s3);
    }
  })(u2, t2), ic(u2, d2 - 8, i2.d()), ic(u2, d2 - 4, s2), u2;
}
var rc = !!Je || !!Qe;
var nc = /* @__PURE__ */ new WeakMap();
var oc = "text/plain";
var ac = 0;
var lc = false;
var cc = (e5, t2) => {
  const [i2, s2] = e5.split("#"), [r2, n2] = i2.split("?");
  if (!n2) return e5;
  const o2 = n2.split("&").filter((e6) => e6.split("=")[0] !== t2).join("&");
  return `${r2}${o2 ? `?${o2}` : ""}${s2 ? `#${s2}` : ""}`;
};
var uc = (e5, t2, i2 = true) => {
  var s2;
  const [r2, n2] = e5.split("?"), o2 = ls({}, t2), a2 = null !== (s2 = null == n2 ? void 0 : n2.split("&").map((e6) => {
    var t3;
    const [s3, r3] = e6.split("="), n3 = i2 && null !== (t3 = o2[s3]) && void 0 !== t3 ? t3 : r3;
    return delete o2[s3], `${s3}=${n3}`;
  })) && void 0 !== s2 ? s2 : [], l2 = (function(e6, t3 = "&") {
    let i3, s3;
    const r3 = [];
    return Rn(e6, function(e7, t4) {
      ft(e7) || ft(t4) || "undefined" === t4 || (i3 = encodeURIComponent(((e8) => e8 instanceof File)(e7) ? e7.name : e7.toString()), s3 = encodeURIComponent(t4), r3[r3.length] = s3 + "=" + i3);
    }), r3.join(t3);
  })(o2);
  return l2 && a2.push(l2), a2.length > 0 ? `${r2}?${a2.join("&")}` : r2;
};
var dc = (e5) => {
  if (e5._encodedBody) return e5._encodedBody;
  const { data: t2, compression: i2 } = e5;
  if (!t2) return;
  if (i2 === rl.GZipJS) {
    const e6 = sc((function(e7) {
      var t3 = e7.length;
      if ("undefined" != typeof TextEncoder) return new TextEncoder().encode(e7);
      for (var i3 = new kl(e7.length + (e7.length >>> 1)), s3 = 0, r2 = function(e8) {
        i3[s3++] = e8;
      }, n2 = 0; t3 > n2; ++n2) {
        if (s3 + 5 > i3.length) {
          var o2 = new kl(s3 + 8 + (t3 - n2 << 1));
          o2.set(i3), i3 = o2;
        }
        var a2 = e7.charCodeAt(n2);
        128 > a2 ? r2(a2) : 2048 > a2 ? (r2(192 | a2 >>> 6), r2(128 | 63 & a2)) : a2 > 55295 && 57344 > a2 ? (r2(240 | (a2 = 65536 + (1047552 & a2) | 1023 & e7.charCodeAt(++n2)) >>> 18), r2(128 | a2 >>> 12 & 63), r2(128 | a2 >>> 6 & 63), r2(128 | 63 & a2)) : (r2(224 | a2 >>> 12), r2(128 | a2 >>> 6 & 63), r2(128 | 63 & a2));
      }
      return jl(i3, 0, s3);
    })(Pa(t2)), { mtime: 0 });
    return { contentType: oc, body: e6.buffer.slice(e6.byteOffset, e6.byteOffset + e6.byteLength), estimatedSize: e6.byteLength };
  }
  if (i2 === rl.Base64) {
    const e6 = (function(e7) {
      return e7 ? btoa(encodeURIComponent(e7).replace(/%([0-9A-F]{2})/g, (e8, t3) => String.fromCharCode(parseInt(t3, 16)))) : e7;
    })(Pa(t2)), i3 = ((e7) => "data=" + encodeURIComponent("string" == typeof e7 ? e7 : Pa(e7)))(e6);
    return { contentType: "application/x-www-form-urlencoded", body: i3, estimatedSize: new Blob([i3]).size };
  }
  const s2 = Pa(t2);
  return { contentType: "application/json", body: s2, estimatedSize: new Blob([s2]).size };
};
var hc = (e5) => {
  const t2 = () => "sendBeacon" === e5.transport ? { url: uc(e5.url, { compression: rl.Base64 }), encodedBody: dc(ls(ls({}, e5), {}, { compression: rl.Base64, _encodedBody: void 0 })) } : { url: cc(e5.url, "compression"), encodedBody: dc(ls(ls({}, e5), {}, { compression: void 0, _encodedBody: void 0 })) };
  let i2;
  try {
    i2 = dc(e5);
  } catch (i3) {
    if (or(e5.compression, Ia(e5.url, "compression"))) return In.error("Failed to gzip request body, sending uncompressed payload", i3), t2();
    throw i3;
  }
  return i2 && or(e5.compression, Ia(e5.url, "compression")) && !((s2 = i2.body) instanceof ArrayBuffer ? nr(new Uint8Array(s2)) : ArrayBuffer.isView(s2) && nr(new Uint8Array(s2.buffer, s2.byteOffset, s2.byteLength))) ? (lc = true, t2()) : { url: e5.url, encodedBody: i2 };
  var s2;
};
var _c = (e5) => {
  try {
    return hc(e5);
  } catch (i2) {
    var t2;
    return In.error(i2), void (null === (t2 = e5.callback) || void 0 === t2 || t2.call(e5, { statusCode: 0, error: i2 }));
  }
};
var pc = (function() {
  var e5 = Lt(function* (e6) {
    const t2 = yield (function(e7) {
      return hr.apply(this, arguments);
    })(Pa(e6.data), i.DEBUG, { rethrow: true });
    if (!t2) return e6;
    const s2 = yield t2.arrayBuffer();
    return ls(ls({}, e6), {}, { _encodedBody: { contentType: oc, body: s2, estimatedSize: s2.byteLength } });
  });
  return function(t2) {
    return e5.apply(this, arguments);
  };
})();
var gc = /Failed to fetch|NetworkError|Load failed/i;
var vc = (e5) => "TypeError" === (null == e5 ? void 0 : e5.name) && gc.test((null == e5 ? void 0 : e5.message) || "");
var fc = (e5) => {
  try {
    const t2 = (function(e6, t3 = Date.now()) {
      if ("string" != typeof e6 || !e6) return;
      const i2 = e6.trim(), s2 = /^\d+\s*,/.test(i2) ? i2.slice(0, i2.indexOf(",")).trim() : i2;
      if (/^\d+$/.test(s2)) {
        const e7 = 1e3 * Math.min(Number(s2), 300);
        return e7 > 0 ? e7 : void 0;
      }
      if (!/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*[ ,]/.test(s2)) return;
      const r2 = /^\w{3} \w{3} /.test(s2) ? s2 + " GMT" : s2, n2 = Date.parse(r2) - t3;
      return Number.isFinite(n2) && n2 > 0 ? Math.min(n2, Qi) : void 0;
    })(e5());
    return ft(t2) ? void 0 : Math.min(t2, 3e4);
  } catch (e6) {
    return;
  }
};
var mc = (e5) => {
  const t2 = _c(e5);
  if (!t2) return;
  const i2 = new Je();
  nc.set(i2, true);
  const { url: s2, encodedBody: r2 } = t2;
  i2.open(e5.method || "GET", s2, true);
  const { contentType: n2, body: o2 } = null != r2 ? r2 : {};
  Rn(e5.headers, function(e6, t3) {
    i2.setRequestHeader(t3, e6);
  }), n2 && i2.setRequestHeader("Content-Type", n2), e5.timeout && (i2.timeout = e5.timeout), i2.onreadystatechange = () => {
    if (4 === i2.readyState) {
      var t3;
      const s3 = { statusCode: i2.status, text: i2.responseText };
      if (200 === i2.status) try {
        s3.json = JSON.parse(i2.responseText);
      } catch (e6) {
      }
      null === (t3 = e5.callback) || void 0 === t3 || t3.call(e5, s3, fc(() => i2.getResponseHeader("Retry-After")));
    }
  }, i2.send(o2);
};
var yc = (e5) => {
  const t2 = _c(e5);
  if (!t2) return;
  const { url: i2, encodedBody: s2 } = t2, { contentType: r2, body: n2, estimatedSize: o2 } = null != s2 ? s2 : {}, a2 = new Headers();
  Rn(e5.headers, function(e6, t3) {
    a2.append(t3, e6);
  }), r2 && a2.append("Content-Type", r2);
  let l2 = null, c2 = false;
  if (Ye) {
    const t3 = new Ye();
    l2 = { signal: t3.signal, timeout: setTimeout(() => {
      c2 = true;
      try {
        t3.abort(Xi("AbortError", "PostHog request timed out" + ((i3 = e5.timeout) ? ` after ${i3}ms` : "")));
      } catch (e6) {
        d2(e6);
      }
      var i3;
    }, e5.timeout) };
  }
  let u2 = false;
  const d2 = (t3) => {
    var i3;
    u2 || (u2 = true, c2 && "AbortError" === (null == t3 ? void 0 : t3.name) || vc(t3) ? In.warn(t3) : In.error(t3), null === (i3 = e5.callback) || void 0 === i3 || i3.call(e5, { statusCode: 0, error: t3 }));
  };
  let h2 = 0;
  const _2 = () => {
    ac -= h2, h2 = 0, l2 && clearTimeout(l2.timeout);
  };
  try {
    const t3 = ls({ method: (null == e5 ? void 0 : e5.method) || "GET", headers: a2, referrerPolicy: "strict-origin", body: n2, signal: null == l2 ? void 0 : l2.signal }, e5.fetchOptions), s3 = null != o2 ? o2 : ft(n2) ? 0 : void 0;
    t3.keepalive = "POST" === t3.method && !e5._keepaliveDisabled && false !== t3.keepalive && t3.body === n2 && !ft(s3) && s3 >= 0 && 52428.8 > ac + s3, t3.keepalive && (h2 = s3, ac += h2), Qe(i2, t3).then((t4) => t4.text().then((i3) => {
      var s4;
      if (u2) return;
      const r3 = { statusCode: t4.status, text: i3 };
      if (200 === t4.status) try {
        r3.json = JSON.parse(i3);
      } catch (e6) {
        In.error(e6);
      }
      u2 = true, _2(), null === (s4 = e5.callback) || void 0 === s4 || s4.call(e5, r3, fc(() => t4.headers.get("Retry-After")));
    })).catch((e6) => {
      _2(), d2(e6);
    }).finally(_2);
  } catch (e6) {
    _2(), d2(e6);
  }
};
var bc = (e5) => {
  try {
    var t2;
    const { url: i2, encodedBody: s2 } = hc(e5), { contentType: r2, body: n2, estimatedSize: o2 } = null != s2 ? s2 : {};
    if (!n2) return;
    const a2 = n2 instanceof Blob ? n2 : new Blob([n2], { type: r2 });
    if (Ve.sendBeacon(i2, a2)) return;
    const l2 = _t(e5.data) ? e5.data : null === (t2 = e5.data) || void 0 === t2 ? void 0 : t2.batch;
    if (_t(l2) && l2.length > 1 && (null != o2 ? o2 : 0) > 16384) {
      const t3 = Math.ceil(l2.length / 2), i3 = (t4) => _t(e5.data) ? t4 : ls(ls({}, e5.data), {}, { batch: t4 });
      return bc(ls(ls({}, e5), {}, { data: i3(l2.slice(0, t3)) })), void bc(ls(ls({}, e5), {}, { data: i3(l2.slice(t3)) }));
    }
    In.warn(`Beacon of ~${null != o2 ? o2 : 0} bytes was rejected by the browser, falling back to ${Qe ? "fetch" : "XHR"}`), Qe ? yc(ls(ls({}, e5), {}, { _keepaliveDisabled: true })) : mc(e5);
  } catch (e6) {
    In.warn("Beacon send failed", e6);
  }
};
var Sc = (e5, t2, i2, s2) => {
  const r2 = "query" === s2 ? "POST" === t2 ? "sent_at" : "_" : void 0;
  return uc(i2 === rl.GZipJS ? cc(e5, "compression") : e5, ls(ls({}, r2 ? { [r2]: Date.now().toString() } : {}), i2 === rl.GZipJS ? {} : { compression: i2 }));
};
var wc = (() => {
  const e5 = [];
  return Qe && e5.push({ transport: "fetch", method: yc }), Je && e5.push({ transport: "XHR", method: mc }), (null == Ve ? void 0 : Ve.sendBeacon) && e5.push({ transport: "sendBeacon", method: bc }), e5;
})();
var Ec = !rc && -1 === (null == Xe ? void 0 : Xe.indexOf("MSIE")) && -1 === (null == Xe ? void 0 : Xe.indexOf("Mozilla"));
function Cc(e5, t2, i2) {
  var s2, r2, n2;
  i2 && (t2 = ls(ls({}, t2), {}, { callback: (e6) => i2(e6) })), e5.__loaded ? Ec ? e5.__request_queue.push(t2) : e5.rateLimiter.isServerRateLimited(t2.batchKey) ? t2.fireCallbackOnDrop && (null === (r2 = t2.callback) || void 0 === r2 || r2.call(t2, { statusCode: 429 })) : (t2.transport = t2.transport || e5.config.api_transport, t2.headers = ls(ls({}, e5.config.request_headers), t2.headers), t2.compression = "best-available" === t2.compression ? null !== (s2 = e5.compression) && void 0 !== s2 ? s2 : t2.compressionFallback : t2.compression, (ft(e5.config.disable_beacon) ? e5.config.__preview_disable_beacon : e5.config.disable_beacon) && (t2.disableTransport = ["sendBeacon"]), t2.fetchOptions = t2.fetchOptions || e5.config.fetch_options, ((e6, t3) => {
    var i3, s3, r3;
    const n3 = ls(ls({}, e6), {}, { callback: null != t3 ? t3 : (t4) => {
      var i4;
      return null === (i4 = e6.callback) || void 0 === i4 ? void 0 : i4.call(e6, t4);
    } });
    n3.timeout = n3.timeout || 6e4;
    const o2 = null !== (i3 = n3.transport) && void 0 !== i3 ? i3 : "fetch";
    "sendBeacon" === o2 && ft(n3.compression) && n3.data && (n3.compression = rl.Base64), "POST" === n3.method && n3.data && ("capture-body" === n3.timestampMode ? n3.data = ((e7) => {
      var t4, i4;
      const s4 = (_t(e7) ? e7 : [e7]).map((e8) => ls(ls({}, e8), e8.timestamp instanceof Date && !isNaN(e8.timestamp.getTime()) ? { timestamp: e8.timestamp.toISOString() } : {})), r4 = s4[0];
      return { api_key: null !== (t4 = null == r4 || null === (i4 = r4.properties) || void 0 === i4 ? void 0 : i4.token) && void 0 !== t4 ? t4 : null == r4 ? void 0 : r4.token, batch: s4, sent_at: (/* @__PURE__ */ new Date()).toISOString() };
    })(n3.data) : "body" === n3.timestampMode && (n3.data = ((e7, t4 = (/* @__PURE__ */ new Date()).toISOString()) => _t(e7) ? e7.map((e8) => ls(ls({}, e8), {}, { sent_at: t4 })) : ls(ls({}, e7), {}, { sent_at: t4 }))(n3.data))), n3.url = Sc(n3.url, n3.method, n3.compression, n3.timestampMode);
    const a2 = wc.filter((e7) => !n3.disableTransport || !e7.transport || !n3.disableTransport.includes(e7.transport)), l2 = null !== (s3 = null === (r3 = (function(e7, t4) {
      for (let i4 = 0; e7.length > i4; i4++) if (t4(e7[i4])) return e7[i4];
    })(a2, (e7) => e7.transport === o2)) || void 0 === r3 ? void 0 : r3.method) && void 0 !== s3 ? s3 : a2[0].method;
    if (!l2) throw new Error("No available transport method");
    const c2 = (e7) => {
      try {
        l2(e7);
      } catch (e8) {
        var t4;
        vc(e8) ? In.warn(e8) : In.error(e8), null === (t4 = n3.callback) || void 0 === t4 || t4.call(n3, { statusCode: 0, error: e8 });
      }
    };
    "sendBeacon" !== o2 && !n3.preferSyncCompression && n3.data && n3.compression === rl.GZipJS && Ze && "undefined" != typeof Promise && !lc ? pc(n3).then((e7) => {
      c2(e7);
    }).catch((t4) => {
      if (ar(t4)) return lc = true, void c2(ls(ls({}, n3), {}, { compression: void 0, url: Sc(e6.url, e6.method, void 0, e6.timestampMode) }));
      ((e7) => {
        if (!e7 || "object" != typeof e7) return false;
        const t5 = "name" in e7 ? String(e7.name) : "";
        return ar(e7) || t5 === rr;
      })(t4) && (lc = true), c2(n3);
    }) : c2(n3);
  })(t2, (s3, r3) => {
    var n3, o2, a2;
    e5.rateLimiter.checkForLimiting(s3), 400 > s3.statusCode || null === (n3 = (o2 = e5.config).on_request_error) || void 0 === n3 || n3.call(o2, s3), i2 ? i2(s3, r3) : null === (a2 = t2.callback) || void 0 === a2 || a2.call(t2, s3);
  })) : t2.fireCallbackOnDrop && (null === (n2 = t2.callback) || void 0 === n2 || n2.call(t2, { statusCode: 0 }));
}
var kc = class {
  constructor(e5, t2) {
    this._isPaused = true, this._queue = [], this._flushTimeoutMs = Ut((null == t2 ? void 0 : t2.flush_interval_ms) || 3e3, 250, 5e3, In.createLogger("flush interval"), 3e3), this._sendRequest = e5;
  }
  enqueue(e5) {
    this._queue.push(e5), this._flushTimeout || this._setFlushTimeout();
  }
  unload() {
    this._clearFlushTimeout();
    const e5 = this._queue.length > 0 ? this._formatQueue() : {}, t2 = Object.values(e5);
    [...t2.filter((e6) => 0 === e6.url.indexOf("/e")), ...t2.filter((e6) => 0 !== e6.url.indexOf("/e"))].map((e6) => {
      this._sendRequestSafely(ls(ls({}, e6), {}, { callback: void 0 }), "sendBeacon");
    });
  }
  enable() {
    this._isPaused = false, this._setFlushTimeout();
  }
  _setFlushTimeout() {
    this._isPaused || (this._flushTimeout = setTimeout(() => {
      this._clearFlushTimeout(), this._flush();
    }, this._flushTimeoutMs));
  }
  _flush() {
    if (this._queue.length > 0) {
      const e5 = this._formatQueue();
      for (const t2 in e5) this._sendRequestSafely(e5[t2]);
    }
  }
  _sendRequestSafely(e5, t2) {
    try {
      this._sendRequest(e5, t2);
    } catch (e6) {
      In.error(e6);
    }
  }
  _clearFlushTimeout() {
    clearTimeout(this._flushTimeout), this._flushTimeout = void 0;
  }
  _formatQueue() {
    const e5 = {}, t2 = {};
    Rn(this._queue, (i2) => {
      var s2;
      const r2 = i2, n2 = ((r2 ? r2.batchKey : null) || r2.url) + (r2.batchGroup ? `:${r2.batchGroup}` : "");
      ft(e5[n2]) && (e5[n2] = ls(ls({}, r2), {}, { data: [], callback: void 0, fireCallbackOnDrop: void 0 }), t2[n2] = []), null === (s2 = e5[n2].data) || void 0 === s2 || s2.push(r2.data), r2.callback && t2[n2].push(r2.callback);
    });
    for (const i2 in t2) {
      const s2 = t2[i2];
      s2.length && (e5[i2].callback = (e6) => {
        for (const t3 of s2) t3(e6);
      });
    }
    return this._queue = [], e5;
  }
};
var xc = ["retriesPerformedSoFar"];
var Pc = class {
  constructor(e5) {
    this._instance = e5, this._isPolling = false, this._pollIntervalMs = 3e3, this._queue = [], this._queue = [], this._areWeOnline = true, this.resume();
  }
  resume() {
    if (!ft(je) && "onLine" in je.navigator) {
      if (this._areWeOnline = je.navigator.onLine, this._onlineListener) return;
      this._onlineListener = () => {
        this._areWeOnline = true, this._flush();
      }, this._offlineListener = () => {
        this._areWeOnline = false;
      }, Bn(je, "online", this._onlineListener), Bn(je, "offline", this._offlineListener);
    }
  }
  get length() {
    return this._queue.length;
  }
  retriableRequest(e5, t2) {
    let { retriesPerformedSoFar: i2 } = e5, s2 = _r(e5, xc);
    Et(i2) && (s2.url = uc(s2.url, { retry_count: i2 })), Cc(this._instance, t2 ? ls(ls({}, s2), {}, { transport: t2 }) : s2, (e6, t3) => {
      var r2;
      if (200 !== e6.statusCode && (400 > e6.statusCode || e6.statusCode >= 500)) {
        if ((0 === e6.statusCode ? 3 : 10) > (null != i2 ? i2 : 0)) return void this._enqueue(ls({ retriesPerformedSoFar: i2 }, s2), t3);
        0 === e6.statusCode && In.warn(`Request failed before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped retrying after ${null != i2 ? i2 : 0} retries.`);
      }
      null === (r2 = s2.callback) || void 0 === r2 || r2.call(s2, e6);
    });
  }
  _enqueue(e5, t2) {
    const i2 = e5.retriesPerformedSoFar || 0;
    e5.retriesPerformedSoFar = i2 + 1;
    const s2 = Math.max((function(e6) {
      const t3 = 3e3 * Math.pow(2, e6), i3 = t3 / 2, s3 = Math.min(18e5, t3), r3 = (Math.random() - 0.5) * (s3 - i3);
      return Math.ceil(s3 + r3);
    })(i2), null != t2 ? t2 : 0), r2 = Date.now() + s2;
    this._queue.push({ retryAt: r2, requestOptions: e5 });
    let n2 = `Enqueued failed request for retry in ${s2}`;
    navigator.onLine || (n2 += " (Browser is offline)"), In.warn(n2), this._isPolling || (this._isPolling = true, this._poll());
  }
  _poll() {
    if (this._poller && clearTimeout(this._poller), 0 === this._queue.length) return this._isPolling = false, void (this._poller = void 0);
    this._poller = setTimeout(() => {
      this._areWeOnline && this._queue.length > 0 && this._flush(), this._poll();
    }, this._pollIntervalMs);
  }
  _flush() {
    const e5 = Date.now(), t2 = [], i2 = this._queue.filter((i3) => e5 > i3.retryAt || (t2.push(i3), false));
    if (this._queue = t2, i2.length > 0) for (const { requestOptions: e6 } of i2) this.retriableRequest(e6);
  }
  unload() {
    this._poller && (clearTimeout(this._poller), this._poller = void 0), this._isPolling = false, ft(je) || (this._onlineListener && (je.removeEventListener("online", this._onlineListener), this._onlineListener = void 0), this._offlineListener && (je.removeEventListener("offline", this._offlineListener), this._offlineListener = void 0));
    for (const { requestOptions: e5 } of this._queue) try {
      this._instance._send_request(ls(ls({}, e5), {}, { callback: _t(e5.data) ? void 0 : e5.callback, transport: "sendBeacon" }));
    } catch (e6) {
      In.error(e6);
    }
    this._queue = [];
  }
};
var Ic = class {
  constructor(e5) {
    this._instance = e5, this._updateScrollData = () => {
      var e6, t2, i2, s2;
      this._context || (this._context = {});
      const r2 = this.scrollElement(), n2 = this.scrollY(), o2 = r2 ? Math.max(0, r2.scrollHeight - r2.clientHeight) : 0, a2 = n2 + ((null == r2 ? void 0 : r2.clientHeight) || 0), l2 = (null == r2 ? void 0 : r2.scrollHeight) || 0;
      this._context.lastScrollY = Math.ceil(n2), this._context.maxScrollY = Math.max(n2, null !== (e6 = this._context.maxScrollY) && void 0 !== e6 ? e6 : 0), this._context.maxScrollHeight = Math.max(o2, null !== (t2 = this._context.maxScrollHeight) && void 0 !== t2 ? t2 : 0), this._context.lastContentY = a2, this._context.maxContentY = Math.max(a2, null !== (i2 = this._context.maxContentY) && void 0 !== i2 ? i2 : 0), this._context.maxContentHeight = Math.max(l2, null !== (s2 = this._context.maxContentHeight) && void 0 !== s2 ? s2 : 0);
    };
  }
  get _scrollRoot() {
    return this._instance.config.scroll_root_selector;
  }
  getContext() {
    return this._context;
  }
  resetContext() {
    const e5 = this._context;
    return this._context = void 0, setTimeout(this._updateScrollData, 0), e5;
  }
  startMeasuringScrollPosition() {
    Bn(je, "scroll", this._updateScrollData, { capture: true }), Bn(je, "scrollend", this._updateScrollData, { capture: true }), Bn(je, "resize", this._updateScrollData);
  }
  scrollElement() {
    if (this._scrollRoot) {
      const t3 = _t(this._scrollRoot) ? this._scrollRoot : [this._scrollRoot];
      for (const i2 of t3) {
        var e5;
        const t4 = null == je || null === (e5 = je.document) || void 0 === e5 ? void 0 : e5.querySelector(i2);
        if (t4) return t4;
      }
      return;
    }
    var t2;
    return null == je || null === (t2 = je.document) || void 0 === t2 ? void 0 : t2.documentElement;
  }
  _scrollPosition(e5) {
    var t2, i2;
    const s2 = "y" === e5 ? "scrollTop" : "scrollLeft";
    if (this._scrollRoot) {
      const e6 = this.scrollElement();
      return e6 && e6[s2] || 0;
    }
    return je ? "y" === e5 ? je.scrollY || je.pageYOffset || (null === (t2 = je.document) || void 0 === t2 || null === (t2 = t2.documentElement) || void 0 === t2 ? void 0 : t2.scrollTop) || 0 : je.scrollX || je.pageXOffset || (null === (i2 = je.document) || void 0 === i2 || null === (i2 = i2.documentElement) || void 0 === i2 ? void 0 : i2.scrollLeft) || 0 : 0;
  }
  scrollY() {
    return this._scrollPosition("y");
  }
  scrollX() {
    return this._scrollPosition("x");
  }
};
var Fc = (e5) => Ha(null == e5 ? void 0 : e5.config.mask_personal_data_properties, null == e5 ? void 0 : e5.config.custom_personal_data_properties, null == e5 ? void 0 : e5.config.disable_capture_url_hashes);
var Tc = class {
  constructor(e5, t2, i2, s2) {
    this._onSessionIdCallback = (e6) => {
      const t3 = this._getStored();
      if (t3 && t3.sessionId === e6) return;
      const i3 = { sessionId: e6, props: this._sessionSourceParamGenerator(this._instance) };
      this._persistence.register({ [ve]: i3 });
    }, this._instance = e5, this._sessionIdManager = t2, this._persistence = i2, this._sessionSourceParamGenerator = s2 || Fc, this._sessionIdManager.onSessionId(this._onSessionIdCallback);
  }
  _getStored() {
    return this._persistence.props[ve];
  }
  getSetOnceProps() {
    var e5;
    const t2 = null === (e5 = this._getStored()) || void 0 === e5 ? void 0 : e5.props;
    return t2 ? "r" in t2 ? za(t2, this._instance.config.disable_capture_url_hashes) : { $referring_domain: t2.referringDomain, $pathname: t2.initialPathName, utm_source: t2.utm_source, utm_campaign: t2.utm_campaign, utm_medium: t2.utm_medium, utm_content: t2.utm_content, utm_term: t2.utm_term } : {};
  }
  getSessionProps() {
    const e5 = {};
    return Rn(On(this.getSetOnceProps()), (t2, i2) => {
      "$current_url" === i2 && (i2 = "url"), e5[`$session_entry_${lt(i2)}`] = t2;
    }), e5;
  }
};
var Rc = class {
  on(e5, t2) {
    return this._events[e5] || (this._events[e5] = []), this._events[e5].push(t2), () => {
      this._events[e5] = this._events[e5].filter((e6) => e6 !== t2);
    };
  }
  emit(e5, t2) {
    for (const i2 of this._events[e5] || []) i2(t2);
    for (const i2 of this._events["*"] || []) i2(e5, t2);
  }
  constructor() {
    this._events = {};
  }
};
var $c = Fn("[SessionId]");
var Ac = 864e5;
var Mc = class {
  on(e5, t2) {
    return this._eventEmitter.on(e5, t2);
  }
  constructor(e5, t2, i2) {
    var s2;
    if (this._lastPersistedActivityTimestamp = null, this._lastCookieSyncTimestamp = null, this._sessionIdChangedHandlers = [], this._beforeUnloadListener = void 0, this._destroyed = false, this._eventEmitter = new Rc(), this._sessionHasBeenIdleTooLong = (e6, t3) => !(!Et(e6) || !Et(t3)) && Math.abs(e6 - t3) > this.sessionTimeoutMs, !e5.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
    if ("always" === e5.config.cookieless_mode) throw new Error('SessionIdManager cannot be used with cookieless_mode="always"');
    this._config = e5.config, this._persistence = e5.persistence, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._pendingBootstrapSession = void 0, this._sessionActivityTimestamp = null, this._sessionIdGenerator = t2 || Kn, this._windowIdGenerator = i2 || Kn;
    const r2 = this._config.persistence_name || this._config.token;
    if (this._sessionTimeoutMs = 1e3 * Ut(this._config.session_idle_timeout_seconds || 1800, 60, 36e3, $c.createLogger("session_idle_timeout_seconds"), 1800), e5.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this._resetIdleTimer(), this._window_id_storage_key = "ph_" + r2 + "_window_id", this._primary_window_exists_storage_key = "ph_" + r2 + "_primary_window_exists", this._canUseSessionStorage()) {
      const e6 = vo._parse(this._window_id_storage_key), t3 = vo._parse(this._primary_window_exists_storage_key);
      e6 && !t3 ? this._windowId = e6 : vo._remove(this._window_id_storage_key), vo._set(this._primary_window_exists_storage_key, true);
    }
    (null === (s2 = this._config.bootstrap) || void 0 === s2 ? void 0 : s2.sessionID) && this.setBootstrapSessionId(this._config.bootstrap.sessionID), this._listenToReloadWindow();
  }
  get sessionTimeoutMs() {
    return this._sessionTimeoutMs;
  }
  onSessionId(e5) {
    return ft(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e5), this._sessionId && e5(this._sessionId, this._windowId), () => {
      this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((t2) => t2 !== e5);
    };
  }
  _canUseSessionStorage() {
    return "memory" !== this._config.persistence && !this._persistence._disabled && vo._is_supported();
  }
  _setWindowId(e5) {
    e5 !== this._windowId && (this._windowId = e5, this._canUseSessionStorage() && vo._set(this._window_id_storage_key, e5));
  }
  _getWindowId() {
    return this._windowId ? this._windowId : this._canUseSessionStorage() ? vo._parse(this._window_id_storage_key) : null;
  }
  _isActivityChangeBelowGranularity(e5) {
    const t2 = this._lastPersistedActivityTimestamp;
    return !bt(t2) && !bt(e5) && 5e3 > Math.abs(e5 - t2);
  }
  _setSessionId(e5, t2, i2) {
    const s2 = t2 !== this._sessionActivityTimestamp, r2 = !(e5 !== this._sessionId || i2 !== this._sessionStartTimestamp);
    this._sessionStartTimestamp = i2, this._sessionActivityTimestamp = t2, this._sessionId = e5, r2 && !s2 || r2 && this._isActivityChangeBelowGranularity(t2) || (this._lastPersistedActivityTimestamp = t2, this._persistence.register({ [ee]: [t2, e5, i2] }));
  }
  _useCrossTabRefreshHardening() {
    var e5;
    const t2 = null === (e5 = this._config) || void 0 === e5 ? void 0 : e5.persistence_save_debounce_ms;
    return Et(t2) && t2 > 0;
  }
  _refreshSessionIdFromStorage() {
    this._useCrossTabRefreshHardening() ? this._persistence.refreshKey(ee) : (this._persistence.flush(), this._persistence.load());
  }
  _flushPendingActivityTimestamp() {
    var e5;
    if (bt(this._sessionActivityTimestamp) || this._sessionActivityTimestamp === this._lastPersistedActivityTimestamp) return;
    this._refreshSessionIdFromStorage();
    const [, t2, i2] = this._getSessionId();
    t2 === this._sessionId && i2 === this._sessionStartTimestamp && (this._lastPersistedActivityTimestamp = this._sessionActivityTimestamp, this._persistence.register({ [ee]: [this._sessionActivityTimestamp, null !== (e5 = this._sessionId) && void 0 !== e5 ? e5 : null, this._sessionStartTimestamp] }), this._persistence.flush());
  }
  _freshestActivityTimestamp() {
    const [e5] = this._getSessionId(), t2 = Et(e5) ? e5 : 0, i2 = Et(this._sessionActivityTimestamp) ? this._sessionActivityTimestamp : 0;
    return Math.max(t2, i2);
  }
  _isSessionIdleAfterCrossTabRefresh(e5) {
    return this._refreshSessionIdFromStorage(), this._sessionHasBeenIdleTooLong(e5, this._freshestActivityTimestamp());
  }
  _getSessionId() {
    const e5 = this._persistence.props[ee];
    return _t(e5) && 2 === e5.length && e5.push(e5[0]), e5 || [0, null, 0];
  }
  resetSessionId() {
    this._lastPersistedActivityTimestamp = null, this._pendingBootstrapSession = void 0, clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = void 0, this._setSessionId(null, null, null);
  }
  setBootstrapSessionId(e5, t2 = false) {
    const i2 = ((e6, t3 = (/* @__PURE__ */ new Date()).getTime()) => {
      try {
        const i3 = ((e7) => {
          const t4 = e7.replace(/-/g, "");
          if (32 !== t4.length) throw new Error("Not a valid UUID");
          if ("7" !== t4[12]) throw new Error("Not a UUIDv7");
          return parseInt(t4.substring(0, 12), 16);
        })(e6);
        return i3 > t3 + 6e4 ? void $c.error("Bootstrap sessionID cannot be in the future") : i3;
      } catch (e7) {
        return void $c.error("Invalid sessionID in bootstrap", e7);
      }
    })(e5);
    return !ft(i2) && (t2 ? this._pendingBootstrapSession = { sessionId: e5, sessionStartTimestamp: i2 } : this._setSessionId(e5, (/* @__PURE__ */ new Date()).getTime(), i2), true);
  }
  destroy() {
    this._destroyed = true, this._flushPendingActivityTimestamp(), clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = void 0, this._beforeUnloadListener && je && (je.removeEventListener(Be, this._beforeUnloadListener, { capture: false }), this._beforeUnloadListener = void 0), this._sessionIdChangedHandlers = [];
  }
  _listenToReloadWindow() {
    this._beforeUnloadListener = () => {
      this._flushPendingActivityTimestamp(), this._canUseSessionStorage() && vo._remove(this._primary_window_exists_storage_key);
    }, Bn(je, Be, this._beforeUnloadListener, { capture: false });
  }
  checkAndGetSessionAndWindowId(e5 = false, t2 = null, i2 = false) {
    if ("always" === this._config.cookieless_mode) throw new Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
    const s2 = t2 || (/* @__PURE__ */ new Date()).getTime(), r2 = this._sessionId;
    if (i2) this._lastCookieSyncTimestamp = s2;
    else if (bt(this._lastCookieSyncTimestamp) || this._lastCookieSyncTimestamp > s2 || s2 - this._lastCookieSyncTimestamp >= 1e3) {
      var n2, o2;
      null === (n2 = (o2 = this._persistence).syncCookieProperties) || void 0 === n2 || n2.call(o2), this._lastCookieSyncTimestamp = s2;
    }
    let [, a2, l2] = this._getSessionId();
    const c2 = !ft(r2) && a2 !== r2, u2 = this._freshestActivityTimestamp();
    let d2 = this._getWindowId();
    const h2 = this._pendingBootstrapSession, _2 = !!h2 && (h2.sessionStartTimestamp > s2 + 6e4 || s2 - h2.sessionStartTimestamp > Ac), p2 = h2 ? _2 : Et(l2) && Math.abs(s2 - l2) > Ac;
    let g2 = false, v2 = c2, f2 = !a2 || !!h2;
    const m2 = a2;
    let y2 = !f2 && !e5 && this._sessionHasBeenIdleTooLong(s2, u2);
    if (y2 && (y2 = this._isSessionIdleAfterCrossTabRefresh(s2), y2 || $c.info("cross-tab refresh kept the session alive", { sessionId: a2 }), [, a2, l2] = this._getSessionId(), y2 || (f2 = !a2 || !!h2)), f2 || y2 || p2) {
      v2 = false;
      const e6 = h2 && !_2;
      a2 = e6 ? h2.sessionId : this._sessionIdGenerator(), d2 = this._windowIdGenerator(), $c.info("new session ID assigned", { sessionId: a2, windowId: d2, bootstrapped: !!e6, changeReason: { noSessionId: f2, activityTimeout: y2, sessionPastMaximumLength: p2 } }), l2 = e6 ? h2.sessionStartTimestamp : s2, this._pendingBootstrapSession = void 0, g2 = true;
    } else d2 || (d2 = this._windowIdGenerator(), g2 = true), v2 = v2 || a2 !== m2, v2 && ($c.info("adopted cross-tab session id", { sessionId: a2, windowId: d2 }), g2 = true);
    const b2 = Et(u2) && e5 && !p2 ? u2 : s2, S2 = Et(l2) ? l2 : (/* @__PURE__ */ new Date()).getTime();
    this._setWindowId(d2), this._setSessionId(a2, b2, S2), e5 || this._resetIdleTimer();
    const w2 = { noSessionId: f2, activityTimeout: y2, sessionPastMaximumLength: p2, crossTabAdoption: v2 };
    return g2 && this._sessionIdChangedHandlers.forEach((e6) => e6(a2, d2, w2)), { sessionId: a2, windowId: d2, sessionStartTimestamp: S2, changeReason: g2 ? w2 : void 0, lastActivityTimestamp: u2 };
  }
  _resetIdleTimer() {
    this._destroyed || (clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = setTimeout(() => {
      if (!this._destroyed) if (this._isSessionIdleAfterCrossTabRefresh((/* @__PURE__ */ new Date()).getTime())) {
        const e5 = this._sessionId;
        this.resetSessionId(), this._eventEmitter.emit("forcedIdleReset", { idleSessionId: e5 });
      } else this._resetIdleTimer();
    }, 1.1 * this.sessionTimeoutMs));
  }
};
var Oc = Object.freeze(["2026-08-30", "2026-08-29", "2026-06-25", "2026-05-30", "2026-01-30", "2025-11-30", "2025-05-24"]);
var Lc = function(e5, t2) {
  if (!e5) return false;
  const i2 = e5.userAgent;
  if (i2 && Bt(i2, t2)) return true;
  try {
    const i3 = null == e5 ? void 0 : e5.userAgentData;
    if ((null == i3 ? void 0 : i3.brands) && i3.brands.some((e6) => Bt(null == e6 ? void 0 : e6.brand, t2))) return true;
  } catch (e6) {
  }
  return !!e5.webdriver;
};
function Dc() {
  return (Dc = Lt(function* () {
    const e5 = null == Ve ? void 0 : Ve.userAgentData;
    if (null == e5 ? void 0 : e5.getHighEntropyValues) try {
      const t2 = yield e5.getHighEntropyValues(["model"]), i2 = null == t2 ? void 0 : t2.model;
      return mt(i2) && i2.length > 0 ? i2 : void 0;
    } catch (e6) {
      return void In.info("Unable to resolve $device_model from userAgentData.getHighEntropyValues", e6);
    }
  })).apply(this, arguments);
}
function Nc(e5, t2) {
  let i2 = `$survey_${t2}/${e5.id}`;
  return e5.current_iteration && e5.current_iteration > 0 && (i2 = `$survey_${t2}/${e5.id}/${e5.current_iteration}`), i2;
}
function Bc(e5) {
  var t2;
  return !!(null === (t2 = e5.conditions) || void 0 === t2 || null === (t2 = t2.events) || void 0 === t2 || null === (t2 = t2.values) || void 0 === t2 ? void 0 : t2.length);
}
var Uc = (e5, t2) => {
  if (!((e6) => {
    try {
      new RegExp(e6);
    } catch (e7) {
      return false;
    }
    return true;
  })(t2)) return false;
  try {
    return new RegExp(t2).test(e5);
  } catch (e6) {
    return false;
  }
};
var qc = (e5) => e5.toLowerCase();
var Hc = { exact: (e5, t2) => t2.some((t3) => e5.some((e6) => t3 === e6)), is_not: (e5, t2) => t2.every((t3) => e5.every((e6) => t3 !== e6)), regex: (e5, t2) => t2.some((t3) => e5.some((e6) => Uc(t3, e6))), not_regex: (e5, t2) => t2.every((t3) => e5.every((e6) => !Uc(t3, e6))), icontains: (e5, t2) => t2.map(qc).some((t3) => e5.map(qc).some((e6) => t3.includes(e6))), not_icontains: (e5, t2) => t2.map(qc).every((t3) => e5.map(qc).every((e6) => !t3.includes(e6))), gt: (e5, t2) => t2.some((t3) => {
  const i2 = parseFloat(t3);
  return !isNaN(i2) && e5.some((e6) => i2 > parseFloat(e6));
}), lt: (e5, t2) => t2.some((t3) => {
  const i2 = parseFloat(t3);
  return !isNaN(i2) && e5.some((e6) => i2 < parseFloat(e6));
}) };
function zc(e5, t2) {
  return !e5 || Object.entries(e5).every(([e6, i2]) => {
    const s2 = null == t2 ? void 0 : t2[e6];
    if (null == s2) return false;
    const r2 = Hc[i2.operator];
    return !!r2 && r2(i2.values.map(String), [String(s2)]);
  });
}
function jc(e5, t2, i2) {
  return Pa({ distinct_id: e5, userPropertiesToSet: t2, userPropertiesToSetOnce: i2 });
}
var Wc = "custom";
var Vc = "i.posthog.com";
var Gc = /^\/static\//;
var Kc = ["/s/", "/e/", "/i/"];
var Qc = class {
  constructor(e5) {
    this._regionCache = {}, this.instance = e5;
  }
  get apiHost() {
    const e5 = this.instance.config.api_host.trim().replace(/\/$/, "");
    return "https://app.posthog.com" === e5 ? "https://us.i.posthog.com" : e5;
  }
  get flagsApiHost() {
    const e5 = this.instance.config.flags_api_host;
    return e5 ? e5.trim().replace(/\/$/, "") : this.apiHost;
  }
  get uiHost() {
    var e5;
    let t2 = null === (e5 = this.instance.config.ui_host) || void 0 === e5 ? void 0 : e5.replace(/\/$/, "");
    return t2 || (t2 = this.apiHost.replace(`.${Vc}`, ".posthog.com")), "https://app.posthog.com" === t2 ? "https://us.posthog.com" : t2;
  }
  get region() {
    return this._regionCache[this.apiHost] || (this._regionCache[this.apiHost] = /https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "us" : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? "eu" : Wc), this._regionCache[this.apiHost];
  }
  _staticAssetHostOverride(e5) {
    if (!Gc.test(e5)) return;
    const t2 = this.instance.config.asset_host;
    return "string" == typeof t2 && t2.trim().replace(/\/$/, "") || void 0;
  }
  _urlKey(e5) {
    const t2 = Ea(e5);
    return t2 ? t2.protocol + "//" + t2.host + t2.pathname : void 0;
  }
  _prepareEndpoint(e5, t2, i2) {
    if ("ui" === e5) return i2;
    let s2 = i2;
    const r2 = this.instance.config.rewriteRequestPath;
    if (r2) {
      var n2;
      const e6 = (null === (n2 = Ea(i2)) || void 0 === n2 ? void 0 : n2.href) || i2;
      s2 = r2(new URL(e6)).toString();
    }
    if (r2 && "api" === e5 && Kc.some((e6) => 0 === t2.indexOf(e6))) {
      const e6 = this._urlKey(s2);
      if (e6) {
        const t3 = this.apiHost;
        let i3 = this._ingestionEndpoints;
        (null == i3 ? void 0 : i3.apiHost) === t3 && i3.rewriteRequestPath === r2 || (i3 = { apiHost: t3, rewriteRequestPath: r2, urls: /* @__PURE__ */ new Set() }, this._ingestionEndpoints = i3), i3.urls.add(e6);
      }
    }
    return s2;
  }
  isIngestionEndpoint(e5) {
    const t2 = this._ingestionEndpoints, i2 = this._urlKey(e5);
    return (null == t2 ? void 0 : t2.apiHost) === this.apiHost && t2.rewriteRequestPath === this.instance.config.rewriteRequestPath && !!i2 && t2.urls.has(i2);
  }
  endpointFor(e5, t2 = "") {
    if (t2 && (t2 = "/" === t2[0] ? t2 : `/${t2}`), "ui" === e5) return this._prepareEndpoint(e5, t2, this.uiHost + t2);
    if ("flags" === e5) return this._prepareEndpoint(e5, t2, this.flagsApiHost + t2);
    if ("assets" === e5) {
      const i3 = this._staticAssetHostOverride(t2);
      if (i3) return this._prepareEndpoint(e5, t2, `${i3}${t2}`);
    }
    if (this.region === Wc) return this._prepareEndpoint(e5, t2, this.apiHost + t2);
    const i2 = Vc + t2;
    switch (e5) {
      case "assets":
        return this._prepareEndpoint(e5, t2, `https://${this.region}-assets.${i2}`);
      case "api":
        return this._prepareEndpoint(e5, t2, `https://${this.region}.${i2}`);
    }
  }
};
var Jc = Fn("[Surveys]");
var Yc = (e5) => {
  try {
    const t2 = ((e6) => ((e7, t3) => `seenSurvey_${(function(e8) {
      return e8.current_iteration && e8.current_iteration > 0 ? `${e8.id}_${e8.current_iteration}` : e8.id;
    })(t3)}`)(0, e6))(e5);
    if (localStorage.getItem(t2)) return;
    localStorage.setItem(t2, "true");
  } catch (e6) {
    Jc.error("Failed to persist survey seen state", e6);
  }
};
var Zc = [cl.Popover, cl.Widget, cl.API];
var Xc = { ignoreConditions: false, ignoreDelay: false, displayType: gl.Popover };
var eu = Fn("[PostHog ExternalIntegrations]");
var tu = { intercom: "intercom-integration", crispChat: "crisp-chat-integration" };
var iu = class {
  constructor(e5) {
    this._instance = e5;
  }
  _loadScript(e5, t2) {
    var i2, s2;
    null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this._instance, e5, (e6) => {
      if (e6) return eu.error("failed to load script", e6);
      t2();
    });
  }
  startIfEnabledOrStop() {
    var e5;
    for (const [r2, n2] of Object.entries(null !== (e5 = this._instance.config.integrations) && void 0 !== e5 ? e5 : {})) {
      var t2, i2, s2;
      n2 && !(null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 || null === (t2 = t2.integrations) || void 0 === t2 ? void 0 : t2[r2]) && this._loadScript(tu[r2], () => {
        var e6;
        null === (e6 = tt.__PosthogExtensions__) || void 0 === e6 || null === (e6 = e6.integrations) || void 0 === e6 || null === (e6 = e6[r2]) || void 0 === e6 || e6.start(this._instance);
      }), !n2 && (null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (i2 = i2.integrations) || void 0 === i2 ? void 0 : i2[r2]) && (null === (s2 = tt.__PosthogExtensions__) || void 0 === s2 || null === (s2 = s2.integrations) || void 0 === s2 || null === (s2 = s2[r2]) || void 0 === s2 || s2.stop());
    }
  }
};
var su = class {
  constructor(e5) {
    this.disabled = false === e5;
    const t2 = gt(e5) ? e5 : {};
    this.thresholdPx = t2.threshold_px || 30, this.timeoutMs = t2.timeout_ms || 1e3, this.clickCount = t2.click_count || 3, this.clicks = [];
  }
  isRageClick(e5, t2, i2) {
    if (this.disabled) return false;
    const s2 = this.clicks[this.clicks.length - 1];
    if (s2 && Math.abs(e5 - s2.x) + Math.abs(t2 - s2.y) < this.thresholdPx && this.timeoutMs > i2 - s2.timestamp) {
      if (this.clicks.push({ x: e5, y: t2, timestamp: i2 }), this.clicks.length === this.clickCount) return true;
    } else this.clicks = [{ x: e5, y: t2, timestamp: i2 }];
    return false;
  }
};
var ru = () => typeof window > "u" ? void 0 : window;
var nu = () => typeof document > "u" ? void 0 : document;
var ou = "$copy_autocapture";
var au = ["password", "hidden", "file", "checkbox", "button", "submit", "reset", "image"];
var lu = Fn("[AutoCapture]");
function cu(e5, t2) {
  return t2.length > e5 ? t2.slice(0, e5) + "..." : t2;
}
function uu(e5) {
  if (e5.previousElementSibling) return e5.previousElementSibling;
  let t2 = e5;
  do {
    t2 = t2.previousSibling;
  } while (t2 && !bo(t2));
  return t2;
}
function du(e5, { e: t2, maskAllElementAttributes: i2, maskAllText: s2, elementAttributeIgnoreList: r2, elementsChainAsString: n2, disableCaptureUrlHashes: o2 }) {
  var a2, l2;
  if (!bo(e5)) return { props: {} };
  const c2 = [e5], u2 = /* @__PURE__ */ new Set([e5]);
  let d2 = e5;
  for (; d2.parentNode && !So(d2, "body") && 1e3 > c2.length; ) {
    if (Eo(d2.parentNode)) {
      const e6 = d2.parentNode.host;
      if (u2.has(e6)) break;
      u2.add(e6), c2.push(e6), d2 = e6;
      continue;
    }
    if (!bo(d2.parentNode)) break;
    if (u2.has(d2.parentNode)) break;
    u2.add(d2.parentNode), c2.push(d2.parentNode), d2 = d2.parentNode;
  }
  const h2 = "click" === t2.type && "http://www.w3.org/2000/svg" === e5.namespaceURI ? c2.findIndex((e6) => So(e6, "button") || So(e6, "a")) : -1;
  h2 > 0 && (s2 = s2 || c2.slice(0, h2 + 1).some((e6) => !Ko(e6) || Qo(e6)));
  const _2 = [], p2 = {};
  let g2, v2 = false, f2 = false;
  if (Rn(c2, (e6) => {
    const t3 = Ko(e6);
    if (So(e6, "a") && !i2 && !(null == r2 ? void 0 : r2.includes("href"))) {
      const i3 = e6.getAttribute("href");
      v2 = !!(t3 && i3 && sa(i3)) && (o2 ? es(i3) : i3);
    }
    ot(xo(e6), "ph-no-capture") && (f2 = true), _2.push((function(e7, t4, i3, s3, r3 = false) {
      const n3 = e7.tagName.toLowerCase(), o3 = { tag_name: n3 };
      To.indexOf(n3) > -1 && !i3 && (o3.$el_text = "a" === n3.toLowerCase() || "button" === n3.toLowerCase() ? cu(1024, ra(e7)) : cu(1024, Io(e7)));
      const a3 = xo(e7);
      t4 || (null == s3 ? void 0 : s3.includes("class")) || 0 >= a3.length || (o3.classes = a3.filter(function(e8) {
        return "" !== e8;
      })), Rn(e7.attributes, function(i4) {
        var n4;
        if ((!Qo(e7) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i4.name)) && !(null == s3 ? void 0 : s3.includes(i4.name)) && !t4 && sa(i4.value) && (!mt(n4 = i4.name) || "_ngcontent" !== n4.substring(0, 10) && "_nghost" !== n4.substring(0, 7))) {
          let e8 = i4.value;
          "class" === i4.name && (e8 = Co(e8).join(" ")), o3["attr__" + i4.name] = cu(1024, "href" === i4.name && r3 ? es(e8) : e8);
        }
      });
      let l3 = 1, c3 = 1, u3 = e7;
      for (; u3 = uu(u3); ) l3++, u3.tagName === e7.tagName && c3++;
      return o3.nth_child = l3, o3.nth_of_type = c3, o3;
    })(e6, i2, s2, r2, o2)), Rn((function(e7) {
      if (!Ko(e7)) return {};
      const t4 = {};
      return Rn(e7.attributes, function(e8) {
        if (e8.name && 0 === e8.name.indexOf("data-ph-capture-attribute")) {
          const i3 = e8.name.replace("data-ph-capture-attribute-", ""), s3 = e8.value;
          i3 && s3 && sa(s3) && (t4[i3] = s3);
        }
      }), t4;
    })(e6), (e7, t4) => {
      ({}).hasOwnProperty.call(p2, t4) || (p2[t4] = e7);
    });
  }), f2) return { props: {}, explicitNoCapture: f2 };
  if (h2 > 0 && (e5 = c2[h2], _2.splice(0, h2)), s2 || (_2[0].$el_text = So(e5, "a") || So(e5, "button") ? ra(e5) : Io(e5)), v2) {
    var m2, y2;
    _2[0].attr__href = v2;
    const e6 = null === (m2 = Ea(v2)) || void 0 === m2 ? void 0 : m2.host, t3 = null === (y2 = ru()) || void 0 === y2 || null === (y2 = y2.location) || void 0 === y2 ? void 0 : y2.host;
    e6 && t3 && e6 !== t3 && (g2 = v2);
  }
  return { props: $n((S2 = t2.type, { $event_type: S2, $ce_version: 1 }), n2 ? {} : { $elements: _2 }, { $elements_chain: (b2 = _2, _t(b2) ? (function(e6) {
    return e6.map((e7) => {
      var t3, i3;
      let s3 = "";
      if (e7.tag_name && (s3 += e7.tag_name), e7.attr_class) {
        e7.attr_class.sort();
        for (const t4 of e7.attr_class) s3 += `.${t4.replace(/"/g, "")}`;
      }
      const r3 = ls(ls(ls(ls({}, e7.text ? { text: e7.text } : {}), {}, { "nth-child": null !== (t3 = e7.nth_child) && void 0 !== t3 ? t3 : 0, "nth-of-type": null !== (i3 = e7.nth_of_type) && void 0 !== i3 ? i3 : 0 }, e7.href ? { href: e7.href } : {}), e7.attr_id ? { attr_id: e7.attr_id } : {}), e7.attributes), n3 = {};
      return An(r3).sort(([e8], [t4]) => (function(e9, t5) {
        return t5 > e9 ? -1 : e9 > t5 ? 1 : 0;
      })(e8, t4)).forEach(([e8, t4]) => n3[oa(e8.toString())] = oa(t4.toString())), s3 += ":", s3 += An(n3).map(([e8, t4]) => `${e8}="${t4}"`).join(""), s3;
    }).join(";");
  })((function(e6) {
    return e6.map((e7) => {
      var t3, i3;
      const s3 = { text: null === (t3 = e7.$el_text) || void 0 === t3 ? void 0 : t3.slice(0, 400), tag_name: e7.tag_name, href: null === (i3 = e7.attr__href) || void 0 === i3 ? void 0 : i3.slice(0, 2048), attr_class: aa(e7), attr_id: e7.attr__id, nth_child: e7.nth_child, nth_of_type: e7.nth_of_type, attributes: {} };
      return An(e7).filter(([e8]) => 0 === e8.indexOf("attr__")).forEach(([e8, t4]) => s3.attributes[e8] = t4), s3;
    });
  })(b2)) : "") }, (null === (a2 = _2[0]) || void 0 === a2 ? void 0 : a2.$el_text) ? { $el_text: null === (l2 = _2[0]) || void 0 === l2 ? void 0 : l2.$el_text } : {}, g2 && "click" === t2.type ? { $external_click_url: g2 } : {}, p2), target: e5 };
  var b2, S2;
}
var hu = "autocapture";
var _u = class {
  _clearPointer() {
    this._pointerDown = void 0, clearTimeout(this._pointerExpiry), this._pointerExpiry = void 0;
  }
  _isExcludedPointerTarget(e5) {
    var t2;
    if (!Ko(e5)) return true;
    const i2 = null !== (t2 = this._refreshConfig().css_selector_ignorelist) && void 0 !== t2 ? t2 : Mo, s2 = /* @__PURE__ */ new Set();
    let r2 = e5;
    for (; r2; ) {
      if (s2.size >= 1e3 || s2.has(r2)) return true;
      s2.add(r2);
      const e6 = r2, t3 = xo(e6);
      if (ot(t3, "ph-no-capture") || ot(t3, "ph-sensitive") || Qo(e6) || i2.some((t4) => Ro(e6, t4))) return true;
      const n2 = r2.parentNode;
      r2 = Eo(n2) ? n2.host : n2 && bo(n2) ? n2 : null;
    }
    return false;
  }
  _trackPointer(e5) {
    if (!this.isEnabled || "pointercancel" === e5.type) return void this._clearPointer();
    if ("pointerdown" === e5.type) {
      var t2;
      this._clearPointer();
      const i3 = Fo(e5);
      return void (e5.isPrimary && 0 === e5.button && !e5.ctrlKey && i3 && bo(i3) && (this._pointerDown = { target: i3, excluded: this._isExcludedPointerTarget(i3), id: e5.pointerId, x: e5.clientX, y: e5.clientY, released: false, distinctId: null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.distinctId }));
    }
    const i2 = this._pointerDown;
    i2 && (e5.pointerId !== i2.id || Math.abs(e5.clientX - i2.x) > 5 || Math.abs(e5.clientY - i2.y) > 5 ? this._clearPointer() : "pointerup" === e5.type && (i2.released = true, this._pointerExpiry = setTimeout(() => this._clearPointer(), 0)));
  }
  _recoverClickTarget(e5) {
    var t2;
    const i2 = this._pointerDown;
    this._clearPointer();
    const s2 = Fo(e5);
    if ((null == i2 ? void 0 : i2.released) && i2.target.isConnected && i2.distinctId === (null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.distinctId) && e5.pointerId === i2.id && (e5.detail > 0 || "touch" === e5.pointerType || "pen" === e5.pointerType) && 0 === e5.button && 5 >= Math.abs(e5.clientX - i2.x) && 5 >= Math.abs(e5.clientY - i2.y) && s2 && (So(s2, "html") || So(s2, "body"))) {
      var r2, n2, o2;
      if (i2.excluded) return null;
      const e6 = null !== (r2 = this._refreshConfig().css_selector_ignorelist) && void 0 !== r2 ? r2 : Mo;
      return [s2, null === (n2 = nu()) || void 0 === n2 ? void 0 : n2.documentElement, null === (o2 = nu()) || void 0 === o2 ? void 0 : o2.body].some((t3) => {
        if (!t3) return false;
        const i3 = xo(t3);
        return ot(i3, "ph-no-capture") || ot(i3, "ph-sensitive") || !Ko(t3) || Qo(t3) || e6.some((e7) => Ro(t3, e7));
      }) ? null : i2.target;
    }
  }
  constructor(e5) {
    this._configSource = e5, this.name = hu, this._initialized = false, this._isDisabledServerSide = null, this._hasReceivedConfigResponse = false, this._elementSelectorsByOwner = /* @__PURE__ */ new Map(), this._elementsChainAsString = false, this._config = { enabled: false, rageclick: false, maskAllElementAttributes: false, maskAllText: false, disableCaptureUrlHashes: false, remoteRequestsDisabled: false }, this._disposed = false, this._configSource.refresh(this._config), this.rageclicks = new su(this._config.rageclick), this._elementSelectors = null;
  }
  setup(e5) {
    this._compileUrlPatterns(), this._client = e5;
    const t2 = e5.onRemoteConfig(this.onRemoteConfig.bind(this));
    this._disposed ? t2.dispose() : (this._remoteConfigSubscription = t2, this.startIfEnabled());
  }
  dispose() {
    var e5;
    this._disposed || (this._disposed = true, this._client = void 0, null === (e5 = this._remoteConfigSubscription) || void 0 === e5 || e5.dispose(), this._remoteConfigSubscription = void 0, this._elementSelectorsByOwner.clear(), this._elementSelectors = null, this._removeDomEventHandlers());
  }
  _refreshConfig() {
    return this._configSource.refresh(this._config), this._config;
  }
  _compileUrlPatterns() {
    var e5, t2;
    return this._refreshConfig(), this._config.url_allowlist = null === (e5 = this._config.url_allowlist) || void 0 === e5 ? void 0 : e5.map((e6) => new RegExp(e6)), this._config.url_ignorelist = null === (t2 = this._config.url_ignorelist) || void 0 === t2 ? void 0 : t2.map((e6) => new RegExp(e6)), this._config;
  }
  _addDomEventHandlers() {
    const e5 = ru(), t2 = nu();
    if (!this.isBrowserSupported()) return void lu.info("Disabling Automatic Event Collection because this browser is not supported");
    if (!e5 || !t2) return;
    this._listenerWindow = e5, this._listenerDocument = t2;
    const i2 = this._domEventHandler = (t3) => {
      t3 = t3 || (null == e5 ? void 0 : e5.event);
      try {
        if ("blur" === t3.type) return void this._clearPointer();
        if (0 === t3.type.indexOf("pointer")) return void this._trackPointer(t3);
        const e6 = "click" === t3.type ? this._recoverClickTarget(t3) : void 0;
        if (bt(e6)) return;
        this._captureEvent(t3, "$autocapture", e6);
      } catch (e6) {
        lu.error("Failed to capture event", e6);
      }
    };
    if (Bn(e5, "blur", i2), Bn(t2, "submit", i2, { capture: true }), Bn(t2, "change", i2, { capture: true }), Bn(t2, "click", i2, { capture: true }), Rn(["pointerdown", "pointermove", "pointerup", "pointercancel"], (e6) => {
      Bn(t2, e6, i2, { capture: true });
    }), this._refreshConfig().capture_copied_text) {
      const i3 = this._copiedTextHandler = (t3) => {
        t3 = t3 || (null == e5 ? void 0 : e5.event);
        try {
          this._captureEvent(t3, ou);
        } catch (e6) {
          lu.error("Failed to capture clipboard event", e6);
        }
      };
      Bn(t2, "copy", i3, { capture: true }), Bn(t2, "cut", i3, { capture: true }), Bn(t2, "paste", i3, { capture: true });
    }
  }
  _removeDomEventHandlers() {
    const e5 = this._listenerWindow, t2 = this._listenerDocument;
    this._clearPointer(), this._domEventHandler && (null == e5 || e5.removeEventListener("blur", this._domEventHandler), Rn(["pointerdown", "pointermove", "pointerup", "pointercancel"], (e6) => {
      null == t2 || t2.removeEventListener(e6, this._domEventHandler, true);
    }), null == t2 || t2.removeEventListener("submit", this._domEventHandler, true), null == t2 || t2.removeEventListener("change", this._domEventHandler, true), null == t2 || t2.removeEventListener("click", this._domEventHandler, true), this._domEventHandler = void 0), this._copiedTextHandler && (null == t2 || t2.removeEventListener("copy", this._copiedTextHandler, true), null == t2 || t2.removeEventListener("cut", this._copiedTextHandler, true), null == t2 || t2.removeEventListener("paste", this._copiedTextHandler, true), this._copiedTextHandler = void 0), this._listenerWindow = void 0, this._listenerDocument = void 0, this._initialized = false;
  }
  startIfEnabled() {
    this.isEnabled || this._clearPointer(), !this._disposed && this._client && this.isEnabled && !this._initialized && (this._addDomEventHandlers(), this._initialized = true);
  }
  onRemoteConfig(e5) {
    if (this._disposed) return;
    if (this._hasReceivedConfigResponse = true, !e5.ok) return void this.startIfEnabled();
    const t2 = e5.config;
    t2.elementsChainAsString && (this._elementsChainAsString = t2.elementsChainAsString);
    const i2 = t2.autocapture_opt_out;
    var s2;
    Ct(i2) && (null === (s2 = this._client) || void 0 === s2 || s2.kv.set("$autocapture_disabled_server_side", i2), this._isDisabledServerSide = i2), this.startIfEnabled();
  }
  setElementSelectors(e5, t2 = this) {
    if (this._disposed) return;
    e5.size ? this._elementSelectorsByOwner.set(t2, new Set(e5)) : this._elementSelectorsByOwner.delete(t2);
    const i2 = /* @__PURE__ */ new Set();
    this._elementSelectorsByOwner.forEach((e6) => {
      e6.forEach((e7) => i2.add(e7));
    }), this._elementSelectors = i2;
  }
  getElementSelectors(e5, t2) {
    var i2;
    const s2 = [];
    return null === (i2 = this._elementSelectors) || void 0 === i2 || i2.forEach((i3) => {
      var r2;
      const n2 = null === (r2 = nu()) || void 0 === r2 ? void 0 : r2.querySelectorAll(i3);
      null == n2 || n2.forEach((r3) => {
        e5 !== r3 && t2 !== r3 || ot(s2, i3) || s2.push(i3);
      });
    }), s2;
  }
  get isEnabled() {
    var e5, t2;
    if (this._disposed) return false;
    const i2 = null === (e5 = this._client) || void 0 === e5 ? void 0 : e5.kv.get(y), s2 = this._isDisabledServerSide, r2 = this._refreshConfig();
    if (!r2.remoteRequestsDisabled && !this._hasReceivedConfigResponse) return false;
    const n2 = r2.remoteRequestsDisabled && !this._hasReceivedConfigResponse;
    if (bt(s2) && !Ct(i2) && !n2) return false;
    const o2 = null !== (t2 = this._isDisabledServerSide) && void 0 !== t2 ? t2 : !!i2;
    return !!r2.enabled && !o2;
  }
  _captureEvent(e5, t2 = "$autocapture", i2) {
    if (!this.isEnabled) return void this._clearPointer();
    let s2 = i2 || Fo(e5);
    wo(s2) && (s2 = s2.parentNode || null);
    const r2 = this._compileUrlPatterns();
    var n2;
    "$autocapture" === t2 && "click" === e5.type && e5 instanceof MouseEvent && r2.rageclick && (null === (n2 = this.rageclicks) || void 0 === n2 ? void 0 : n2.isRageClick(e5.clientX, e5.clientY, e5.timeStamp || (/* @__PURE__ */ new Date()).getTime())) && Wo(s2, r2.rageclick) && this._captureEvent(e5, "$rageclick", i2);
    const o2 = t2 === ou, a2 = o2 ? ls(ls({}, r2), {}, { dom_event_allowlist: void 0 }) : r2;
    if (s2 && (function(e6, t3, i3, s3, r3, n3) {
      var o3;
      const a3 = typeof window > "u" ? void 0 : window;
      if (!a3 || Vo(e6)) return false;
      if ((null == i3 ? void 0 : i3.url_allowlist) && !ko(i3.url_allowlist, n3)) return false;
      if ((null == i3 ? void 0 : i3.url_ignorelist) && ko(i3.url_ignorelist, n3)) return false;
      if (null == i3 ? void 0 : i3.dom_event_allowlist) {
        const e7 = i3.dom_event_allowlist;
        if (e7 && !e7.some((e8) => t3.type === e8)) return false;
      }
      const { parentIsUsefulElement: l3, targetElementList: c3 } = Go(e6, s3);
      if (!(function(e7, t4) {
        const i4 = null == t4 ? void 0 : t4.element_allowlist;
        if (ft(i4)) return true;
        for (const t5 of e7) if (i4.some((e8) => t5.tagName.toLowerCase() === e8)) return true;
        return false;
      })(c3, i3)) return false;
      if (!$o(c3, null == i3 ? void 0 : i3.css_selector_allowlist)) return false;
      if ($o(c3, null !== (o3 = null == i3 ? void 0 : i3.css_selector_ignorelist) && void 0 !== o3 ? o3 : Mo)) return false;
      try {
        const i4 = a3.getComputedStyle(e6);
        if (i4 && "pointer" === i4.getPropertyValue("cursor") && "click" === t3.type) return true;
      } catch (e7) {
      }
      const u3 = e6.tagName.toLowerCase();
      switch (u3) {
        case "html":
          return false;
        case "form":
          return (r3 || ["submit"]).indexOf(t3.type) >= 0;
        case "input":
        case "select":
        case "textarea":
          return (r3 || ["change", "click"]).indexOf(t3.type) >= 0;
        default:
          return l3 ? (r3 || ["click"]).indexOf(t3.type) >= 0 : (r3 || ["click"]).indexOf(t3.type) >= 0 && (To.indexOf(u3) > -1 || "true" === e6.getAttribute("contenteditable"));
      }
    })(s2, e5, a2, o2, o2 ? ["copy", "cut", "paste"] : void 0, { config: { get_current_url: r2.getCurrentUrl } })) {
      var l2;
      const { props: i3, explicitNoCapture: n3, target: o3 } = du(s2, { e: e5, maskAllElementAttributes: r2.maskAllElementAttributes, maskAllText: r2.maskAllText, elementAttributeIgnoreList: r2.element_attribute_ignorelist, elementsChainAsString: this._elementsChainAsString, disableCaptureUrlHashes: r2.disableCaptureUrlHashes });
      if (n3) return false;
      const a3 = this.getElementSelectors(s2, o3);
      if (a3 && a3.length > 0 && (i3.$element_selectors = a3), t2 === ou) {
        const t3 = e5.type || "clipboard";
        if ("paste" !== t3) {
          var c2, u2;
          const e6 = null === (c2 = ru()) || void 0 === c2 || null === (c2 = c2.getSelection()) || void 0 === c2 ? void 0 : c2.toString(), t4 = Po(e6);
          if (!t4) return false;
          i3.$selected_content = t4, i3.$clipboard_text_length = null !== (u2 = null == e6 ? void 0 : e6.length) && void 0 !== u2 ? u2 : 0;
        }
        i3.$copy_type = t3;
      }
      if ("$autocapture" === t2 && "change" === e5.type && r2.capture_value_css_selector_allowlist && !r2.maskAllText && (So(d2 = s2, "input") ? !ot(au, d2.type) : So(d2, "textarea") || So(d2, "select") && !d2.multiple) && (function(e6, t3) {
        var i4;
        if (!Ko(e6)) return false;
        const s3 = null !== (i4 = t3.css_selector_ignorelist) && void 0 !== i4 ? i4 : Mo, r3 = /* @__PURE__ */ new Set();
        let n4 = e6;
        for (So(e6, "select") && (n4 = e6.options[e6.selectedIndex] || e6); n4; ) {
          const e7 = n4, t4 = xo(e7);
          if (r3.size >= 1e3 || r3.has(n4) || ot(t4, "ph-sensitive") || ot(t4, "ph-no-capture") || s3.some((t5) => Ro(e7, t5))) return false;
          r3.add(n4);
          const i5 = n4.assignedSlot || n4.parentNode;
          n4 = Eo(i5) ? i5.host : i5 && bo(i5) ? i5 : null;
        }
        return true;
      })(s2, r2) && !s2.querySelector(".ph-no-capture, .ph-sensitive")) {
        const e6 = r2.capture_value_css_selector_allowlist;
        let t3 = false;
        try {
          t3 = pt(e6) ? !!e6(s2) : _t(e6) && e6.some((e7) => Ro(s2, e7));
        } catch (e7) {
          lu.error("capture_value_css_selector_allowlist threw", e7);
        }
        t3 && (i3.$input_value = s2.value);
      }
      return null === (l2 = this._client) || void 0 === l2 || l2.capture(t2, i3), true;
    }
    var d2;
  }
  isBrowserSupported() {
    var e5;
    return pt(null === (e5 = nu()) || void 0 === e5 ? void 0 : e5.querySelectorAll);
  }
};
var pu = "featureFlags";
var gu = "logs";
var vu = class {
  constructor(e5) {
    this._instance = e5;
  }
  initialize() {
  }
  get(e5) {
    const t2 = this._instance.persistence;
    if ("string" == typeof e5) return null == t2 ? void 0 : t2.get_property(e5);
    const i2 = {};
    for (const s2 of e5) {
      const e6 = null == t2 ? void 0 : t2.get_property(s2);
      ft(e6) || (i2[s2] = e6);
    }
    return i2;
  }
  set(e5, t2) {
    var i2;
    null === (i2 = this._instance.persistence) || void 0 === i2 || i2.register("string" == typeof e5 ? { [e5]: t2 } : e5);
  }
  remove(e5) {
    var t2;
    null === (t2 = this._instance.persistence) || void 0 === t2 || t2.unregister(e5);
  }
};
var fu = class {
  constructor(e5) {
    this.instance = e5, this._logger = In, this.kv = new vu(e5), this.onSession = (e6) => vl(this.instance.onSessionId((t2) => {
      try {
        e6(t2);
      } catch (e7) {
        this._logger.error("Browser extension session listener failed", e7);
      }
    })), this.onEvent = (e6) => vl(this.instance._addCaptureHook((t2, i2) => {
      if (i2) try {
        e6({ event: t2, properties: i2.properties });
      } catch (e7) {
        this._logger.error("Browser extension event listener failed", e7);
      }
    })), this.onRemoteConfig = (e6) => {
      const t2 = (t3) => {
        try {
          e6(t3);
        } catch (e7) {
          this._logger.error("Browser extension remote config listener failed", e7);
        }
      }, i2 = this.instance._internalEventEmitter.on("extensionsRemoteConfig", t2);
      return this.instance._lastRemoteConfig && t2(this.instance._lastRemoteConfig), vl(i2);
    };
  }
  get logger() {
    return this._logger;
  }
  get distinctId() {
    return this.instance.get_distinct_id();
  }
  get anonymousId() {
    var e5;
    return null !== (e5 = this.instance.get_property("$device_id")) && void 0 !== e5 ? e5 : this.distinctId;
  }
  get deviceId() {
    const e5 = this.instance.get_property(I);
    return "string" == typeof e5 ? e5 : void 0;
  }
  get library() {
    return { name: i.LIB_NAME, version: i.LIB_VERSION };
  }
  get initialPersonProperties() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.get_initial_props()) && void 0 !== e5 ? e5 : {};
  }
  get groups() {
    return this.instance.getGroups();
  }
  get session() {
    try {
      var e5, t2, i2, s2, r2;
      const n2 = null === (e5 = this.instance.sessionManager) || void 0 === e5 ? void 0 : e5.checkAndGetSessionAndWindowId(true);
      return { sessionId: null !== (t2 = null == n2 ? void 0 : n2.sessionId) && void 0 !== t2 ? t2 : "", windowId: null !== (i2 = null == n2 ? void 0 : n2.windowId) && void 0 !== i2 ? i2 : "", sessionStartTimestamp: null !== (s2 = null == n2 ? void 0 : n2.sessionStartTimestamp) && void 0 !== s2 ? s2 : 0, lastActivityTimestamp: null !== (r2 = null == n2 ? void 0 : n2.lastActivityTimestamp) && void 0 !== r2 ? r2 : 0 };
    } catch (e6) {
      return { sessionId: "", windowId: "", sessionStartTimestamp: 0, lastActivityTimestamp: 0 };
    }
  }
  get isOptedOut() {
    return this.instance.has_opted_out_capturing();
  }
  get canCapture() {
    return pt(this.instance.is_capturing) ? this.instance.is_capturing() : !this.isOptedOut;
  }
  get projectToken() {
    return this.instance.config.token;
  }
  getExtension(e5) {
    let t2;
    switch (e5) {
      case pu:
      case "featureFlagsCommon":
        t2 = this.instance.featureFlags;
        break;
      case gu:
        t2 = this.instance.logs;
        break;
      case "surveys":
        t2 = this.instance.surveys;
        break;
      case hu:
        t2 = this.instance.autocapture;
    }
    return t2;
  }
  capture(e5, t2, i2) {
    if (!i2) return void this.instance.capture(e5, t2);
    const s2 = ls({ timestamp: i2.timestamp, uuid: i2.uuid, $set: i2.set, $set_once: i2.setOnce }, "unload" === i2.delivery ? { transport: "sendBeacon", send_instantly: true } : {});
    this.instance.capture(e5, t2, s2);
  }
  registerDynamicEventProperties(e5) {
    return vl(this.instance._registerExtensionEventProperties(e5));
  }
  sendRequest(e5) {
    var t2 = this;
    return Lt(function* (e6, i2 = {}) {
      var s2;
      const r2 = null !== (s2 = i2.target) && void 0 !== s2 ? s2 : "api", n2 = i2.query ? uc(e6, i2.query) : e6, o2 = t2.instance.requestRouter.endpointFor(r2, n2), a2 = { method: i2.method, url: o2, data: i2.body, headers: i2.headers, timeout: i2.timeoutMs, fireCallbackOnDrop: true, transport: i2.transport, compression: i2.compression, compressionFallback: "flags" === i2.target && "best-available" === i2.compression ? st.Base64 : void 0, timestampMode: i2.sentAt };
      return "api" === r2 && "/i/v1/logs" === e6 && (a2.batchKey = "logs"), "sendBeacon" === i2.transport ? (t2.instance._send_request(a2), { statusCode: 202 }) : new Promise((e7) => {
        a2.callback = e7, t2.instance._send_request(a2);
      });
    }).apply(this, arguments);
  }
};
var mu = {};
var yu = 0;
var bu = () => {
};
var Su = 'Consent opt in/out is not valid with cookieless_mode="always" and will be ignored';
var wu = "Surveys module not available";
var Eu = "sanitize_properties is deprecated. Use before_send instead";
var Cu = "Invalid value for property_denylist config: ";
var ku = ["$recording_status", "$sdk_debug_recording_script_not_loaded", "$sdk_debug_replay_url_trigger_status", "$sdk_debug_replay_event_trigger_status", "$sdk_debug_replay_linked_flag_trigger_status", "$sdk_debug_replay_rrweb_error", "$sdk_debug_replay_internal_buffer_length", "$sdk_debug_replay_flushed_size"];
var xu = ["$feature_flag_called", "$$heatmap", "$snapshot"];
var Pu = (e5) => "$" === e5.charAt(0) && !ot(xu, e5);
var Iu = /^[A-Za-z0-9_-]{1,400}$/;
var Fu = /^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)?$/;
var Tu = /^fb\.[0-9]+\.[0-9]+\.[0-9]+$/;
var Ru = ["token", "distinct_id", Ee];
var $u = "posthog";
var Au = [...Oc].sort()[Oc.length - 1];
var Mu = (e5) => {
  const t2 = {};
  return e5 && "unset" !== e5 ? ("2025-11-30" > e5 || (t2.strictMinimumDuration = true), "2026-05-30" > e5 || (t2.canvasCapture = { resolutionScale: 0.6 }), "2026-06-25" > e5 || (t2.streamNetworkBody = true), "2026-08-30" > e5 || (t2.captureJsonLd = true), t2) : t2;
};
var Ou = (e5) => {
  var t2;
  return ls({ api_host: "https://us.i.posthog.com", flags_api_host: null, ui_host: null, asset_host: null, token: "", autocapture: true, cross_subdomain_cookie: Nn(null == Ge ? void 0 : Ge.location), persistence: "localStorage+cookie", persistence_name: "", cookie_persisted_properties: [], loaded: bu, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageleave: "if_capture_pageview", defaults: null != e5 ? e5 : "unset", __preview_deferred_init_extensions: false, __preview_replay_sync_fetch: true, __preview_external_dependency_versioned_paths: false, __preview_cookie_wins_on_conflict: false, debug: Ke && mt(null == Ke ? void 0 : Ke.search) && -1 !== Ke.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_surveys_automatic_display: false, disable_conversations: false, disable_product_tours: false, disableDeviceModel: false, reuseAnonymousId: false, disable_external_dependency_loading: false, strict_script_versioning: "fallback", enable_recording_console_log: void 0, secure_cookie: "https:" === (null == je || null === (t2 = je.location) || void 0 === t2 ? void 0 : t2.protocol), ip: false, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", consent_persistence_name: null, opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_flags: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_only_evaluate_survey_feature_flags: false, advanced_feature_flags_dedup_per_session: false, advanced_enable_surveys: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, feature_flag_request_max_retries: 1, surveys_request_timeout_ms: 1e4, on_request_error(e6) {
    In.error("Bad HTTP status: " + e6.statusCode + " " + e6.text);
  }, get_device_id: (e6) => e6, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: Ne, before_send: void 0, get_current_url: void 0, request_queue_config: { flush_interval_ms: 3e3 }, error_tracking: {}, _onCapture: bu }, ((e6) => ({ rageclick: e6 && e6 >= "2026-05-30" ? { content_ignorelist: Lo, ignore_text_selection: true } : !e6 || "2025-11-30" > e6 || { content_ignorelist: true }, capture_pageview: !e6 || "2025-05-24" > e6 || "history_change", session_recording: Mu(e6), external_scripts_inject_target: e6 && e6 >= "2026-01-30" ? "head" : "body", internal_or_test_user_hostname: e6 && e6 >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0, persistence_save_debounce_ms: e6 && e6 >= "2026-05-30" ? 250 : 0, split_storage: !(!e6 || "2026-05-30" > e6), detect_google_search_app: !(!e6 || "2026-05-30" > e6), disable_capture_url_hashes: !(!e6 || "2026-06-25" > e6), cookieWinsOnConflict: !(!e6 || "unset" === e6 || "2026-08-29" > e6) }))(e5));
};
var Lu = [["process_person", "person_profiles"], ["xhr_headers", "request_headers"], ["cookie_name", "persistence_name"], ["disable_cookie", "disable_persistence"], ["__preview_disable_beacon", "disable_beacon"], ["store_google", "save_campaign_params"], ["verbose", "debug"], ["__preview_cookie_wins_on_conflict", "cookieWinsOnConflict"]];
var Du = (e5) => {
  const t2 = {};
  for (const [i3, s3] of Lu) ft(e5[i3]) || (t2[s3] = e5[i3]);
  const i2 = $n({}, t2, e5), s2 = e5.__preview_external_dependency_versioned_paths;
  return ft(s2) || (ft(e5.strict_script_versioning) && (i2.strict_script_versioning = !!s2), mt(s2) && ft(e5.asset_host) && (i2.asset_host = s2)), _t(e5.property_blacklist) && (ft(e5.property_denylist) ? i2.property_denylist = e5.property_blacklist : _t(e5.property_denylist) ? i2.property_denylist = [...e5.property_blacklist, ...e5.property_denylist] : In.error(Cu + e5.property_denylist)), i2;
};
var Nu = class {
  constructor() {
    this.__forceAllowLocalhost = false;
  }
  get _forceAllowLocalhost() {
    return this.__forceAllowLocalhost;
  }
  set _forceAllowLocalhost(e5) {
    In.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e5;
  }
};
var Bu = class e3 {
  _removeExtension(e5) {
    if (!e5) return;
    const t2 = this._extensions.indexOf(e5);
    -1 !== t2 && this._extensions.splice(t2, 1);
  }
  _replaceExtension(e5, t2) {
    var i2;
    return this._removeExtension(e5), this._extensions.push(t2), null === (i2 = t2.initialize) || void 0 === i2 || i2.call(t2), t2;
  }
  _inCookielessMode() {
    return "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isRejected();
  }
  _warnIfVolatileIdentityWithoutStableId() {
    if (this._hasWarnedAboutVolatileIdentity) return;
    if (this.config.reuseAnonymousId) return;
    if (this.config.segment) return;
    if (this._inCookielessMode()) return;
    const e5 = "memory" === this.config.persistence || "sessionStorage" === this.config.persistence;
    if (!e5 && !this.config.disable_persistence) return;
    if (this._hasStableInitialDistinctId) return;
    let t2, i2, s2;
    e5 ? (t2 = `persistence is set to '${this.config.persistence}'`, i2 = "memory" === this.config.persistence ? "on every page load" : "for every new browser tab or window", s2 = "Either set persistence to 'localStorage+cookie', keep this persistence and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId.") : (t2 = "persistence is disabled (disable_persistence is true)", i2 = "on every page load", s2 = "Either set disable_persistence to false, keep persistence disabled and pass a stable ID through bootstrap.distinctID, or enable reuseAnonymousId."), this._hasWarnedAboutVolatileIdentity = true, console.warn("[PostHog.js]", `${t2} but no bootstrap.distinctID was provided. PostHog will mint a new distinct ID ${i2}, so calling identify() merges a new ID onto the person each time. A person can then pass the distinct-ID limit and its events stop appearing on person pages and the session tab. ${s2}`);
  }
  _syncCookielessIdentity() {
    const e5 = this.persistence;
    if (!e5 || this._isConsentTransition) return;
    if (this._inCookielessMode()) return void ("on_reject" === this.config.cookieless_mode && "$posthog_cookieless" !== this.get_distinct_id() && (this._sync_opt_out_with_persistence(), this._enterCookielessMode()));
    if ("$posthog_cookieless" !== this.get_distinct_id()) return;
    this._is_persistence_disabled() || e5.load(true);
    const t2 = this.get_distinct_id();
    if (!t2 || "$posthog_cookieless" === t2) {
      const t3 = this.config.get_device_id(Kn());
      this.register({ distinct_id: t3, $device_id: t3 }), e5.set_property(ge, Le);
    }
    this._sync_opt_out_with_persistence();
  }
  get decideEndpointWasHit() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.hasLoadedFlags) && void 0 !== e5 && e5;
  }
  get flagsEndpointWasHit() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.hasLoadedFlags) && void 0 !== e5 && e5;
  }
  constructor() {
    var t2;
    this._isPageUnloading = false, this._isShutdown = false, this.webPerformance = new Nu(), this._personProcessingSetOncePropertiesSent = false, this.version = i.LIB_VERSION, this._sessionRegisteredPropKeys = /* @__PURE__ */ new Set(), this._sessionRegisteredPropertiesStorageKey = "", this._internalEventEmitter = new Rc(), this._extensions = [], this._extensionEventPropertyProducers = [], this._replayDebugPropertiesPaused = false, this._hasStableInitialDistinctId = false, this._hasWarnedAboutVolatileIdentity = false, this._isConsentTransition = false, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = Ou(), this.SentryIntegration = va, this.sentryIntegration = (e5) => (function(e6, t3) {
      const i2 = ga(e6, t3);
      return { name: pa, processEvent: (e7) => i2(e7) };
    })(this, e5), this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = false, this._visibilityStateListener = null, this._initialPersonProfilesConfig = null, this._cachedPersonProperties = null, this.scrollManager = new Ic(this), this.pageViewManager = new fa(this), this.rateLimiter = new Sl(this), this.requestRouter = new Qc(this), this.consent = new fo(this), this.externalIntegrations = new iu(this);
    const s2 = null !== (t2 = e3.__defaultExtensionClasses) && void 0 !== t2 ? t2 : {};
    this.featureFlags = s2.featureFlags && new s2.featureFlags(this), this.toolbar = s2.toolbar && new s2.toolbar(this), this.surveys = s2.surveys && new s2.surveys(this), this.conversations = s2.conversations && new s2.conversations(this), this.logs = s2.logs && new s2.logs(this), this.metrics = s2.metrics && new s2.metrics(this), this.experiments = s2.experiments && new s2.experiments(this), this.exceptions = s2.exceptions && new s2.exceptions(this), this.people = { set: (e5, t3, i2) => {
      const s3 = mt(e5) ? { [e5]: t3 } : e5;
      this.setPersonProperties(s3), null == i2 || i2({});
    }, set_once: (e5, t3, i2) => {
      const s3 = mt(e5) ? { [e5]: t3 } : e5;
      this.setPersonProperties(void 0, s3), null == i2 || i2({});
    } }, this.on("eventCaptured", (e5) => In.info(`send "${null == e5 ? void 0 : e5.event}"`, e5));
  }
  init(t2, i2, s2) {
    if (s2 && s2 !== $u) {
      var r2;
      const n2 = null !== (r2 = mu[s2]) && void 0 !== r2 ? r2 : new e3();
      return n2._init(t2, i2, s2), mu[s2] = n2, mu[$u][s2] = n2, n2;
    }
    return this._init(t2, i2, s2);
  }
  _init(e5, t2 = {}, s2) {
    var r2, n2, o2;
    const a2 = mt(e5) ? e5.trim() : "";
    if (!a2) return In.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
    var l2;
    if (this.__loaded) return a2 !== (null === (l2 = this.config) || void 0 === l2 ? void 0 : l2.token) ? console.warn("[PostHog.js]", `You have already initialized PostHog with a different project token! Re-initializing is a no-op, so events will keep going to the project this instance was initialized with. To capture into a second project, load PostHog once, then initialize a named instance after the SDK has loaded, e.g. posthog.init('${a2}', { ... }, 'project2')`) : console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
    this.__loaded = true, this.config = Ou(t2.defaults), t2.debug = this._checkLocalStorageForDebug(t2.debug), this._originalUserConfig = t2, this._triggered_notifs = [], t2.person_profiles ? this._initialPersonProfilesConfig = t2.person_profiles : t2.process_person && (this._initialPersonProfilesConfig = t2.process_person);
    const c2 = Ou(t2.defaults), u2 = Du(t2), d2 = $n({}, c2, u2, { name: s2, token: a2 });
    gt(c2.rageclick) && gt(u2.rageclick) && (d2.rageclick = $n({}, c2.rageclick, u2.rageclick)), gt(c2.session_recording) && gt(u2.session_recording) && (d2.session_recording = $n({}, c2.session_recording, u2.session_recording)), this.set_config(d2), this.config.on_xhr_error && In.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = t2.disable_compression ? void 0 : rl.GZipJS;
    const h2 = this._is_persistence_disabled(), _2 = !this._inCookielessMode();
    if (this.persistence = new sl(this.config, h2, true, _2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new sl(ls(ls({}, this.config), {}, { persistence: "sessionStorage" }), h2, false, _2), this._sessionRegisteredPropertiesStorageKey = "ph_" + (this.config.persistence_name || this.config.token) + "_session_registered_properties", "memory" !== this.config.persistence && !h2 && vo._is_supported()) {
      const e6 = vo._parse(this._sessionRegisteredPropertiesStorageKey);
      _t(e6) && e6.forEach((e7) => {
        mt(e7) && this._sessionRegisteredPropKeys.add(e7);
      });
    } else vo._remove(this._sessionRegisteredPropertiesStorageKey);
    const p2 = ls({}, this.persistence.props), g2 = ls({}, this.sessionPersistence.props);
    this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this._requestQueue = new kc((e6, t3) => this._send_retriable_request(e6, t3), this.config.request_queue_config), this._retryQueue = new Pc(this), this.__request_queue = [];
    const v2 = this._inCookielessMode();
    v2 || (this.sessionManager = new Mc(this), this.sessionPropsManager = new Tc(this, this.sessionManager, this.persistence), this.sessionManager.onSessionId((e6, t3, i2) => {
      ((null == i2 ? void 0 : i2.activityTimeout) || (null == i2 ? void 0 : i2.sessionPastMaximumLength) || (null == i2 ? void 0 : i2.crossTabAdoption)) && this._clearSessionRegisteredProps();
    })), this._enrollFeatureFlags(), this.config.__preview_deferred_init_extensions ? (In.info("Deferring extension initialization to improve startup performance"), this._extensionInitTimeout = setTimeout(() => {
      this._extensionInitTimeout = void 0, this._initExtensions(v2);
    }, 0)) : (In.info("Initializing extensions synchronously"), this._initExtensions(v2)), i.DEBUG = i.DEBUG || this.config.debug, i.DEBUG && In.info("Starting in debug mode", { this: this, config: t2, thisC: ls({}, this.config), p: p2, s: g2 }), this.config.identity_distinct_id && !(null === (r2 = t2.bootstrap) || void 0 === r2 ? void 0 : r2.distinctID) && (t2.bootstrap = ls(ls({}, t2.bootstrap), {}, { distinctID: this.config.identity_distinct_id, isIdentifiedID: true }));
    const f2 = null === (n2 = t2.bootstrap) || void 0 === n2 ? void 0 : n2.distinctID;
    if (this._hasStableInitialDistinctId = !!f2 && !yt(f2), null === (o2 = t2.bootstrap) || void 0 === o2 ? void 0 : o2.distinctID) {
      const e6 = t2.bootstrap.distinctID, i2 = this.get_distinct_id(), s3 = this.persistence.get_property(ge);
      if (t2.bootstrap.isIdentifiedID && null != i2 && i2 !== e6 && "anonymous" === s3) this.identify(e6);
      else if (t2.bootstrap.isIdentifiedID && null != i2 && i2 !== e6 && "identified" === s3) In.warn("Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users.");
      else {
        const i3 = this.config.get_device_id(Kn()), s4 = t2.bootstrap.isIdentifiedID ? i3 : e6;
        this.persistence.set_property(ge, t2.bootstrap.isIdentifiedID ? De : Le), this.register({ distinct_id: e6, $device_id: s4 });
      }
    }
    if (v2) this.register_once({ distinct_id: we, $device_id: null }, "");
    else if (!this.get_distinct_id()) {
      const e6 = this.config.get_device_id(Kn());
      this.register_once({ distinct_id: e6, $device_id: e6 }, ""), this.persistence.set_property(ge, Le);
    }
    return Bn(je, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), Bn(je, "pageshow", (e6) => {
      if (this._isPageUnloading = false, !this._isShutdown) {
        var t3;
        if (e6.persisted && this.persistence) {
          const e7 = this.persistence.get_property(P), t4 = this.persistence.get_property(ge);
          this.persistence.load(), this._processCookieIdentityChange() || e7 === this.persistence.get_property("distinct_id") && t4 === this.persistence.get_property("$user_state") || this._processIdentityChange();
        }
        null === (t3 = this._retryQueue) || void 0 === t3 || t3.resume();
      }
    }), t2.segment ? _a(this, () => this._loaded()) : this._loaded(), pt(this.config._onCapture) && this.config._onCapture !== bu && (In.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e6) => this.config._onCapture(e6.event, e6))), this.config.ip && In.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this.config.disableDeviceModel || (function() {
      return Dc.apply(this, arguments);
    })().then((e6) => {
      e6 && this.register({ [F]: e6 });
    }).catch(bu), this;
  }
  _isSharedExtension(e5) {
    const t2 = e5;
    return mt(t2.name) && pt(t2.setup);
  }
  _enrollExtension(e5, t2) {
    var i2 = this;
    this._isSharedExtension(e5) ? t2.push(Lt(function* () {
      try {
        yield e5.setup(i2._getBrowserClientAdapter());
      } catch (i3) {
        In.error(`Failed to set up extension "${e5.name}"`, i3);
        try {
          var t3;
          yield null === (t3 = e5.dispose) || void 0 === t3 ? void 0 : t3.call(e5);
        } catch (t4) {
          In.error(`Failed to dispose extension "${e5.name}"`, t4);
        }
      }
    })) : this._extensions.push(e5);
  }
  _enrollFeatureFlags() {
    var t2, i2, s2, r2 = this;
    const n2 = null !== (t2 = null === (i2 = this.config.__extensionClasses) || void 0 === i2 ? void 0 : i2.featureFlags) && void 0 !== t2 ? t2 : null === (s2 = e3.__defaultExtensionClasses) || void 0 === s2 ? void 0 : s2.featureFlags;
    var o2, a2, l2;
    if (n2) if (this.featureFlags && this.featureFlags instanceof n2 || (null === (o2 = this._featureFlagsReloadingUnsubscribe) || void 0 === o2 || o2.call(this), this._featureFlagsReloadingUnsubscribe = void 0, this.featureFlags = new n2(this)), pt(this.featureFlags.onReloading) && pt(this.featureFlags.setup)) {
      if (!this._featureFlagsReloadingUnsubscribe) {
        this._featureFlagsReloadingUnsubscribe = this.featureFlags.onReloading(() => {
          this._internalEventEmitter.emit("featureFlagsReloading", true);
        });
        const e5 = this.featureFlags;
        Lt(function* () {
          try {
            yield e5.setup(r2._getBrowserClientAdapter());
          } catch (t3) {
            In.error("Failed to set up feature flags", t3);
            const i3 = r2._featureFlagsReloadingUnsubscribe;
            r2._featureFlagsReloadingUnsubscribe = void 0;
            try {
              null == i3 || i3();
            } catch (e6) {
              In.error("Failed to unsubscribe feature flag reloading", e6);
            }
            try {
              yield e5.dispose();
            } catch (e6) {
              In.error("Failed to dispose feature flags", e6);
            }
          }
        })();
      }
    } else null === (a2 = (l2 = this.featureFlags).initialize) || void 0 === a2 || a2.call(l2);
  }
  _initExtensions(t2) {
    const i2 = performance.now(), s2 = ls(ls({}, e3.__defaultExtensionClasses), this.config.__extensionClasses), r2 = [];
    var n2, o2, a2, l2, c2, u2, d2, h2;
    s2.exceptions && this._extensions.push(this.exceptions = null !== (n2 = this.exceptions) && void 0 !== n2 ? n2 : new s2.exceptions(this)), s2.historyAutocapture && this._extensions.push(this.historyAutocapture = new s2.historyAutocapture(this)), s2.tracingHeaders && this._extensions.push(this.tracingHeaders = new s2.tracingHeaders(this)), s2.siteApps && this._extensions.push(this.siteApps = new s2.siteApps(this)), s2.sessionRecording && !t2 && this._extensions.push(this.sessionRecording = new s2.sessionRecording(this)), this.config.disable_scroll_properties || r2.push(() => {
      this.scrollManager.startMeasuringScrollPosition();
    }), s2.autocapture && this._enrollExtension(this.autocapture = new s2.autocapture(this), r2), s2.surveys && this._enrollExtension(this.surveys = null !== (o2 = this.surveys) && void 0 !== o2 ? o2 : new s2.surveys(this), r2), s2.logs && this._enrollExtension(this.logs = null !== (a2 = this.logs) && void 0 !== a2 ? a2 : new s2.logs(this), r2), s2.metrics && this._extensions.push(this.metrics = null !== (l2 = this.metrics) && void 0 !== l2 ? l2 : new s2.metrics(this)), s2.conversations && this._extensions.push(this.conversations = null !== (c2 = this.conversations) && void 0 !== c2 ? c2 : new s2.conversations(this)), s2.productTours && this._extensions.push(this.productTours = new s2.productTours(this)), s2.heatmaps && this._extensions.push(this.heatmaps = new s2.heatmaps(this)), s2.webVitalsAutocapture && this._extensions.push(this.webVitalsAutocapture = new s2.webVitalsAutocapture(this)), s2.exceptionObserver && this._extensions.push(this.exceptionObserver = new s2.exceptionObserver(this)), s2.deadClicksAutocapture && this._extensions.push(this.deadClicksAutocapture = new s2.deadClicksAutocapture(this, ua)), s2.toolbar && this._extensions.push(this.toolbar = null !== (u2 = this.toolbar) && void 0 !== u2 ? u2 : new s2.toolbar(this)), s2.experiments && this._extensions.push(this.experiments = null !== (d2 = this.experiments) && void 0 !== d2 ? d2 : new s2.experiments(this)), s2.webMCP && this._extensions.push(this.webMCP = null !== (h2 = this.webMCP) && void 0 !== h2 ? h2 : new s2.webMCP(this)), this._extensions.forEach((e5) => {
      e5.initialize && r2.push(() => {
        var t3;
        null === (t3 = e5.initialize) || void 0 === t3 || t3.call(e5);
      });
    }), r2.push(() => {
      if (this._pendingRemoteConfig) {
        const e5 = this._pendingRemoteConfig;
        this._pendingRemoteConfig = void 0, this._extensions.forEach((t3) => {
          var i3;
          return null === (i3 = t3.onRemoteConfig) || void 0 === i3 ? void 0 : i3.call(t3, e5);
        });
      }
    }), this._processInitTaskQueue(r2, i2);
  }
  _processInitTaskQueue(e5, t2) {
    for (; e5.length > 0; ) {
      if (this.config.__preview_deferred_init_extensions && performance.now() - t2 >= 30 && e5.length > 0) return void (this._extensionInitTimeout = setTimeout(() => {
        this._extensionInitTimeout = void 0, this._processInitTaskQueue(e5, t2);
      }, 0));
      const i3 = e5.shift();
      if (i3) try {
        i3();
      } catch (e6) {
        In.error("Error initializing extension:", e6);
      }
    }
    const i2 = Math.round(performance.now() - t2);
    this.register_for_session({ [Ce]: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous", [ke]: i2 }), this.config.__preview_deferred_init_extensions && In.info(`PostHog extensions initialized (${i2}ms)`);
  }
  _onRemoteConfig(e5) {
    if (!Ge || !Ge.body) return In.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
      this._onRemoteConfig(e5);
    }, 500);
    if (this.config.__preview_deferred_init_extensions && (this._pendingRemoteConfig = e5), this._lastRemoteConfig = e5, this.compression = void 0, e5.ok) {
      var t2;
      const i2 = e5.config;
      i2.supportedCompression && !this.config.disable_compression && (this.compression = ot(i2.supportedCompression, rl.GZipJS) ? rl.GZipJS : ot(i2.supportedCompression, rl.Base64) ? rl.Base64 : void 0), (null === (t2 = i2.analytics) || void 0 === t2 ? void 0 : t2.endpoint) && (this.analyticsDefaultEndpoint = i2.analytics.endpoint);
    }
    this.set_config({ person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : Ne }), this._internalEventEmitter.emit("extensionsRemoteConfig", e5), this._extensions.forEach((t3) => {
      var i2;
      return null === (i2 = t3.onRemoteConfig) || void 0 === i2 ? void 0 : i2.call(t3, e5);
    });
  }
  _loaded() {
    try {
      this.config.loaded(this);
    } catch (e5) {
      In.critical("`loaded` function failed", e5);
    }
    if (this._start_queue_if_opted_in(), this.config.internal_or_test_user_hostname && (null == Ke ? void 0 : Ke.hostname)) {
      const e5 = Ke.hostname, t2 = this.config.internal_or_test_user_hostname;
      ("string" == typeof t2 ? e5 === t2 : t2.test(e5)) && this.setInternalOrTestUser();
    }
    this.config.capture_pageview && setTimeout(() => {
      (this.consent.isOptedIn() || this._inCookielessMode()) && this._captureInitialPageview();
    }, 1), this._remoteConfigLoader = new El(this), this._remoteConfigLoader.load();
  }
  _start_queue_if_opted_in() {
    var e5;
    this.is_capturing() && this.config.request_batching && (null === (e5 = this._requestQueue) || void 0 === e5 || e5.enable());
  }
  _dom_loaded() {
    this.is_capturing() && Tn(this.__request_queue, (e5) => this._send_retriable_request(e5)), this.__request_queue = [], this._start_queue_if_opted_in();
  }
  _handle_unload() {
    var e5, t2, i2, s2, r2, n2;
    this._isPageUnloading = true, null === (e5 = this.surveys) || void 0 === e5 || null === (t2 = e5.handlePageUnload) || void 0 === t2 || t2.call(e5), null === (i2 = this.metrics) || void 0 === i2 || i2.flush("sendBeacon"), this.config.request_batching ? (this._shouldCapturePageleave() && this.capture(qe), null === (s2 = this.logs) || void 0 === s2 || s2.flushLogs("sendBeacon"), null === (r2 = this._requestQueue) || void 0 === r2 || r2.unload(), null === (n2 = this._retryQueue) || void 0 === n2 || n2.unload()) : this._shouldCapturePageleave() && this.capture(qe, null, { transport: "sendBeacon" });
  }
  _send_request(e5) {
    Cc(this, e5);
  }
  _send_retriable_request(e5, t2) {
    this._retryQueue ? this._retryQueue.retriableRequest(e5, t2) : this._send_request(t2 ? ls(ls({}, e5), {}, { transport: t2 }) : e5);
  }
  _execute_array(e5) {
    yu++;
    try {
      let t2;
      const i2 = [], s2 = [], r2 = [];
      Tn(e5, (e6) => {
        if (e6) if (t2 = e6[0], _t(t2)) r2.push(e6);
        else if (pt(e6)) try {
          e6.call(this);
        } catch (t3) {
          In.error("Error executing queued PostHog call", e6, t3);
        }
        else _t(e6) && "alias" === t2 ? i2.push(e6) : _t(e6) && -1 !== t2.indexOf("capture") && pt(this[t2]) ? r2.push(e6) : s2.push(e6);
      });
      const n2 = function(e6, t3) {
        Tn(e6, function(e7) {
          try {
            if (_t(e7[0])) {
              let i3 = t3;
              Rn(e7, function(e8) {
                i3 = i3[e8[0]].apply(i3, e8.slice(1));
              });
            } else t3[e7[0]].apply(t3, e7.slice(1));
          } catch (t4) {
            In.error("Error executing queued PostHog call", e7, t4);
          }
        });
      };
      n2(i2, this), n2(s2, this), n2(r2, this);
    } finally {
      yu--;
    }
  }
  push(t2) {
    if (yu > 0 && _t(t2) && mt(t2[0])) {
      const i2 = e3.prototype[t2[0]];
      return void (pt(i2) && i2.apply(this, t2.slice(1)));
    }
    this._execute_array([t2]);
  }
  get _facebookClickIdChannel() {
    return { property: A, persistenceKey: M, cookieName: "_fbc", pattern: Fu, register: (e5, t2) => {
      var i2;
      return null === (i2 = this.persistence) || void 0 === i2 ? void 0 : i2.register({ [M]: { value: e5, delivered: t2 } });
    }, unregister: () => {
      var e5;
      return null === (e5 = this.persistence) || void 0 === e5 ? void 0 : e5.unregister(M);
    } };
  }
  get _facebookBrowserIdChannel() {
    return { property: O, persistenceKey: L, cookieName: "_fbp", pattern: Tu, register: (e5, t2) => {
      var i2;
      return null === (i2 = this.persistence) || void 0 === i2 ? void 0 : i2.register({ [L]: { value: e5, delivered: t2 } });
    }, unregister: () => {
      var e5;
      return null === (e5 = this.persistence) || void 0 === e5 ? void 0 : e5.unregister(L);
    } };
  }
  _getPersistedMetaIdentifier(e5) {
    var t2;
    const i2 = null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.get_property(e5.persistenceKey);
    return mt(i2) && e5.pattern.test(i2) ? { value: i2, delivered: false } : gt(i2) && mt(i2.value) && e5.pattern.test(i2.value) ? { value: i2.value, delivered: true === i2.delivered } : void 0;
  }
  _storeMetaIdentifier(e5, t2, i2) {
    return t2 === (null == i2 ? void 0 : i2.value) ? { value: t2, pending: !i2.delivered } : (e5.register(t2, false), { value: t2, pending: true });
  }
  _readMetaCookie(e5) {
    if (!this.config.save_campaign_params || this._inCookielessMode()) return;
    const t2 = qn(e5.cookieName);
    return mt(t2) && e5.pattern.test(t2) ? t2 : void 0;
  }
  _updateFacebookClickId(e5, t2, i2, s2) {
    if (!this.persistence) return;
    const r2 = this._facebookClickIdChannel;
    this.persistence.refreshMetaIdentifiers();
    const n2 = this._getPersistedMetaIdentifier(r2);
    if (s2) return void r2.unregister();
    if (i2) return mt(t2) && Fu.test(t2) ? this._storeMetaIdentifier(r2, t2, n2) : void r2.unregister();
    const o2 = mt(e5) && Iu.test(e5) ? e5 : void 0, a2 = this._readMetaCookie(r2);
    return a2 && ((e6, t3, i3) => {
      const s3 = e6.split(".");
      if (t3) return s3[3] === t3;
      if (!i3) return true;
      const r3 = i3.value.split(".");
      return s3[3] === r3[3] || Number(s3[2]) > Number(r3[2]);
    })(a2, o2, n2) ? this._storeMetaIdentifier(r2, a2, n2) : o2 ? (null == n2 ? void 0 : n2.value.split(".")[3]) === o2 ? { value: n2.value, pending: !n2.delivered } : this._storeMetaIdentifier(r2, `fb.1.${Date.now()}.${o2}`, n2) : n2 ? { value: n2.value, pending: !n2.delivered } : void 0;
  }
  _updateFacebookBrowserId(e5, t2, i2) {
    if (!this.persistence) return;
    const s2 = this._facebookBrowserIdChannel;
    this.persistence.refreshMetaIdentifiers();
    const r2 = this._getPersistedMetaIdentifier(s2);
    if (i2) return void s2.unregister();
    if (t2) return mt(e5) && Tu.test(e5) ? this._storeMetaIdentifier(s2, e5, r2) : void s2.unregister();
    const n2 = this._readMetaCookie(s2);
    return n2 ? this._storeMetaIdentifier(s2, n2, r2) : r2 ? { value: r2.value, pending: !r2.delivered } : void 0;
  }
  _markMetaIdentifierDelivered(e5, t2) {
    if (!this.persistence) return;
    this.persistence.refreshMetaIdentifiers();
    const i2 = this._getPersistedMetaIdentifier(e5);
    (null == i2 ? void 0 : i2.value) !== t2 || i2.delivered || e5.register(t2, true);
  }
  capture(e5, t2, i2) {
    var s2, r2;
    if (!(this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue)) return void In.uninitializedWarning("posthog.capture");
    if (!this.is_capturing()) return void In.info(`Event "${e5}" was not captured because capturing is disabled (opted out or consent pending).`);
    if (ft(e5) || !mt(e5)) return void In.error("No event name provided to posthog.capture");
    if (this._syncCookielessIdentity(), "$snapshot" === e5 && this._inCookielessMode()) return;
    const n2 = !this.config.opt_out_useragent_filter && this._is_bot();
    if (n2 && !this.config.__preview_capture_bot_pageviews) return void In.info(`Event "${e5}" was not captured because the user agent looks like a bot. Set \`opt_out_useragent_filter: true\` to capture it.`);
    const o2 = (null == i2 ? void 0 : i2.skip_client_rate_limiting) ? void 0 : this.rateLimiter.clientRateLimitContext();
    if (null == o2 ? void 0 : o2.isRateLimited) return void In.critical("This capture call is ignored due to client rate limiting.");
    let a2;
    (null == t2 ? void 0 : t2.$current_url) && !mt(null == t2 ? void 0 : t2.$current_url) && (In.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == t2 || delete t2.$current_url), "$exception" !== e5 || (null == i2 ? void 0 : i2._originatedFromCaptureException) || In.warn("Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && (a2 = this.sessionPersistence.update_campaign_params()), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
    const l2 = /* @__PURE__ */ new Date(), c2 = (null == i2 ? void 0 : i2.timestamp) || l2, u2 = Zi(null == i2 ? void 0 : i2.uuid, Kn);
    let d2 = { uuid: u2, event: e5, properties: this.calculateEventProperties(e5, t2 || {}, c2, u2) };
    "$pageview" === e5 && this.config.__preview_capture_bot_pageviews && n2 && (d2.event = "$bot_pageview", d2.properties.$browser_type = "bot"), o2 && (d2.properties.$lib_rate_limit_remaining_tokens = o2.remainingTokens);
    const h2 = "$feature_flag_called" === e5 && false === d2.properties.$feature_flag_has_experiment && true === this.get_property("$minimal_flag_called_events");
    (null == i2 ? void 0 : i2.$set) && !h2 && (d2.$set = null == i2 ? void 0 : i2.$set);
    const _2 = gt(null == t2 ? void 0 : t2.$set) ? t2.$set : void 0, p2 = _t(null == t2 ? void 0 : t2.$unset) ? t2.$unset : [], g2 = (null == i2 ? void 0 : i2.$unset) || [], v2 = (e6) => {
      var t3;
      const s3 = !!(null == i2 ? void 0 : i2.$set) && e6 in i2.$set;
      return { hasProvided: s3 || !!_2 && e6 in _2, provided: s3 ? null == i2 || null === (t3 = i2.$set) || void 0 === t3 ? void 0 : t3[e6] : null == _2 ? void 0 : _2[e6], unset: -1 !== p2.indexOf(e6) || -1 !== g2.indexOf(e6) };
    }, f2 = v2(A), m2 = v2(O), y2 = [{ channel: this._facebookClickIdChannel, hasProvided: f2.hasProvided, update: this._updateFacebookClickId(null == a2 ? void 0 : a2.fbclid, f2.provided, f2.hasProvided, f2.unset) }, { channel: this._facebookBrowserIdChannel, hasProvided: m2.hasProvided, update: this._updateFacebookBrowserId(m2.provided, m2.hasProvided, m2.unset) }];
    for (const { channel: e6, hasProvided: t3, update: i3 } of y2) i3 && true === d2.properties.$process_person_profile && i3.pending && !t3 && !h2 && (d2.$set = ls({ [e6.property]: i3.value }, d2.$set));
    const b2 = null == i2 ? void 0 : i2.$unset;
    b2 && (d2.$unset = b2);
    const S2 = h2 ? void 0 : this._calculate_set_once_properties(null == i2 ? void 0 : i2.$set_once, e5 !== ze, e5 === He);
    if (S2 && (d2.$set_once = S2), (null == i2 ? void 0 : i2._noTruncate) || (w2 = this.config.properties_string_max_length, d2 = (function(e6, t3) {
      const i3 = /* @__PURE__ */ new Set();
      return (function e7(s3, r3) {
        if (s3 !== Object(s3)) return t3 ? t3(s3) : s3;
        if (i3.has(s3)) return;
        let n3;
        if (i3.add(s3), _t(s3)) n3 = [], Tn(s3, (t4) => {
          n3.push(e7(t4));
        });
        else {
          const t4 = {};
          Rn(Ft(s3) ? Ln(s3) : s3, (s4, r4) => {
            i3.has(s4) || (t4[r4] = e7(s4, r4));
          }), n3 = t4;
        }
        return n3;
      })(e6);
    })(d2, (e6) => mt(e6) ? e6.slice(0, w2) : e6)), d2.timestamp = c2, ft(null == i2 ? void 0 : i2.timestamp) || (d2.properties.$event_time_override_provided = true, d2.properties.$event_time_override_system_time = l2), h2 && (d2.properties = ((e6, t3 = []) => {
      const i3 = {}, s3 = (t4) => {
        void 0 !== e6[t4] && (i3[t4] = e6[t4]);
      };
      return sr.forEach(s3), t3.forEach(s3), i3;
    })(d2.properties, Ru)), e5 === _l.DISMISSED || e5 === _l.SENT) {
      const i3 = null == t2 ? void 0 : t2[pl.SURVEY_ID], s3 = null == t2 ? void 0 : t2[pl.SURVEY_ITERATION];
      Yc({ id: i3, current_iteration: s3 }), d2.$set = ls(ls({}, d2.$set), {}, { [Nc({ id: i3, current_iteration: s3 }, e5 === _l.SENT ? "responded" : "dismissed")]: true });
    } else e5 === _l.SHOWN && (d2.$set = ls(ls({}, d2.$set), {}, { [pl.SURVEY_LAST_SEEN_DATE]: (/* @__PURE__ */ new Date()).toISOString() }));
    var w2;
    if (e5 === ml.SHOWN) {
      const e6 = null == t2 ? void 0 : t2[yl.TOUR_TYPE];
      e6 && (d2.$set = ls(ls({}, d2.$set), {}, { [`${yl.TOUR_LAST_SEEN_DATE}/${e6}`]: (/* @__PURE__ */ new Date()).toISOString() }));
    }
    const E2 = ls(ls({}, d2.properties.$set), d2.$set);
    if (vt(E2) || this.setPersonPropertiesForFlags(E2), !St(this.config.before_send)) {
      const e6 = this._runBeforeSend(d2);
      if (!e6) return;
      d2 = e6, d2.uuid = Zi(d2.uuid, Kn);
    }
    this.sessionRecording && !this._replayDebugPropertiesPaused && Pu(e5) && (this._replayDebugPropertiesPaused = true, setTimeout(() => this._replayDebugPropertiesPaused = false, 3e4));
    const C2 = y2.filter(({ channel: e6, update: t3 }) => {
      var i3, s3, r3;
      const n3 = null !== (i3 = null === (s3 = d2.$set) || void 0 === s3 ? void 0 : s3[e6.property]) && void 0 !== i3 ? i3 : gt(null === (r3 = d2.properties) || void 0 === r3 ? void 0 : r3.$set) ? d2.properties.$set[e6.property] : void 0;
      return (null == t3 ? void 0 : t3.pending) && n3 === t3.value;
    });
    this._internalEventEmitter.emit("eventCaptured", d2);
    const k2 = null !== (s2 = null == i2 ? void 0 : i2._url) && void 0 !== s2 ? s2 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), x2 = "recordings" === (null == i2 ? void 0 : i2._batchKey) || /\/s\/(?:\?|$)/.test(k2), P2 = ls(ls(ls({ method: "POST", url: k2, data: d2, compression: "best-available", preferSyncCompression: null == i2 ? void 0 : i2.send_instantly, timestampMode: x2 ? "body" : "capture-body", batchKey: null == i2 ? void 0 : i2._batchKey }, x2 && (null === (r2 = d2.properties) || void 0 === r2 ? void 0 : r2.$session_id) ? { batchGroup: d2.properties.$session_id + (d2.properties.$window_id ? `-${d2.properties.$window_id}` : "") } : {}), (null == i2 ? void 0 : i2.transport) ? { transport: i2.transport } : {}), C2.length ? { fireCallbackOnDrop: true, callback: (e6) => {
      if (e6.statusCode >= 200 && 300 > e6.statusCode) for (const { channel: e7, update: t3 } of C2) this._markMetaIdentifierDelivered(e7, t3.value);
    } } : {});
    if (!this.config.request_batching || i2 && !(null == i2 ? void 0 : i2._batchKey) || (null == i2 ? void 0 : i2.send_instantly)) {
      var I2;
      let e6;
      !P2.transport && !P2.callback && vt(null !== (I2 = this.config.request_headers) && void 0 !== I2 ? I2 : {}) && this._isPageUnloading && (e6 = "sendBeacon"), this._send_retriable_request(P2, e6);
    } else this._requestQueue.enqueue(P2);
    return d2;
  }
  _addCaptureHook(e5) {
    return this.on("eventCaptured", (t2) => e5(t2.event, t2));
  }
  getExtension(e5) {
    var t2;
    return null === (t2 = this._browserClientAdapter) || void 0 === t2 ? void 0 : t2.getExtension(e5);
  }
  _getBrowserClientAdapter() {
    var e5;
    return null !== (e5 = this._browserClientAdapter) && void 0 !== e5 ? e5 : this._browserClientAdapter = new fu(this);
  }
  _registerExtensionEventProperties(e5) {
    this._extensionEventPropertyProducers.push(e5);
    let t2 = true;
    return () => {
      if (!t2) return;
      t2 = false;
      const i2 = this._extensionEventPropertyProducers.indexOf(e5);
      -1 !== i2 && this._extensionEventPropertyProducers.splice(i2, 1);
    };
  }
  _processCookieIdentityChange(e5 = true) {
    var t2;
    return !!(null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.consumeCookieIdentityChange()) && (this._processIdentityChange(e5), true);
  }
  _processIdentityChange(e5 = true) {
    var t2, i2, s2;
    this._cachedPersonProperties = null, "anonymous" === (null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.get_property("$user_state")) && (null === (s2 = this.sessionPersistence) || void 0 === s2 || s2.clear(), this._sessionRegisteredPropKeys.clear(), this._persistSessionRegisteredPropKeys()), null === (i2 = this.featureFlags) || void 0 === i2 || i2.reset(), e5 && this.reloadFeatureFlags();
  }
  calculateEventProperties(e5, i2, s2, r2, n2) {
    if (s2 = s2 || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return i2;
    this._syncCookielessIdentity(), this.persistence.syncCookieProperties(), this._processCookieIdentityChange();
    const o2 = n2 ? void 0 : this.persistence.remove_event_timer(e5);
    let a2 = ls({}, i2);
    if (a2.token = this.config.token, a2.$config_defaults = "latest" === this.config.defaults ? Au : this.config.defaults, this._inCookielessMode() && (a2[Ee] = true), "$snapshot" === e5) {
      const e6 = ls(ls({}, this.persistence.properties()), this.sessionPersistence.properties());
      return a2.distinct_id = e6.distinct_id, (!mt(a2.distinct_id) && !wt(a2.distinct_id) || yt(a2.distinct_id)) && In.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), a2;
    }
    const l2 = (function(e6, i3, s3, r3 = false) {
      var n3, o3, a3, l3;
      if (!Xe) return {};
      const c3 = e6 ? [...Ra, ...i3 || []] : [], [u3, d3] = Ui(Xe), [h3, _3] = (function(e7) {
        for (let t2 = 0; ji.length > t2; t2++) {
          const [i4, s4, r4] = ji[t2], n4 = e7.match(i4);
          if (n4) {
            const t3 = r4 && e7.match(r4) || n4;
            return [s4, (null == t3 ? void 0 : t3[1]) || ""];
          }
        }
        return ["", ""];
      })(Xe), p3 = (function() {
        const e7 = "u" > typeof navigator ? navigator : void 0;
        return (null == e7 ? void 0 : e7.brave) ? { brave: true } : {};
      })(), g3 = {};
      ft(s3) || (g3.detectGoogleSearchApp = s3);
      const v3 = {}, f3 = null === (n3 = navigator) || void 0 === n3 || null === (n3 = n3.userAgentData) || void 0 === n3 ? void 0 : n3.platform, m2 = null === (o3 = navigator) || void 0 === o3 ? void 0 : o3.maxTouchPoints, y2 = null == je || null === (a3 = je.screen) || void 0 === a3 ? void 0 : a3.width, b2 = null == je || null === (l3 = je.screen) || void 0 === l3 ? void 0 : l3.height, S2 = null == je ? void 0 : je.devicePixelRatio;
      ft(f3) || (v3.userAgentDataPlatform = f3), ft(m2) || (v3.maxTouchPoints = m2), ft(y2) || (v3.screenWidth = y2), ft(b2) || (v3.screenHeight = b2), ft(S2) || (v3.devicePixelRatio = S2);
      const w2 = $n(On({ $os: u3, $os_version: d3, $browser: Li(Xe, navigator.vendor, p3, g3), $webview_app: h3, $webview_app_version: _3, $device: qi(Xe), $device_type: Hi(Xe, v3), $timezone: wa(), $timezone_offset: ja() }), { $current_url: Fa(r3 ? es(null == Ke ? void 0 : Ke.href) : null == Ke ? void 0 : Ke.href, c3, Aa), $host: null == Ke ? void 0 : Ke.host, $pathname: null == Ke ? void 0 : Ke.pathname, $raw_user_agent: Xe.length > 1e3 ? Xe.substring(0, 997) + "..." : Xe, $browser_version: Ni(Xe, navigator.vendor, p3, g3), $browser_language: Na(), $browser_language_prefix: Ba(), $screen_height: null == je ? void 0 : je.screen.height, $screen_width: null == je ? void 0 : je.screen.width, $viewport_height: null == je ? void 0 : je.innerHeight, $viewport_width: null == je ? void 0 : je.innerWidth, $lib: t.LIB_NAME, $lib_version: t.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
      return t.SDK_DIST_CHANNEL && (w2.$sdk_dist_channel = t.SDK_DIST_CHANNEL), w2;
    })(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties, this.config.detect_google_search_app, this.config.disable_capture_url_hashes);
    if (this.sessionManager) {
      const { sessionId: e6, windowId: t2 } = this.sessionManager.checkAndGetSessionAndWindowId(n2, s2.getTime(), true);
      a2.$session_id = e6, a2.$window_id = t2;
    }
    this.sessionPropsManager && $n(a2, this.sessionPropsManager.getSessionProps());
    try {
      var c2;
      if (this.sessionRecording) {
        const t2 = this.sessionRecording.sdkDebugProperties, i3 = !this._replayDebugPropertiesPaused && Pu(e5);
        for (const e6 in t2) (i3 || ot(ku, e6)) && (a2[e6] = t2[e6]);
      }
      a2.$sdk_debug_retry_queue_size = null === (c2 = this._retryQueue) || void 0 === c2 ? void 0 : c2.length;
    } catch (e6) {
      a2.$sdk_debug_error_capturing_properties = String(e6);
    }
    let u2;
    if (this.requestRouter.region === Wc && (a2.$lib_custom_api_host = this.config.api_host), u2 = "$pageview" !== e5 || n2 ? "$pageleave" !== e5 || n2 ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(s2) : this.pageViewManager.doPageView(s2, r2), a2 = $n(a2, u2), "$pageview" === e5 && Ge && (a2.title = Ge.title), !ft(o2)) {
      const e6 = s2.getTime() - o2;
      a2.$duration = parseFloat((e6 / 1e3).toFixed(3));
    }
    Xe && this.config.opt_out_useragent_filter && (a2.$browser_type = this._is_bot() ? "bot" : "browser");
    const d2 = this.persistence.properties(), h2 = this.sessionPersistence.properties(), _2 = a2.$groups, p2 = d2.$groups;
    gt(_2) && !vt(_2) && (a2.$groups = ls(ls({}, gt(p2) ? p2 : {}), _2)), Rn(["$referrer", "$referring_domain"], (e6) => {
      e6 in d2 && delete h2[e6];
    });
    const g2 = {};
    if (this._extensionEventPropertyProducers.length > 0) for (const e6 of this._extensionEventPropertyProducers.slice()) try {
      $n(g2, e6());
    } catch (e7) {
      In.error("Failed to produce browser extension event properties", e7);
    }
    a2 = $n({}, l2, d2, h2, ls(ls({}, g2), a2)), a2.$is_identified = this._isIdentified(), _t(this.config.property_denylist) ? Rn(this.config.property_denylist, function(e6) {
      delete a2[e6];
    }) : In.error(Cu + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
    const v2 = this.config.sanitize_properties;
    v2 && (In.error(Eu), a2 = v2(a2, e5));
    const f2 = this._hasPersonProcessing();
    return a2.$process_person_profile = f2, f2 && !n2 && this._requirePersonProcessing("_calculate_event_properties"), a2;
  }
  _calculate_set_once_properties(e5, t2 = true, i2 = false) {
    var s2;
    if (!this.persistence || !this._hasPersonProcessing()) return e5;
    if (this._personProcessingSetOncePropertiesSent && !i2) return e5;
    const r2 = this.persistence.get_initial_props(), n2 = null === (s2 = this.sessionPropsManager) || void 0 === s2 ? void 0 : s2.getSetOnceProps();
    let o2 = $n({}, r2, n2 || {}, e5 || {});
    const a2 = this.config.sanitize_properties;
    return a2 && (In.error(Eu), o2 = a2(o2, "$set_once")), t2 && (this._personProcessingSetOncePropertiesSent = true), vt(o2) ? void 0 : o2;
  }
  register(e5, t2) {
    var i2;
    null === (i2 = this.persistence) || void 0 === i2 || i2.register(e5, t2);
  }
  register_once(e5, t2, i2) {
    var s2;
    null === (s2 = this.persistence) || void 0 === s2 || s2.register_once(e5, t2, i2);
  }
  register_for_session(e5) {
    var t2, i2;
    null === (t2 = this.persistence) || void 0 === t2 || t2.syncCookieProperties(), this._processCookieIdentityChange(), null === (i2 = this.sessionPersistence) || void 0 === i2 || i2.register(e5), Object.keys(e5).forEach((e6) => this._sessionRegisteredPropKeys.add(e6)), this._persistSessionRegisteredPropKeys();
  }
  unregister(e5) {
    var t2;
    null === (t2 = this.persistence) || void 0 === t2 || t2.unregister(e5);
  }
  unregister_for_session(e5) {
    var t2;
    null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.unregister(e5), this._sessionRegisteredPropKeys.delete(e5), this._persistSessionRegisteredPropKeys();
  }
  _register_single(e5, t2) {
    this.register({ [e5]: t2 });
  }
  _clearSessionRegisteredProps() {
    this._sessionRegisteredPropKeys.forEach((e5) => {
      var t2;
      null === (t2 = this.sessionPersistence) || void 0 === t2 || t2.unregister(e5);
    }), this._sessionRegisteredPropKeys.clear(), this._persistSessionRegisteredPropKeys();
  }
  _persistSessionRegisteredPropKeys() {
    var e5;
    if (!this._sessionRegisteredPropertiesStorageKey) return;
    if ("memory" === this.config.persistence || (null === (e5 = this.sessionPersistence) || void 0 === e5 ? void 0 : e5._disabled) || !vo._is_supported()) return void vo._remove(this._sessionRegisteredPropertiesStorageKey);
    const t2 = [];
    this._sessionRegisteredPropKeys.forEach((e6) => t2.push(e6)), t2.length > 0 ? vo._set(this._sessionRegisteredPropertiesStorageKey, t2) : vo._remove(this._sessionRegisteredPropertiesStorageKey);
  }
  getFeatureFlag(e5, t2) {
    var i2;
    return null === (i2 = this.featureFlags) || void 0 === i2 ? void 0 : i2.getFeatureFlag(e5, t2);
  }
  getFeatureFlagPayload(e5) {
    var t2;
    return null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.getFeatureFlagPayload(e5);
  }
  getFeatureFlagResult(e5, t2) {
    var i2;
    return null === (i2 = this.featureFlags) || void 0 === i2 ? void 0 : i2.getFeatureFlagResult(e5, t2);
  }
  getAllFeatureFlags() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this.featureFlags) || void 0 === t2 ? void 0 : t2.getAllFeatureFlags()) && void 0 !== e5 ? e5 : [];
  }
  isFeatureEnabled(e5, t2) {
    var i2, s2;
    return null !== (i2 = null === (s2 = this.featureFlags) || void 0 === s2 ? void 0 : s2.isFeatureEnabled(e5, t2)) && void 0 !== i2 ? i2 : null == t2 ? void 0 : t2.defaultValue;
  }
  reloadFeatureFlags() {
    var e5;
    null === (e5 = this.featureFlags) || void 0 === e5 || e5.reloadFeatureFlags();
  }
  updateFlags(e5, t2, i2) {
    var s2;
    null === (s2 = this.featureFlags) || void 0 === s2 || s2.updateFlags(e5, t2, i2);
  }
  updateEarlyAccessFeatureEnrollment(e5, t2, i2) {
    var s2;
    null === (s2 = this.featureFlags) || void 0 === s2 || s2.updateEarlyAccessFeatureEnrollment(e5, t2, i2);
  }
  getEarlyAccessFeatures(e5, t2 = false, i2) {
    var s2;
    return null === (s2 = this.featureFlags) || void 0 === s2 ? void 0 : s2.getEarlyAccessFeatures(e5, t2, i2);
  }
  on(e5, t2) {
    return this._internalEventEmitter.on(e5, t2);
  }
  onFeatureFlags(e5) {
    return this.featureFlags ? this.featureFlags.onFeatureFlags(e5) : (e5([], {}, { errorsLoading: true }), () => {
    });
  }
  onSurveysLoaded(e5) {
    return this.surveys ? this.surveys.onSurveysLoaded(e5) : (e5([], { isLoaded: false, error: wu }), () => {
    });
  }
  onSessionId(e5) {
    var t2, i2;
    return null !== (t2 = null === (i2 = this.sessionManager) || void 0 === i2 ? void 0 : i2.onSessionId(e5)) && void 0 !== t2 ? t2 : () => {
    };
  }
  getSurveys(e5, t2 = false) {
    this.surveys ? this.surveys.getSurveys(e5, t2) : e5([], { isLoaded: false, error: wu });
  }
  getActiveMatchingSurveys(e5, t2 = false) {
    this.surveys ? this.surveys.getActiveMatchingSurveys(e5, t2) : e5([], { isLoaded: false, error: wu });
  }
  onActiveMatchingSurveysChanged(e5) {
    return this.surveys ? this.surveys.onActiveMatchingSurveysChanged(e5) : (e5([], { isLoaded: false, error: wu }), () => {
    });
  }
  renderSurvey(e5, t2) {
    var i2;
    null === (i2 = this.surveys) || void 0 === i2 || i2.renderSurvey(e5, t2);
  }
  displaySurvey(e5, t2 = Xc) {
    var i2;
    null === (i2 = this.surveys) || void 0 === i2 || i2.displaySurvey(e5, t2);
  }
  cancelPendingSurvey(e5) {
    var t2;
    null === (t2 = this.surveys) || void 0 === t2 || t2.cancelPendingSurvey(e5);
  }
  canRenderSurvey(e5) {
    var t2, i2;
    return null !== (t2 = null === (i2 = this.surveys) || void 0 === i2 ? void 0 : i2.canRenderSurvey(e5)) && void 0 !== t2 ? t2 : { visible: false, disabledReason: wu };
  }
  canRenderSurveyAsync(e5, t2 = false) {
    var i2, s2;
    return null !== (i2 = null === (s2 = this.surveys) || void 0 === s2 ? void 0 : s2.canRenderSurveyAsync(e5, t2)) && void 0 !== i2 ? i2 : Promise.resolve({ visible: false, disabledReason: wu });
  }
  _validateIdentifyId(e5) {
    return !e5 || yt(e5) ? (In.critical("Unique user id has not been set in posthog.identify"), false) : "$posthog_cookieless" === e5 ? (In.critical(`The string "${e5}" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.`), false) : !["distinct_id", "distinctid"].includes(e5.toLowerCase()) && !["undefined", "null"].includes(e5.toLowerCase()) || (In.critical(`The string "${e5}" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.`), false);
  }
  identify(e5, t2, i2) {
    if (!this.__loaded || !this.persistence) return In.uninitializedWarning("posthog.identify");
    if (wt(e5) && (e5 = e5.toString(), In.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), !this._validateIdentifyId(e5)) return;
    if (!this._requirePersonProcessing("posthog.identify")) return;
    this._syncCookielessIdentity();
    const s2 = this.get_distinct_id(), r2 = this.persistence.syncCookieProperties() && this.get_distinct_id() !== s2, n2 = this._processCookieIdentityChange(false), o2 = this.persistence._beginCookieSyncSuppression();
    let a2 = false;
    try {
      const s3 = this.get_distinct_id();
      this.register({ $user_id: e5 }), this.get_property("$device_id") || this.register_once({ $had_persisted_distinct_id: true, $device_id: s3 }, ""), e5 !== s3 && e5 !== this.get_property("__alias") && (this.unregister(T), this.register({ distinct_id: e5 }));
      const o3 = (this.persistence.get_property("$user_state") || "anonymous") === Le, c2 = e5 !== s3, u2 = !c2 && o3;
      if (c2 && o3) {
        var l2;
        const r3 = this.config.reuseAnonymousId ? { distinct_id: e5 } : { distinct_id: e5, $anon_distinct_id: s3 };
        this.persistence.set_property(ge, De), this.setPersonPropertiesForFlags({ $set: t2 || {}, $set_once: i2 || {} }, false), this.config.cookieWinsOnConflict && this.persistence._publishSuppressedCookieSnapshot(), this.capture("$identify", r3, { $set: t2 || {}, $set_once: i2 || {} }) && (this._cachedPersonProperties = jc(e5, t2, i2)), null === (l2 = this.featureFlags) || void 0 === l2 || l2.setAnonymousDistinctId(this.config.reuseAnonymousId ? void 0 : s3);
      } else if (u2) {
        this.persistence.set_property(ge, De);
        const s4 = t2 || {}, r3 = i2 || {};
        this.setPersonPropertiesForFlags({ $set: s4, $set_once: r3 }, false), this.config.cookieWinsOnConflict && this.persistence._publishSuppressedCookieSnapshot(), this.capture("$set", { $set: s4, $set_once: r3 }) && (this._cachedPersonProperties = jc(e5, t2, i2));
      } else (t2 || i2) && this.setPersonProperties(t2, i2);
      c2 || r2 || n2 ? (this.reloadFeatureFlags(), this.featureFlags ? this.featureFlags.resetFlagCallReported() : this.unregister(_)) : u2 && (t2 || i2) && this.reloadFeatureFlags(), a2 = true;
    } finally {
      o2 && this.persistence._endCookieSyncSuppression(a2);
    }
  }
  setPersonProperties(e5, t2) {
    if (!e5 && !t2) return;
    if (!this._requirePersonProcessing("posthog.setPersonProperties")) return;
    const i2 = jc(this.get_distinct_id(), e5, t2);
    this._cachedPersonProperties !== i2 ? (this.setPersonPropertiesForFlags({ $set: e5 || {}, $set_once: t2 || {} }, true), this.capture("$set", { $set: e5 || {}, $set_once: t2 || {} }) && (this._cachedPersonProperties = i2)) : In.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
  }
  unsetPersonProperties(e5) {
    var t2;
    const i2 = (_t(e5) ? e5 : [e5]).filter((e6) => mt(e6) && e6.length > 0);
    0 !== i2.length && this._requirePersonProcessing("posthog.unsetPersonProperties") && (null === (t2 = this.featureFlags) || void 0 === t2 || t2.unsetPersonPropertiesForFlags(i2, true), this.capture("$set", { $unset: i2 }), this._cachedPersonProperties = null);
  }
  group(e5, t2, i2) {
    var s2;
    if (!e5 || !t2) return void In.error("posthog.group requires a group type and group key");
    null === (s2 = this.persistence) || void 0 === s2 || s2.syncCookieProperties(), this._processCookieIdentityChange();
    const r2 = this.getGroups(), n2 = r2[e5] !== t2;
    if (n2 && this.resetGroupPropertiesForFlags(e5), this.register({ $groups: ls(ls({}, r2), {}, { [e5]: t2 }) }), (n2 || i2) && this._hasPersonProcessing()) {
      const s3 = { $group_type: e5, $group_key: t2 };
      i2 && (s3.$group_set = i2), this.capture(ze, s3);
    }
    i2 && this.setGroupPropertiesForFlags({ [e5]: i2 }), n2 && !i2 && this.reloadFeatureFlags();
  }
  resetGroups() {
    this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
  }
  setPersonPropertiesForFlags(e5, t2 = true) {
    var i2;
    null === (i2 = this.featureFlags) || void 0 === i2 || i2.setPersonPropertiesForFlags(e5, t2);
  }
  resetPersonPropertiesForFlags(e5 = true) {
    var t2;
    null === (t2 = this.featureFlags) || void 0 === t2 || t2.resetPersonPropertiesForFlags(e5);
  }
  setGroupPropertiesForFlags(e5, t2 = true) {
    var i2;
    this._requirePersonProcessing("posthog.setGroupPropertiesForFlags") && (null === (i2 = this.featureFlags) || void 0 === i2 || i2.setGroupPropertiesForFlags(e5, t2));
  }
  resetGroupPropertiesForFlags(e5) {
    var t2;
    null === (t2 = this.featureFlags) || void 0 === t2 || t2.resetGroupPropertiesForFlags(e5);
  }
  reset(e5) {
    const t2 = Ct(e5) ? e5 : null == e5 ? void 0 : e5.resetDeviceID, i2 = Ct(e5) || null == e5 ? void 0 : e5.bootstrap;
    this._reset(t2, false, i2);
  }
  _reset(e5, t2 = false, i2) {
    var s2, r2, n2, o2, a2, l2;
    if (In.info("reset"), !this.__loaded) return In.uninitializedWarning("posthog.reset");
    const c2 = null == i2 ? void 0 : i2.sessionID;
    this.config.bootstrap = i2 || (null === (s2 = this._originalUserConfig) || void 0 === s2 ? void 0 : s2.bootstrap) || {}, null === (r2 = this.featureFlags) || void 0 === r2 || null === (n2 = r2.updateConfig) || void 0 === n2 || n2.call(r2, this.config, this._shouldDisableFlags());
    const u2 = this.get_property(I), d2 = this.get_property(F), h2 = this.get_property(G);
    null === (o2 = this.sessionRecording) || void 0 === o2 || o2.flushBeforeIdentityReset();
    const _2 = this.is_capturing();
    t2 || this.consent.reset(), t2 || !_2 || this.is_capturing() || console.warn("[PostHog.js]", "reset() cleared the stored consent, and capturing is now off because of `opt_out_capturing_by_default`. Call opt_in_capturing() again, and prefer calling reset() before opting in rather than after.");
    const p2 = null === (a2 = this.persistence) || void 0 === a2 || null === (l2 = a2._beginCookieSyncSuppression) || void 0 === l2 ? void 0 : l2.call(a2), g2 = this._isConsentTransition;
    this._isConsentTransition = g2 || t2;
    let v2 = false;
    try {
      var f2, m2, y2, b2, S2, w2, E2, C2, k2, x2, P2, T2, R2;
      if (null === (f2 = this.persistence) || void 0 === f2 || f2.clear(), null === (m2 = this.sessionPersistence) || void 0 === m2 || m2.clear(), this._sessionRegisteredPropKeys.clear(), this._persistSessionRegisteredPropKeys(), ft(h2) || null === (x2 = this.persistence) || void 0 === x2 || x2.register({ $session_recording_remote_config: h2 }), null === (y2 = this.surveys) || void 0 === y2 || y2.reset(), null === (b2 = this.featureFlags) || void 0 === b2 || b2.reset(), null === (S2 = this.conversations) || void 0 === S2 || S2.reset(), null === (w2 = this.logs) || void 0 === w2 || w2.reset(), null === (E2 = this.metrics) || void 0 === E2 || E2.reset(), null === (C2 = this.persistence) || void 0 === C2 || C2.set_property("$user_state", "anonymous"), null === (k2 = this.sessionManager) || void 0 === k2 || k2.resetSessionId(), this._cachedPersonProperties = null, "always" === this.config.cookieless_mode) this.register_once({ distinct_id: we, $device_id: null }, "");
      else {
        const t3 = this.config.get_device_id(Kn());
        this.register_once({ distinct_id: t3, $device_id: e5 ? t3 : u2 }, ""), e5 || ft(d2) || this.register({ [F]: d2 });
      }
      if (this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1), i2) {
        if (i2.distinctID && !this._inCookielessMode() && (null === (R2 = this.persistence) || void 0 === R2 || R2.set_property("$user_state", i2.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: i2.distinctID })), null === (P2 = this.featureFlags) || void 0 === P2 || P2.initialize(), !St(c2) && !(null === (T2 = this.sessionManager) || void 0 === T2 ? void 0 : T2.setBootstrapSessionId(c2, true))) {
          const e6 = ls({}, i2);
          delete e6.sessionID, this.config.bootstrap = e6;
        }
      }
      delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, v2 = true;
    } finally {
      var A2, M2;
      this._isConsentTransition = g2, p2 && (null === (A2 = this.persistence) || void 0 === A2 || null === (M2 = A2._endCookieSyncSuppression) || void 0 === M2 || M2.call(A2, v2));
    }
    var O2;
    this._lastRemoteConfig && (null === (O2 = this.conversations) || void 0 === O2 || O2.onRemoteConfig(this._lastRemoteConfig)), this.reloadFeatureFlags();
  }
  shutdown(e5) {
    var t2 = this;
    return Lt(function* () {
      if (!t2.__loaded) return void In.uninitializedWarning("posthog.shutdown");
      t2._isShutdown = true, clearTimeout(t2._extensionInitTimeout), t2._extensionInitTimeout = void 0;
      const e6 = t2._featureFlagsReloadingUnsubscribe;
      t2._featureFlagsReloadingUnsubscribe = void 0;
      for (const i2 of [() => {
        var e7;
        return null === (e7 = t2.sessionRecording) || void 0 === e7 ? void 0 : e7.dispose();
      }, () => {
        var e7;
        return null === (e7 = t2.logs) || void 0 === e7 ? void 0 : e7.flushLogs("sendBeacon");
      }, () => {
        var e7;
        return null === (e7 = t2.metrics) || void 0 === e7 ? void 0 : e7.flush("sendBeacon");
      }, () => {
        var e7;
        return null === (e7 = t2.metrics) || void 0 === e7 ? void 0 : e7.dispose();
      }, () => {
        var e7;
        return null === (e7 = t2.logs) || void 0 === e7 ? void 0 : e7.dispose();
      }, () => {
        var e7;
        return null === (e7 = t2.surveys) || void 0 === e7 ? void 0 : e7.dispose();
      }, () => {
        var e7;
        return null === (e7 = t2.autocapture) || void 0 === e7 ? void 0 : e7.dispose();
      }, () => null == e6 ? void 0 : e6(), () => {
        var e7;
        return null === (e7 = t2._requestQueue) || void 0 === e7 ? void 0 : e7.unload();
      }, () => {
        var e7;
        return null === (e7 = t2._retryQueue) || void 0 === e7 ? void 0 : e7.unload();
      }, () => {
        var e7;
        return null === (e7 = t2.featureFlags) || void 0 === e7 ? void 0 : e7.destroy();
      }, () => {
        var e7;
        return null === (e7 = t2.persistence) || void 0 === e7 ? void 0 : e7.destroy();
      }, () => {
        var e7;
        return null === (e7 = t2.sessionPersistence) || void 0 === e7 ? void 0 : e7.destroy();
      }]) try {
        const e7 = i2();
        e7 && pt(e7.then) && e7.then(void 0, (e8) => {
          In.error("Error during shutdown", e8);
        });
      } catch (e7) {
        In.error("Error during shutdown", e7);
      }
    })();
  }
  setIdentity(e5, t2) {
    var i2;
    delete this.config.identity_claims, this.config.identity_distinct_id = e5, this.config.identity_hash = t2, this.alias(e5), null === (i2 = this.conversations) || void 0 === i2 || i2._onIdentityChanged();
  }
  clearIdentity() {
    var e5;
    delete this.config.identity_distinct_id, delete this.config.identity_hash, delete this.config.identity_claims, null === (e5 = this.conversations) || void 0 === e5 || e5._onIdentityCleared();
  }
  get_distinct_id() {
    return this.get_property("distinct_id");
  }
  getGroups() {
    return this.get_property("$groups") || {};
  }
  get_session_id() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this.sessionManager) || void 0 === t2 ? void 0 : t2.checkAndGetSessionAndWindowId(true).sessionId) && void 0 !== e5 ? e5 : "";
  }
  get_session_replay_url(e5) {
    if (!this.sessionManager) return "";
    const { sessionId: t2, sessionStartTimestamp: i2 } = this.sessionManager.checkAndGetSessionAndWindowId(true);
    let s2 = this.requestRouter.endpointFor("ui", `/project/${this.config.token}/replay/${t2}`);
    if ((null == e5 ? void 0 : e5.withTimestamp) && i2) {
      var r2;
      const t3 = null !== (r2 = e5.timestampLookBack) && void 0 !== r2 ? r2 : 10;
      if (!i2) return s2;
      s2 += `?t=${Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - i2) / 1e3) - t3, 0)}`;
    }
    return s2;
  }
  alias(e5, t2) {
    return e5 === this.get_property("$people_distinct_id") ? (In.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? (ft(t2) && (t2 = this.get_distinct_id()), e5 !== t2 ? (this._register_single(T, e5), this.capture("$create_alias", { alias: e5, distinct_id: t2 })) : (In.warn("alias matches current distinct_id - skipping api call."), this.identify(e5), -1)) : void 0;
  }
  set_config(e5) {
    const t2 = ls({}, this.config);
    if (gt(e5)) {
      var s2, r2, n2, o2, a2, l2, c2, u2, d2, h2, _2, p2, g2, v2;
      $n(this.config, Du(e5));
      const S2 = this._is_persistence_disabled();
      if (this.persistence) {
        const e6 = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence;
        var f2, m2;
        if (e6 && this.sessionPersistence !== this.persistence && (null === (f2 = this.sessionPersistence) || void 0 === f2 || f2.remove(), null === (m2 = this.sessionPersistence) || void 0 === m2 || m2.destroy()), this.persistence.update_config(this.config, t2, S2), e6) this.sessionPersistence = this.persistence;
        else if (this.sessionPersistence === this.persistence) this.sessionPersistence = new sl(ls(ls({}, this.config), {}, { persistence: "sessionStorage" }), S2, false);
        else {
          var y2;
          null === (y2 = this.sessionPersistence) || void 0 === y2 || y2.update_config(ls(ls({}, this.config), {}, { persistence: "sessionStorage" }), ls(ls({}, t2), {}, { persistence: "sessionStorage" }), S2);
        }
      }
      const w2 = this._checkLocalStorageForDebug(this.config.debug);
      var b2;
      Ct(w2) && (this.config.debug = w2), Ct(this.config.debug) && (this.config.debug ? (i.DEBUG = true, to._is_supported() && to._set("ph_debug", true), In.info("set_config", { config: e5, oldConfig: t2, newConfig: ls({}, this.config) })) : (i.DEBUG = false, to._is_supported() && to._remove("ph_debug"))), null === (s2 = this.featureFlags) || void 0 === s2 || null === (r2 = s2.updateConfig) || void 0 === r2 || r2.call(s2, this.config, this._shouldDisableFlags()), null === (n2 = this.exceptionObserver) || void 0 === n2 || n2.onConfigChange(), null === (o2 = this.exceptions) || void 0 === o2 || o2.onConfigChange(), null === (a2 = this.metrics) || void 0 === a2 || a2.onConfigChange(), null === (l2 = this.webMCP) || void 0 === l2 || l2.startIfEnabled(), null === (c2 = this.sessionRecording) || void 0 === c2 || c2.startIfEnabledOrStop(), null === (u2 = this.tracingHeaders) || void 0 === u2 || u2.startIfEnabledOrStop(), null === (d2 = this.autocapture) || void 0 === d2 || d2.startIfEnabled(), null === (h2 = this.heatmaps) || void 0 === h2 || h2.startIfEnabled(), ("capture_pageview" in e5 || "disable_capture_url_hashes" in e5) && (null === (b2 = this.historyAutocapture) || void 0 === b2 || b2.startIfEnabledOrStop()), null === (_2 = this.exceptionObserver) || void 0 === _2 || _2.startIfEnabledOrStop(), null === (p2 = this.deadClicksAutocapture) || void 0 === p2 || p2.startIfEnabledOrStop(), null === (g2 = this.surveys) || void 0 === g2 || g2.loadIfEnabled(), this._sync_opt_out_with_persistence(), null === (v2 = this.externalIntegrations) || void 0 === v2 || v2.startIfEnabledOrStop(), !t2.segment && this.config.segment && this.persistence && _a(this, bu, false);
    }
  }
  _overrideSDKInfo(e5, t2) {
    i.LIB_NAME = e5, i.LIB_VERSION = t2;
  }
  startSessionRecording(e5) {
    const t2 = true === e5, i2 = { sampling: t2 || !!(null == e5 ? void 0 : e5.sampling), linked_flag: t2 || !!(null == e5 ? void 0 : e5.linked_flag), url_trigger: t2 || !!(null == e5 ? void 0 : e5.url_trigger), event_trigger: t2 || !!(null == e5 ? void 0 : e5.event_trigger) };
    var s2, r2, n2, o2, a2;
    Object.values(i2).some(Boolean) && (null === (s2 = this.sessionManager) || void 0 === s2 || s2.checkAndGetSessionAndWindowId(), i2.sampling && (null === (r2 = this.sessionRecording) || void 0 === r2 || r2.overrideSampling()), i2.linked_flag && (null === (n2 = this.sessionRecording) || void 0 === n2 || n2.overrideLinkedFlag()), i2.url_trigger && (null === (o2 = this.sessionRecording) || void 0 === o2 || o2.overrideTrigger("url")), i2.event_trigger && (null === (a2 = this.sessionRecording) || void 0 === a2 || a2.overrideTrigger("event")));
    this.set_config({ disable_session_recording: false });
  }
  stopSessionRecording() {
    this.set_config({ disable_session_recording: true });
  }
  sessionRecordingStarted() {
    var e5;
    return !!(null === (e5 = this.sessionRecording) || void 0 === e5 ? void 0 : e5.started);
  }
  captureException(e5, t2) {
    try {
      if (!this.exceptions) return;
      const i2 = this.exceptions.buildProperties(e5, { handled: true, syntheticException: new Error("PostHog syntheticException") });
      return this.exceptions.sendExceptionEvent(ls(ls({}, i2), t2));
    } catch (e6) {
      return;
    }
  }
  addExceptionStep(e5, t2) {
    var i2;
    null === (i2 = this.exceptions) || void 0 === i2 || i2.addExceptionStep(e5, t2);
  }
  captureLog(e5) {
    var t2;
    null === (t2 = this.logs) || void 0 === t2 || t2.captureLog(e5);
  }
  get logger() {
    var t2, i2;
    return null !== (t2 = null === (i2 = this.logs) || void 0 === i2 ? void 0 : i2.logger) && void 0 !== t2 ? t2 : e3._noopLogger;
  }
  startExceptionAutocapture(e5) {
    this.set_config({ capture_exceptions: null == e5 || e5 });
  }
  stopExceptionAutocapture() {
    this.set_config({ capture_exceptions: false });
  }
  loadToolbar(e5) {
    var t2, i2;
    return null !== (t2 = null === (i2 = this.toolbar) || void 0 === i2 ? void 0 : i2.loadToolbar(e5)) && void 0 !== t2 && t2;
  }
  get_property(e5) {
    var t2;
    return null === (t2 = this.persistence) || void 0 === t2 ? void 0 : t2.props[e5];
  }
  getSessionProperty(e5) {
    var t2;
    return null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.props[e5];
  }
  toString() {
    var e5;
    let t2 = null !== (e5 = this.config.name) && void 0 !== e5 ? e5 : $u;
    return t2 !== $u && (t2 = "posthog." + t2), t2;
  }
  _isIdentified() {
    var e5, t2;
    return "identified" === (null === (e5 = this.persistence) || void 0 === e5 ? void 0 : e5.get_property("$user_state")) || "identified" === (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2.get_property("$user_state"));
  }
  _hasPersonProcessing() {
    var e5, t2;
    return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && vt(this.getGroups()) && !(null === (e5 = this.persistence) || void 0 === e5 || null === (e5 = e5.props) || void 0 === e5 ? void 0 : e5.__alias) && !(null === (t2 = this.persistence) || void 0 === t2 || null === (t2 = t2.props) || void 0 === t2 ? void 0 : t2.$epp));
  }
  _shouldCapturePageleave() {
    return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && !!this.config.capture_pageview;
  }
  createPersonProfile() {
    this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {});
  }
  setInternalOrTestUser() {
    this._requirePersonProcessing("posthog.setInternalOrTestUser") && this.setPersonProperties({ $internal_or_test_user: true });
  }
  _requirePersonProcessing(e5) {
    return "never" === this.config.person_profiles ? (In.error(e5 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this._warnIfVolatileIdentityWithoutStableId(), this._register_single(Se, true), true);
  }
  _is_persistence_disabled() {
    if ("always" === this.config.cookieless_mode) return true;
    const e5 = this.consent.isOptedOut();
    return this.config.disable_persistence || e5 && !(!this.config.opt_out_persistence_by_default && "on_reject" !== this.config.cookieless_mode);
  }
  _sync_opt_out_with_persistence() {
    var e5, t2;
    const i2 = this._is_persistence_disabled();
    var s2, r2, n2;
    return this.is_capturing() || null === (s2 = this.logs) || void 0 === s2 || s2._onOptOut(), (null === (e5 = this.persistence) || void 0 === e5 ? void 0 : e5._disabled) !== i2 && (null === (r2 = this.persistence) || void 0 === r2 || r2.set_disabled(i2)), (null === (t2 = this.sessionPersistence) || void 0 === t2 ? void 0 : t2._disabled) !== i2 && (null === (n2 = this.sessionPersistence) || void 0 === n2 || n2.set_disabled(i2)), this._persistSessionRegisteredPropKeys(), i2;
  }
  opt_in_capturing(t2) {
    var i2;
    if ("always" !== this.config.cookieless_mode) {
      if (this._inCookielessMode()) {
        var s2, r2, n2, o2, a2, l2;
        null === (s2 = this.sessionRecording) || void 0 === s2 || s2.dispose({ discardBufferedEvents: true }), this._reset(true, true), null === (r2 = this.sessionManager) || void 0 === r2 || r2.destroy(), null === (n2 = this.pageViewManager) || void 0 === n2 || n2.destroy(), this.sessionManager = new Mc(this), this.pageViewManager = new fa(this), this.persistence && (this.sessionPropsManager = new Tc(this, this.sessionManager, this.persistence));
        const t3 = null !== (o2 = null === (a2 = this.config.__extensionClasses) || void 0 === a2 ? void 0 : a2.sessionRecording) && void 0 !== o2 ? o2 : null === (l2 = e3.__defaultExtensionClasses) || void 0 === l2 ? void 0 : l2.sessionRecording;
        var c2, u2;
        t3 && (this.sessionRecording = this._replaceExtension(this.sessionRecording, new t3(this)), this._lastRemoteConfig && (null === (c2 = this.sessionRecording) || void 0 === c2 || null === (u2 = c2.onRemoteConfig) || void 0 === u2 || u2.call(c2, this._lastRemoteConfig)));
      }
      var d2, h2, _2;
      this.consent.optInOut(true), this._sync_opt_out_with_persistence(), this._start_queue_if_opted_in(), null === (i2 = this.sessionRecording) || void 0 === i2 || i2.startIfEnabledOrStop(), "on_reject" == this.config.cookieless_mode && (null === (d2 = this.surveys) || void 0 === d2 || d2.loadIfEnabled(), null === (h2 = this.conversations) || void 0 === h2 || h2.loadIfEnabled()), (ft(null == t2 ? void 0 : t2.captureEventName) || (null == t2 ? void 0 : t2.captureEventName)) && this.capture(null !== (_2 = null == t2 ? void 0 : t2.captureEventName) && void 0 !== _2 ? _2 : "$opt_in", null == t2 ? void 0 : t2.captureProperties, { send_instantly: true }), this.config.capture_pageview && this._captureInitialPageview();
    } else In.warn(Su);
  }
  opt_out_capturing() {
    "always" !== this.config.cookieless_mode ? (this.consent.optInOut(false), this._sync_opt_out_with_persistence(), "on_reject" === this.config.cookieless_mode && this._enterCookielessMode()) : In.warn(Su);
  }
  _enterCookielessMode() {
    var e5, t2;
    const i2 = this.sessionRecording;
    null == i2 || i2.dispose({ discardBufferedEvents: true }), "$posthog_cookieless" !== this.get_distinct_id() && this._reset(true, true), this.register({ distinct_id: we, $device_id: null }), this._removeExtension(i2), this.sessionRecording = void 0, null === (e5 = this.sessionManager) || void 0 === e5 || e5.destroy(), null === (t2 = this.pageViewManager) || void 0 === t2 || t2.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, this.config.capture_pageview && this._captureInitialPageview(), this._start_queue_if_opted_in();
  }
  has_opted_in_capturing() {
    return this.consent.isOptedIn();
  }
  has_opted_out_capturing() {
    return this.consent.isOptedOut();
  }
  get_explicit_consent_status() {
    const e5 = this.consent.consent;
    return 1 === e5 ? "granted" : 0 === e5 ? "denied" : "pending";
  }
  is_capturing() {
    return !this._isConsentTransition && ("always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isRejected() || this.consent.isOptedIn() : !this.has_opted_out_capturing()));
  }
  clear_opt_in_out_capturing() {
    this.consent.reset(), this._sync_opt_out_with_persistence();
  }
  _is_bot() {
    return Ve ? Lc(Ve, this.config.custom_blocked_useragents) : void 0;
  }
  _captureInitialPageview() {
    Ge && ("visible" === Ge.visibilityState ? this._initialPageviewCaptured || (this._initialPageviewCaptured = true, this.capture(Ue, { title: Ge.title }, { send_instantly: true }), this._visibilityStateListener && (Ge.removeEventListener(m, this._visibilityStateListener), this._visibilityStateListener = null)) : this._visibilityStateListener || (this._visibilityStateListener = this._captureInitialPageview.bind(this), Bn(Ge, m, this._visibilityStateListener)));
  }
  debug(e5) {
    false === e5 ? (null == je || je.console.log("You've disabled debug mode."), this.set_config({ debug: false })) : (null == je || je.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: true }));
  }
  _shouldDisableFlags() {
    const e5 = this._originalUserConfig || {};
    return "advanced_disable_flags" in e5 ? !!e5.advanced_disable_flags : false !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : true === this.config.advanced_disable_decide ? (In.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), true) : (function(e6, t2, i2, s2, r2) {
      const n2 = t2 in e6 && !St(e6[t2]), o2 = i2 in e6 && !St(e6[i2]);
      return n2 ? e6[t2] : !!o2 && (r2 && r2.warn(`Config field '${i2}' is deprecated. Please use '${t2}' instead. The old field will be removed in a future major version.`), e6[i2]);
    })(e5, "advanced_disable_flags", "advanced_disable_decide", 0, In);
  }
  _runBeforeSend(e5) {
    var t2;
    if (St(this.config.before_send)) return e5;
    const i2 = Object.keys(null !== (t2 = e5.properties) && void 0 !== t2 ? t2 : {}).filter(xt), s2 = _t(this.config.before_send) ? this.config.before_send : [this.config.before_send];
    let r2 = e5;
    for (const t3 of s2) try {
      if (r2 = t3(r2), St(r2)) {
        const t4 = `Event '${e5.event}' was rejected in beforeSend function`;
        return kt(e5.event) ? In.warn(`${t4}. This can cause unexpected behavior.`) : In.info(t4), null;
      }
      r2.properties && !vt(r2.properties) || In.warn(`Event '${e5.event}' has no properties after beforeSend function, this is likely an error.`);
    } catch (t4) {
      return In.error(`Error in beforeSend function for event '${e5.event}':`, t4), null;
    }
    for (const t3 of i2) if (r2.properties && St(r2.properties[t3])) return In.warn(`Event '${e5.event}' had its '${t3}' property removed in a beforeSend function. This property is required for ingestion, so the event will be dropped.`), null;
    return r2;
  }
  getPageViewId() {
    var e5;
    return null === (e5 = this.pageViewManager._currentPageview) || void 0 === e5 ? void 0 : e5.pageViewId;
  }
  captureTraceFeedback(e5, t2) {
    this.capture("$ai_feedback", { $ai_trace_id: String(e5), $ai_feedback_text: t2 });
  }
  captureTraceMetric(e5, t2, i2) {
    this.capture("$ai_metric", { $ai_trace_id: String(e5), $ai_metric_name: t2, $ai_metric_value: String(i2) });
  }
  _checkLocalStorageForDebug(e5) {
    const t2 = Ct(e5) && !e5, i2 = to._is_supported() && "true" === to._get("ph_debug");
    return !t2 && (!!i2 || e5);
  }
};
Bu.__defaultExtensionClasses = {}, Bu._noopLogger = /* @__PURE__ */ (() => {
  const e5 = () => {
  };
  return { trace: e5, debug: e5, info: e5, warn: e5, error: e5, fatal: e5 };
})(), (function(e5, t2) {
  for (let i2 = 0; t2.length > i2; i2++) e5.prototype[t2[i2]] = Mn(e5.prototype[t2[i2]]);
})(Bu, ["identify"]);
var Uu = ["[data-ph-capture-value]"];
var qu = class {
  constructor(e5) {
    this._instance = e5;
  }
  refresh(e5) {
    var t2;
    const i2 = this._instance.config, s2 = gt(i2.autocapture) ? i2.autocapture : void 0;
    e5.enabled = !!i2.autocapture, e5.rageclick = i2.rageclick, e5.maskAllElementAttributes = i2.mask_all_element_attributes, e5.maskAllText = i2.mask_all_text, e5.disableCaptureUrlHashes = i2.disable_capture_url_hashes, e5.getCurrentUrl = i2.get_current_url, e5.remoteRequestsDisabled = this._instance._shouldDisableFlags(), e5.url_allowlist = null == s2 ? void 0 : s2.url_allowlist, e5.url_ignorelist = null == s2 ? void 0 : s2.url_ignorelist, e5.dom_event_allowlist = null == s2 ? void 0 : s2.dom_event_allowlist, e5.element_allowlist = null == s2 ? void 0 : s2.element_allowlist, e5.css_selector_allowlist = null == s2 ? void 0 : s2.css_selector_allowlist, e5.css_selector_ignorelist = null == s2 ? void 0 : s2.css_selector_ignorelist, e5.element_attribute_ignorelist = null == s2 ? void 0 : s2.element_attribute_ignorelist, e5.capture_copied_text = null == s2 ? void 0 : s2.capture_copied_text, e5.capture_value_css_selector_allowlist = null !== (t2 = null == s2 ? void 0 : s2.capture_value_css_selector_allowlist) && void 0 !== t2 ? t2 : Uu;
  }
};
var Hu = Fn("[ExceptionAutocapture]");
var zu = () => {
};
var ju = (e5) => {
  var t2;
  if (pt(e5)) return null !== (t2 = e5.__posthog_layer__) && void 0 !== t2 ? t2 : e5.__rrweb_layer__;
};
function Wu(e5, t2, i2) {
  try {
    if (!(t2 in e5)) return zu;
    const s2 = { next: e5[t2] }, r2 = i2(function(...e6) {
      return s2.next.apply(this, e6);
    });
    return pt(r2) && (r2.prototype = r2.prototype || {}, Object.defineProperties(r2, { __posthog_wrapped__: { enumerable: false, value: true }, __posthog_layer__: { enumerable: false, value: s2 } })), e5[t2] = r2, () => {
      if (e5[t2] === r2) return void (e5[t2] = s2.next);
      let i3 = e5[t2], n2 = ju(i3);
      for (; n2; ) {
        if (n2.next === r2) return void (n2.next = s2.next);
        i3 = n2.next, n2 = ju(i3);
      }
    };
  } catch (e6) {
    return zu;
  }
}
var Vu = Fn("[TracingHeaders]");
var Gu = Fn("[Web Vitals]");
var Ku = 9e5;
var Qu = ["CLS", "FCP", "INP", "LCP"];
var Ju = ["INP", "LCP"];
var Yu = ["interactionTarget", "interactionType", "inputDelay", "processingDuration", "presentationDelay", "loadState", "target", "url", "timeToFirstByte", "resourceLoadDelay", "resourceLoadDuration", "elementRenderDelay", "largestShiftTarget", "largestShiftTime", "largestShiftValue", "firstByteToFCP"];
var Zu = "disabled";
var Xu = "lazy_loading";
var ed = Fn("[SessionRecording]");
var td = [xe, Pe, Ie, Fe, Te, Re, $e, Ae, Me];
var id = Fn("[Heatmaps]");
function sd(e5) {
  return gt(e5) && "clientX" in e5 && "clientY" in e5 && wt(e5.clientX) && wt(e5.clientY);
}
var rd = Fn("[Product Tours]");
var nd = (e5) => {
  var t2;
  return !e5.config.disable_product_tours && !!(null === (t2 = e5.persistence) || void 0 === t2 ? void 0 : t2.get_property(j));
};
var od = ["$set_once", "$set"];
var ad = Fn("[SiteApps]");
var ld = "Error while initializing PostHog app with config id ";
function cd(e5, t2, i2) {
  if (St(e5)) return false;
  switch (i2) {
    case "exact":
      return e5 === t2;
    case "contains": {
      const i3 = t2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".").replace(/%/g, ".*");
      return new RegExp(i3, "i").test(e5);
    }
    case "regex":
      try {
        return new RegExp(t2).test(e5);
      } catch (e6) {
        return false;
      }
    default:
      return false;
  }
}
var ud = class {
  constructor(e5) {
    this._host = e5, this._actionRegistry = /* @__PURE__ */ new Set(), this._actionEvents = /* @__PURE__ */ new Set(), this._debugEventEmitter = new Rc(), this._checkStep = (e6, t2) => this._checkStepEvent(e6, t2) && this._checkStepUrl(e6, t2) && this._checkStepElement(e6, t2) && this._checkStepProperties(e6, t2), this._checkStepEvent = (e6, t2) => !(null == t2 ? void 0 : t2.event) || (null == e6 ? void 0 : e6.event) === (null == t2 ? void 0 : t2.event);
  }
  init() {
    var e5, t2;
    ft(null === (e5 = this._host) || void 0 === e5 ? void 0 : e5.subscribeCapture) || (this._captureHookUnsubscribe = null === (t2 = this._host) || void 0 === t2 ? void 0 : t2.subscribeCapture((e6, t3) => {
      this.on(e6, t3);
    }));
  }
  dispose() {
    var e5, t2, i2;
    null === (e5 = this._captureHookUnsubscribe) || void 0 === e5 || e5.call(this), this._captureHookUnsubscribe = void 0, null === (t2 = this._host) || void 0 === t2 || null === (i2 = t2.setElementSelectors) || void 0 === i2 || i2.call(t2, /* @__PURE__ */ new Set(), this), this._debugEventEmitter = new Rc();
  }
  register(e5) {
    var t2, i2;
    if (!ft(null === (t2 = this._host) || void 0 === t2 ? void 0 : t2.subscribeCapture) && (e5.forEach((e6) => {
      var t3;
      this._actionRegistry.add(e6), null === (t3 = e6.steps) || void 0 === t3 || t3.forEach((e7) => {
        this._actionEvents.add((null == e7 ? void 0 : e7.event) || "");
      });
    }), null === (i2 = this._host) || void 0 === i2 ? void 0 : i2.setElementSelectors)) {
      const e6 = /* @__PURE__ */ new Set();
      this._actionRegistry.forEach((t3) => {
        var i3;
        null === (i3 = t3.steps) || void 0 === i3 || i3.forEach((t4) => {
          (null == t4 ? void 0 : t4.selector) && e6.add(t4.selector);
        });
      }), this._host.setElementSelectors(e6, this);
    }
  }
  replace(e5) {
    this._actionRegistry.clear(), this._actionEvents.clear(), this.register(e5);
  }
  on(e5, t2) {
    null != t2 && 0 != e5.length && (this._actionEvents.has(e5) || this._actionEvents.has(t2.event)) && this._actionRegistry.forEach((e6) => {
      this._checkAction(t2, e6) && this._debugEventEmitter.emit("actionCaptured", e6.name);
    });
  }
  _addActionHook(e5) {
    this.onAction("actionCaptured", (t2) => e5(t2));
  }
  _checkAction(e5, t2) {
    if (null == (null == t2 ? void 0 : t2.steps)) return false;
    for (const i2 of t2.steps) if (this._checkStep(e5, i2)) return true;
    return false;
  }
  onAction(e5, t2) {
    return this._debugEventEmitter.on(e5, t2);
  }
  _checkStepUrl(e5, t2) {
    if (null == t2 ? void 0 : t2.url) {
      var i2;
      let n2 = null == e5 || null === (i2 = e5.properties) || void 0 === i2 ? void 0 : i2.$current_url;
      if (!(null == e5 ? void 0 : e5.properties) || !("$current_url" in e5.properties)) try {
        var s2, r2;
        n2 = null === (s2 = this._host) || void 0 === s2 || null === (r2 = s2.getActionUrl) || void 0 === r2 ? void 0 : r2.call(s2);
      } catch (e6) {
        return false;
      }
      if (!n2 || "string" != typeof n2) return false;
      if (!cd(n2, t2.url, t2.url_matching || "contains")) return false;
    }
    return true;
  }
  _checkStepElement(e5, t2) {
    return !!this._checkStepHref(e5, t2) && !!this._checkStepText(e5, t2) && !!this._checkStepSelector(e5, t2);
  }
  _checkStepHref(e5, t2) {
    var i2;
    if (!(null == t2 ? void 0 : t2.href)) return true;
    const s2 = this._getElementsList(e5);
    if (s2.length > 0) return s2.some((e6) => cd(e6.href, t2.href, t2.href_matching || "exact"));
    const r2 = (null == e5 || null === (i2 = e5.properties) || void 0 === i2 ? void 0 : i2.$elements_chain) || "";
    return !!r2 && cd((function(e6) {
      const t3 = e6.match(/(?::|")href="(.*?)"/);
      return t3 ? t3[1] : "";
    })(r2), t2.href, t2.href_matching || "exact");
  }
  _checkStepText(e5, t2) {
    var i2;
    if (!(null == t2 ? void 0 : t2.text)) return true;
    const s2 = this._getElementsList(e5);
    if (s2.length > 0) return s2.some((e6) => cd(e6.text, t2.text, t2.text_matching || "exact") || cd(e6.$el_text, t2.text, t2.text_matching || "exact"));
    const r2 = (null == e5 || null === (i2 = e5.properties) || void 0 === i2 ? void 0 : i2.$elements_chain) || "";
    return !!r2 && (n2 = (function(e6) {
      const t3 = [], i3 = /(?::|")text="(.*?)"/g;
      let s3;
      for (; !St(s3 = i3.exec(e6)); ) t3.includes(s3[1]) || t3.push(s3[1]);
      return t3;
    })(r2), o2 = t2.text, a2 = t2.text_matching || "exact", n2.some((e6) => cd(e6, o2, a2)));
    var n2, o2, a2;
  }
  _checkStepSelector(e5, t2) {
    var i2, s2;
    if (!(null == t2 ? void 0 : t2.selector)) return true;
    const r2 = null == e5 || null === (i2 = e5.properties) || void 0 === i2 ? void 0 : i2.$element_selectors;
    if (null == r2 ? void 0 : r2.includes(t2.selector)) return true;
    const n2 = (null == e5 || null === (s2 = e5.properties) || void 0 === s2 ? void 0 : s2.$elements_chain) || "";
    if (t2.selector_regex && n2) try {
      return new RegExp(t2.selector_regex).test(n2);
    } catch (e6) {
    }
    return false;
  }
  _getElementsList(e5) {
    var t2;
    return null == (null == e5 || null === (t2 = e5.properties) || void 0 === t2 ? void 0 : t2.$elements) ? [] : null == e5 ? void 0 : e5.properties.$elements;
  }
  _checkStepProperties(e5, t2) {
    return !(null == t2 ? void 0 : t2.properties) || 0 === t2.properties.length || zc(t2.properties.reduce((e6, t3) => {
      const i2 = _t(t3.value) ? t3.value.map(String) : null != t3.value ? [String(t3.value)] : [];
      return e6[t3.key] = { values: i2, operator: t3.operator || "exact" }, e6;
    }, {}), null == e5 ? void 0 : e5.properties);
  }
};
var dd = class {
  constructor(e5, t2) {
    this._onActivationChanged = t2, this._pendingActivatedItems = [], this._host = e5, this._eventToItems = /* @__PURE__ */ new Map(), this._cancelEventToItems = /* @__PURE__ */ new Map(), this._actionToItems = /* @__PURE__ */ new Map();
  }
  _subscribeSession() {
    var e5, t2;
    this._sessionIdUnsubscribe = null === (e5 = (t2 = this._host).subscribeSession) || void 0 === e5 ? void 0 : e5.call(t2, (e6) => this._onSessionIdChanged(e6));
  }
  _shouldPersistArmedActivation(e5) {
    return false;
  }
  _getActivationTimestampsKey() {
    return null;
  }
  _writeActivationTimestamps(e5) {
  }
  _clearActivationTimestampsStore() {
  }
  _doesEventMatchFilter(e5, t2) {
    return !!e5 && zc(e5.propertyFilters, null == t2 ? void 0 : t2.properties);
  }
  _buildEventToItemMap(e5, t2) {
    const i2 = /* @__PURE__ */ new Map();
    return e5.forEach((e6) => {
      var s2;
      null === (s2 = e6.conditions) || void 0 === s2 || null === (s2 = s2[t2]) || void 0 === s2 || null === (s2 = s2.values) || void 0 === s2 || s2.forEach((t3) => {
        if (null == t3 ? void 0 : t3.name) {
          const s3 = i2.get(t3.name) || [];
          s3.push(e6.id), i2.set(t3.name, s3);
        }
      });
    }), i2;
  }
  _getMatchingItems(e5, t2, i2) {
    const s2 = (i2 === nl.Activation ? this._eventToItems : this._cancelEventToItems).get(e5);
    let r2 = [];
    return this._getItems((e6) => {
      r2 = e6.filter((e7) => null == s2 ? void 0 : s2.includes(e7.id));
    }), r2.filter((s3) => {
      var r3;
      const n2 = null === (r3 = s3.conditions) || void 0 === r3 || null === (r3 = r3[i2]) || void 0 === r3 || null === (r3 = r3.values) || void 0 === r3 ? void 0 : r3.find((t3) => t3.name === e5);
      return this._doesEventMatchFilter(n2, t2);
    });
  }
  register(e5) {
    this._register(e5, false);
  }
  replace(e5) {
    this._register(e5, true);
  }
  _register(e5, t2) {
    ft(this._host.subscribeCapture) || (this._setupEventBasedItems(e5, t2), this._setupActionBasedItems(e5, t2));
  }
  _setupActionBasedItems(e5, t2) {
    const i2 = e5.filter((e6) => {
      var t3;
      return null === (t3 = e6.conditions) || void 0 === t3 || null === (t3 = t3.actions) || void 0 === t3 || null === (t3 = t3.values) || void 0 === t3 ? void 0 : t3.length;
    });
    var s2;
    if (t2 && this._actionToItems.clear(), 0 === i2.length) return void (t2 && (null === (s2 = this._actionMatcher) || void 0 === s2 || s2.replace([])));
    this._actionMatcher || (this._actionMatcher = new ud(this._host), this._actionMatcher.init(), this._actionMatcher._addActionHook((e6) => this.onAction(e6)));
    const r2 = [];
    i2.forEach((e6) => {
      var t3;
      null === (t3 = e6.conditions) || void 0 === t3 || null === (t3 = t3.actions) || void 0 === t3 || t3.values.forEach((t4) => {
        if (r2.push(t4), t4.name) {
          var i3;
          const s3 = null !== (i3 = this._actionToItems.get(t4.name)) && void 0 !== i3 ? i3 : [];
          s3.includes(e6.id) || s3.push(e6.id), this._actionToItems.set(t4.name, s3);
        }
      });
    }), t2 ? this._actionMatcher.replace(r2) : this._actionMatcher.register(r2);
  }
  _mergeItemMaps(e5, t2) {
    t2.forEach((t3, i2) => {
      var s2;
      const r2 = null !== (s2 = e5.get(i2)) && void 0 !== s2 ? s2 : [];
      t3.forEach((e6) => {
        r2.includes(e6) || r2.push(e6);
      }), e5.set(i2, r2);
    });
  }
  _setupEventBasedItems(e5, t2) {
    var i2, s2, r2;
    const n2 = e5.filter((e6) => {
      var t3, i3;
      return (null === (t3 = e6.conditions) || void 0 === t3 ? void 0 : t3.events) && (null === (i3 = e6.conditions) || void 0 === i3 || null === (i3 = i3.events) || void 0 === i3 || null === (i3 = i3.values) || void 0 === i3 ? void 0 : i3.length) > 0;
    }), o2 = e5.filter((e6) => {
      var t3, i3;
      return (null === (t3 = e6.conditions) || void 0 === t3 ? void 0 : t3.cancelEvents) && (null === (i3 = e6.conditions) || void 0 === i3 || null === (i3 = i3.cancelEvents) || void 0 === i3 || null === (i3 = i3.values) || void 0 === i3 ? void 0 : i3.length) > 0;
    }), a2 = this._buildEventToItemMap(e5, nl.Activation), l2 = this._buildEventToItemMap(e5, nl.Cancellation);
    t2 ? (this._eventToItems = a2, this._cancelEventToItems = l2) : (this._mergeItemMaps(this._eventToItems, a2), this._mergeItemMaps(this._cancelEventToItems, l2)), (0 !== n2.length || 0 !== o2.length || e5.some((e6) => {
      var t3;
      return null === (t3 = e6.conditions) || void 0 === t3 || null === (t3 = t3.actions) || void 0 === t3 || null === (t3 = t3.values) || void 0 === t3 ? void 0 : t3.length;
    })) && (null !== (i2 = this._captureHookUnsubscribe) && void 0 !== i2 || (this._captureHookUnsubscribe = null === (s2 = (r2 = this._host).subscribeCapture) || void 0 === s2 ? void 0 : s2.call(r2, (e6, t3) => {
      this.onEvent(e6, t3);
    })));
  }
  onEvent(e5, t2) {
    var i2, s2;
    const r2 = this._getLogger(), n2 = (null == t2 || null === (i2 = t2.properties) || void 0 === i2 ? void 0 : i2.$survey_id) || (null == t2 || null === (s2 = t2.properties) || void 0 === s2 ? void 0 : s2.$product_tour_id);
    if (n2 && this.getActivatedIds().includes(n2)) {
      const i3 = this._activationOutcome(e5, n2, t2);
      if ("consume" === i3) return r2.info("event consumed activated item, removing it", { event: e5, itemId: n2 }), void this._deactivateItems([n2]);
      if ("persist" === i3) return r2.info("shown item promoted to persisted activation", { event: e5, itemId: n2 }), this._persistActivation(n2), void this._clearActivationTimestamps([n2]);
    }
    if (this._cancelEventToItems.has(e5)) {
      const i3 = this._getMatchingItems(e5, t2, nl.Cancellation);
      i3.length > 0 && (r2.info("cancel event matched, cancelling items", { event: e5, itemsToCancel: i3.map((e6) => e6.id) }), this._deactivateItems(i3.map((e6) => e6.id)), i3.forEach((e6) => this._cancelPendingItem(e6.id)));
    }
    if (!this._eventToItems.has(e5)) return;
    r2.info("event name matched", { event: e5, eventPayload: t2, items: this._eventToItems.get(e5) });
    const o2 = this._getMatchingItems(e5, t2, nl.Activation);
    this._activateItems(o2.map((e6) => e6.id));
  }
  onAction(e5) {
    this._actionToItems.has(e5) && this._activateItems(this._actionToItems.get(e5) || []);
  }
  _activateItems(e5) {
    if (0 === e5.length) return;
    const t2 = !!this._host.getSessionId(), i2 = [];
    for (const s2 of e5) t2 && this._shouldPersistArmedActivation(s2) ? this._persistActivation(s2) && this._recordActivationTimestamp(s2) : i2.push(s2);
    i2.length > 0 && (this._pendingActivatedItems = [.../* @__PURE__ */ new Set([...this._pendingActivatedItems, ...i2])]), this._getLogger().info("updating activated items", { activatedItems: this.getActivatedIds() }), this._notifyActivationChanged();
  }
  _persistActivation(e5) {
    this._pendingActivatedItems = this._pendingActivatedItems.filter((t3) => t3 !== e5);
    const t2 = this._getPersistedActivatedIds();
    return !t2.includes(e5) && (this._setActivatedItems([...t2, e5]), this._stampActivationSession(), true);
  }
  _deactivateItems(e5) {
    const t2 = new Set(e5);
    this._pendingActivatedItems = this._pendingActivatedItems.filter((e6) => !t2.has(e6));
    const i2 = this._getRawPersistedActivatedIds(), s2 = i2.filter((e6) => !t2.has(e6));
    s2.length !== i2.length && (this._setActivatedItems(s2), 0 === s2.length && this._clearActivationSession()), this._clearActivationTimestamps(e5), this._notifyActivationChanged();
  }
  _notifyActivationChanged() {
    try {
      var e5;
      null === (e5 = this._onActivationChanged) || void 0 === e5 || e5.call(this);
    } catch (e6) {
      this._getLogger().error("Error while handling activated items change", e6);
    }
  }
  _getRawActivationTimestamps() {
    const e5 = this._getActivationTimestampsKey();
    if (!e5) return {};
    const t2 = this._host.getProperty(e5);
    return t2 && "object" == typeof t2 ? t2 : {};
  }
  _recordActivationTimestamp(e5) {
    if (!this._getActivationTimestampsKey()) return;
    const t2 = this._getRawActivationTimestamps();
    this._writeActivationTimestamps(ls(ls({}, t2), {}, { [e5]: Date.now() }));
  }
  _clearActivationTimestamps(e5) {
    if (!this._getActivationTimestampsKey()) return;
    const t2 = this._getRawActivationTimestamps(), i2 = {};
    let s2 = false;
    for (const [r2, n2] of Object.entries(t2)) e5.includes(r2) ? s2 = true : i2[r2] = n2;
    s2 && (vt(i2) ? this._clearActivationTimestampsStore() : this._writeActivationTimestamps(i2));
  }
  _clearAllActivationTimestamps() {
    this._getActivationTimestampsKey() && this._clearActivationTimestampsStore();
  }
  getActivationTimestamp(e5) {
    if (!this._getPersistedActivatedIds().includes(e5)) return;
    const t2 = this._getRawActivationTimestamps()[e5];
    return wt(t2) ? t2 : void 0;
  }
  _getRawPersistedActivatedIds() {
    const e5 = this._getActivatedKey();
    return this._host.getProperty(e5) || [];
  }
  _getPersistedActivatedIds() {
    const e5 = this._getRawPersistedActivatedIds();
    if (0 === e5.length) return [];
    const t2 = this._host.getProperty(this._getActivatedSessionKey()), i2 = this._host.getSessionId();
    return i2 && t2 === i2 ? e5 : [];
  }
  _stampActivationSession() {
    const e5 = this._host.getSessionId();
    e5 && this._setActivatedSession(e5);
  }
  _clearActivationSession() {
    this._clearActivatedSession();
  }
  _onSessionIdChanged(e5) {
    const t2 = this._host.getProperty(this._getActivatedSessionKey());
    if (t2 && t2 !== e5) {
      const e6 = this._getRawPersistedActivatedIds(), t3 = this._getRawActivationTimestamps();
      e6.length > 0 && (this._setActivatedItems([]), e6.filter((e7) => wt(t3[e7])).forEach((e7) => this._cancelPendingItem(e7))), this._clearActivationSession(), this._clearAllActivationTimestamps(), e6.length > 0 && this._notifyActivationChanged();
    }
  }
  getActivatedIds() {
    return [.../* @__PURE__ */ new Set([...this._getPersistedActivatedIds(), ...this._pendingActivatedItems])].filter((e5) => !this._isItemPermanentlyIneligible(e5));
  }
  dispose() {
    var e5, t2, i2;
    null === (e5 = this._sessionIdUnsubscribe) || void 0 === e5 || e5.call(this), this._sessionIdUnsubscribe = void 0, null === (t2 = this._captureHookUnsubscribe) || void 0 === t2 || t2.call(this), this._captureHookUnsubscribe = void 0, null === (i2 = this._actionMatcher) || void 0 === i2 || i2.dispose(), this._actionMatcher = void 0;
  }
  reset() {
    this._pendingActivatedItems = [], this._getRawPersistedActivatedIds().length > 0 && this._setActivatedItems([]), this._clearActivationSession(), this._clearAllActivationTimestamps(), this._notifyActivationChanged();
  }
  getEventToItemsMap() {
    return this._eventToItems;
  }
  _getActionMatcher() {
    return this._actionMatcher;
  }
};
var hd = class extends dd {
  constructor(e5, t2, i2, s2) {
    var r2;
    super({ subscribeCapture(t3) {
      const i3 = e5.onEvent((e6) => t3(e6.event, e6));
      return () => i3.dispose();
    }, subscribeSession(t3) {
      const i3 = e5.onSession(t3);
      return () => i3.dispose();
    }, getSessionId() {
      var t3;
      return null === (t3 = e5.session) || void 0 === t3 ? void 0 : t3.sessionId;
    }, getProperty: (t3) => e5.kv.get(t3), getActionUrl: null == i2 ? void 0 : i2.getActionUrl, setElementSelectors: null !== (r2 = null == i2 ? void 0 : i2.setElementSelectors) && void 0 !== r2 ? r2 : (t3, i3) => {
      var s3;
      return null === (s3 = e5.getExtension("autocapture")) || void 0 === s3 ? void 0 : s3.setElementSelectors(t3, i3);
    } }, s2), this._client = e5, this._surveys = t2, this._subscribeSession();
  }
  _getActivatedKey() {
    return E;
  }
  _getActivatedSessionKey() {
    return C;
  }
  _getActivationTimestampsKey() {
    return k;
  }
  _writeActivationTimestamps(e5) {
    this._client.kv.set({ [k]: e5 });
  }
  _clearActivationTimestampsStore() {
    this._client.kv.remove(k);
  }
  _shouldPersistArmedActivation(e5) {
    var t2;
    let i2;
    this._getItems((t3) => {
      i2 = t3.find((t4) => t4.id === e5);
    });
    const s2 = null == i2 || null === (t2 = i2.appearance) || void 0 === t2 ? void 0 : t2.surveyPopupDelaySeconds;
    return wt(s2) && s2 > 0;
  }
  _getShownEventName() {
    return _l.SHOWN;
  }
  _getItems(e5) {
    this._surveys.getSurveys(e5);
  }
  _cancelPendingItem(e5) {
    this._surveys.cancelPendingSurvey(e5);
  }
  _getLogger() {
    return Jc;
  }
  _setActivatedItems(e5) {
    this._client.kv.set({ [E]: e5 });
  }
  _setActivatedSession(e5) {
    this._client.kv.set({ [C]: e5 });
  }
  _clearActivatedSession() {
    this._client.kv.remove(C);
  }
  _isItemPermanentlyIneligible() {
    return false;
  }
  _activationOutcome(e5, t2, i2) {
    var s2;
    if (e5 === _l.SENT && false === (null == i2 || null === (s2 = i2.properties) || void 0 === s2 ? void 0 : s2.$survey_completed)) return "ignore";
    let r2;
    return this._getItems((e6) => {
      r2 = e6.find((e7) => e7.id === t2);
    }), !r2 || (function(e6) {
      var t3;
      return Bc(e6) && !!(null === (t3 = e6.conditions) || void 0 === t3 || null === (t3 = t3.events) || void 0 === t3 ? void 0 : t3.repeatedActivation) || "always" === e6.schedule;
    })(r2) ? e5 === _l.SHOWN ? "consume" : "ignore" : e5 === _l.SHOWN ? "persist" : e5 === _l.DISMISSED || e5 === _l.SENT ? "consume" : "ignore";
  }
  getSurveys() {
    return this.getActivatedIds();
  }
  getEventToSurveys() {
    return this.getEventToItemsMap();
  }
};
var _d = (e5, t2) => (null == e5 ? void 0 : e5.then) ? e5.then(t2) : t2(e5);
var pd = "SDK is not enabled or survey functionality is not yet loaded";
var gd = "Disabled. Not loading surveys.";
var vd = class {
  constructor(e5) {
    this._configSource = e5, this.name = "surveys", this._surveyEventReceiver = null, this._surveyManager = null, this._isInitializingSurveys = false, this._surveyInitializationFailed = false, this._surveyCallbacks = [], this._activeMatchingSurveyCallbacks = [], this._getSurveysInFlightPromise = null, this._lastSurveyRefreshFailedAt = null, this._disposed = false, this._renderTimeouts = /* @__PURE__ */ new Set(), this.onRemoteConfig = (e6) => {
      if (this._disposed) return;
      if (this._config.disableSurveys) return;
      if (!e6.ok) return this._surveyInitializationFailed = true, this._notifyActiveMatchingSurveyCallbacks({ isLoaded: false, error: "Remote config unavailable. Not loading surveys." }), Jc.warn("Remote config unavailable. Not loading surveys.");
      const t2 = e6.config.surveys;
      if (St(t2)) return Jc.warn("Flags not loaded yet. Not loading surveys.");
      this._isSurveysEnabled = Ct(t2) ? t2 : t2.length > 0, Jc.info(`flags response received, isSurveysEnabled: ${this._isSurveysEnabled}`), this.loadIfEnabled();
    }, this._notifyActiveMatchingSurveyCallbacks = (e6) => {
      this._activeMatchingSurveyCallbacks.slice().forEach((t2) => this._notifyActiveMatchingSurveyCallback(t2, e6));
    };
  }
  setup(e5) {
    if (!this._disposed) return this._initializingClient = e5, _d(e5.kv.initialize(), () => {
      if (this._initializingClient !== e5 || this._disposed) return;
      this._initializingClient = void 0, this._client = e5;
      const t2 = e5.onRemoteConfig(this.onRemoteConfig);
      this._disposed ? t2.dispose() : (this._remoteConfigSubscription = t2, this.loadIfEnabled());
    });
  }
  dispose() {
    var e5, t2, i2, s2, r2;
    this._disposed || (this._disposed = true, this._initializingClient = void 0, this._client = void 0, null === (e5 = this._remoteConfigSubscription) || void 0 === e5 || e5.dispose(), this._remoteConfigSubscription = void 0, null === (t2 = this._surveyEventReceiver) || void 0 === t2 || t2.dispose(), this._surveyEventReceiver = null, null === (i2 = this._surveyManager) || void 0 === i2 || null === (s2 = i2.dispose) || void 0 === s2 || s2.call(i2), this._surveyManager = null, this._surveyCallbacks = [], this._activeMatchingSurveyCallbacks.forEach((e6) => {
      e6.active = false;
    }), this._activeMatchingSurveyCallbacks = [], null === (r2 = this._activeMatchingSurveyConditionsUnsubscribe) || void 0 === r2 || r2.call(this), this._activeMatchingSurveyConditionsUnsubscribe = void 0, this._getSurveysInFlightPromise = null, this._renderTimeouts.forEach((e6) => clearTimeout(e6)), this._renderTimeouts.clear());
  }
  get _config() {
    return this._configSource.get();
  }
  getRenderContext() {
    if (!this._client) return;
    const e5 = this;
    return { client: this._client, get config() {
      return e5._config;
    }, surveys: e5 };
  }
  initialize() {
    this.loadIfEnabled();
  }
  reset() {
    var e5, t2;
    null === (e5 = this._surveyManager) || void 0 === e5 || null === (t2 = e5.clearInMemoryInProgressSurveyState) || void 0 === t2 || t2.call(e5);
    try {
      var i2;
      null === (i2 = this._surveyEventReceiver) || void 0 === i2 || i2.reset(), localStorage.removeItem("lastSeenSurveyDate");
      const e6 = [];
      for (let t3 = 0; t3 < localStorage.length; t3++) {
        const i3 = localStorage.key(t3);
        ((null == i3 ? void 0 : i3.startsWith("seenSurvey_")) || (null == i3 ? void 0 : i3.startsWith("inProgressSurvey_"))) && e6.push(i3);
      }
      e6.forEach((e7) => localStorage.removeItem(e7));
    } catch (e6) {
    }
    this._notifyActiveMatchingSurveyCallbacks();
  }
  loadIfEnabled() {
    if (this._disposed || !this._client) return;
    const e5 = this._config;
    if (this._surveyManager) return;
    if (this._isInitializingSurveys) return void Jc.info("Already initializing surveys, skipping...");
    if (e5.disableSurveys) return void Jc.info(gd);
    if (e5.cookielessMode && this._client.isOptedOut) return void Jc.info("Not loading surveys in cookieless mode without consent.");
    const t2 = this._configSource.getExtensions();
    if (!t2) return void this._handleSurveyLoadError("PostHog Extensions not found.");
    if (ft(this._isSurveysEnabled) && !e5.advancedEnableSurveys) return;
    const i2 = this._isSurveysEnabled || e5.advancedEnableSurveys;
    this._isInitializingSurveys = true, this._surveyInitializationFailed = false;
    try {
      const e6 = t2.generateSurveys;
      if (e6) return this._completeSurveyInitialization(e6, i2), void (this._isInitializingSurveys = false);
      const s2 = t2.loadExternalDependency;
      if (!s2) return this._handleSurveyLoadError(w), void (this._isInitializingSurveys = false);
      s2((e7) => {
        try {
          if (this._disposed) return;
          const t3 = this._configSource.getExtensions();
          e7 || !(null == t3 ? void 0 : t3.generateSurveys) ? this._handleSurveyLoadError("Could not load surveys script", e7) : this._completeSurveyInitialization(t3.generateSurveys, i2);
        } finally {
          this._isInitializingSurveys = false;
        }
      });
    } catch (e6) {
      throw this._isInitializingSurveys = false, this._handleSurveyLoadError("Error initializing surveys", e6), e6;
    }
  }
  _completeSurveyInitialization(e5, t2) {
    var i2;
    if (this._disposed) return;
    this._surveyManager = e5(t2), this._surveyEventReceiver = this._createEventReceiver(this._client, this._notifyActiveMatchingSurveyCallbacks);
    const s2 = null === (i2 = this._client) || void 0 === i2 ? void 0 : i2.kv.get(b);
    s2 && this._registerEventOrActionBasedSurveys(s2), Jc.info("Surveys loaded successfully"), this._startActiveMatchingSurveyConditions(), this._notifyActiveMatchingSurveyCallbacks(), this._notifySurveyCallbacks({ isLoaded: true });
  }
  _createEventReceiver(e5, t2) {
    return new hd(e5, this, void 0, t2);
  }
  _handleSurveyLoadError(e5, t2) {
    this._surveyInitializationFailed = true, Jc.error(e5, t2), this._notifyActiveMatchingSurveyCallbacks({ isLoaded: false, error: e5 }), this._notifySurveyCallbacks({ isLoaded: false, error: e5 });
  }
  onSurveysLoaded(e5) {
    return this._surveyCallbacks.push(e5), this._surveyManager && this._notifySurveyCallbacks({ isLoaded: true }), () => {
      this._surveyCallbacks = this._surveyCallbacks.filter((t2) => t2 !== e5);
    };
  }
  getSurveys(e5, t2 = false) {
    if (this._disposed) return;
    const i2 = this._client;
    if (!i2) return e5([], { isLoaded: false, error: pd });
    if (this._config.disableSurveys) return Jc.info(gd), e5([]);
    const s2 = i2.kv.get(b);
    if (s2 && !t2) return e5(s2, { isLoaded: true }), void (this._shouldBackgroundRefreshSurveys() && this.getSurveys(() => {
    }, true));
    if (this._getSurveysInFlightPromise) return void this._getSurveysInFlightPromise.then(({ surveys: t3, context: i3 }) => {
      this._disposed || e5(t3, i3);
    }).catch((e6) => Jc.error("Error in survey callback", e6));
    const r2 = i2.sendRequest("/api/surveys/", { method: "GET", query: { token: i2.projectToken }, sentAt: "query", timeoutMs: this._config.requestTimeoutMs }).then((e6) => {
      try {
        return this._handleSurveyResponse(i2, e6);
      } catch (e7) {
        return Jc.error("Error processing surveys response", e7), this._handleSurveyResponse(i2, { statusCode: 0, error: e7 });
      }
    }, (e6) => this._handleSurveyResponse(i2, { statusCode: 0, error: e6 }));
    this._getSurveysInFlightPromise = r2;
    const n2 = () => {
      this._getSurveysInFlightPromise === r2 && (this._getSurveysInFlightPromise = null);
    };
    r2.then((t3) => {
      n2(), this._disposed || (this._notifyActiveMatchingSurveyCallbacks(t3.context), e5(t3.surveys, t3.context));
    }, n2).catch((e6) => Jc.error("Error in survey callback", e6));
  }
  _handleSurveyResponse(e5, t2) {
    if (this._disposed) return { surveys: [], context: { isLoaded: false, error: pd } };
    const i2 = t2.statusCode;
    if (200 !== i2 || !t2.json) {
      const e6 = `Surveys API could not be loaded, status: ${i2}`;
      return 0 !== i2 ? Jc.error(e6) : t2.error || Jc.warn(e6), this._lastSurveyRefreshFailedAt = Date.now(), { surveys: [], context: { isLoaded: false, error: e6 } };
    }
    this._lastSurveyRefreshFailedAt = null;
    const s2 = t2.json.surveys || [];
    return e5.kv.set({ [b]: s2, [S]: Date.now() }), this._registerEventOrActionBasedSurveys(s2), { surveys: s2, context: { isLoaded: true } };
  }
  _registerEventOrActionBasedSurveys(e5) {
    const t2 = e5.filter((e6) => (function(e7) {
      return !(!e7.start_date || e7.end_date);
    })(e6) && (Bc(e6) || (function(e7) {
      var t3;
      return !!(null === (t3 = e7.conditions) || void 0 === t3 || null === (t3 = t3.actions) || void 0 === t3 || null === (t3 = t3.values) || void 0 === t3 ? void 0 : t3.length);
    })(e6)));
    this._registerSurveyTriggers(t2);
  }
  _registerSurveyTriggers(e5) {
    var t2;
    null === (t2 = this._surveyEventReceiver) || void 0 === t2 || t2.replace(e5);
  }
  _shouldBackgroundRefreshSurveys() {
    return this._isSurveyCacheStale() && !this._getSurveysInFlightPromise && !this._isSurveyRefreshBackingOff();
  }
  _isSurveyCacheStale() {
    var e5;
    const t2 = null === (e5 = this._client) || void 0 === e5 ? void 0 : e5.kv.get(S);
    return wt(t2) && Date.now() - t2 > 3e5;
  }
  _isSurveyRefreshBackingOff() {
    return wt(this._lastSurveyRefreshFailedAt) && 3e5 > Date.now() - this._lastSurveyRefreshFailedAt;
  }
  markSurveyAsSeen(e5, t2) {
    var i2;
    const s2 = { id: e5, current_iteration: null !== (i2 = null == t2 ? void 0 : t2.iteration) && void 0 !== i2 ? i2 : null };
    Yc(s2);
    try {
      localStorage.setItem("lastSeenSurveyDate", (/* @__PURE__ */ new Date()).toISOString());
    } catch (e6) {
    }
    this._notifyActiveMatchingSurveyCallbacks();
  }
  _notifySurveyCallbacks(e5) {
    for (const t2 of this._surveyCallbacks) {
      if (this._disposed) return;
      try {
        e5.isLoaded ? this.getSurveys(t2) : t2([], e5);
      } catch (e6) {
        Jc.error("Error in survey callback", e6);
      }
    }
  }
  getActiveMatchingSurveys(e5, t2 = false) {
    if (!St(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(e5, t2);
    Jc.warn("init was not called");
  }
  onActiveMatchingSurveysChanged(e5) {
    var t2;
    if (this._disposed) return () => {
    };
    const i2 = { callback: e5, active: true, revision: 0 };
    this._activeMatchingSurveyCallbacks.push(i2), this._startActiveMatchingSurveyConditions();
    const s2 = null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.kv.get(b);
    return this._config.disableSurveys || !this._surveyManager && this._surveyInitializationFailed && !this._isInitializingSurveys || !s2 && !St(this._lastSurveyRefreshFailedAt) && !this._getSurveysInFlightPromise ? this._notifyActiveMatchingSurveyCallback(i2, { isLoaded: false }) : this._surveyManager && this._notifyActiveMatchingSurveyCallback(i2), () => {
      var e6;
      i2.active = false, this._activeMatchingSurveyCallbacks = this._activeMatchingSurveyCallbacks.filter((e7) => e7 !== i2), 0 === this._activeMatchingSurveyCallbacks.length && (null === (e6 = this._activeMatchingSurveyConditionsUnsubscribe) || void 0 === e6 || e6.call(this), this._activeMatchingSurveyConditionsUnsubscribe = void 0);
    };
  }
  _startActiveMatchingSurveyConditions() {
    var e5, t2, i2;
    this._surveyManager && this._activeMatchingSurveyCallbacks.length > 0 && (null !== (e5 = this._activeMatchingSurveyConditionsUnsubscribe) && void 0 !== e5 || (this._activeMatchingSurveyConditionsUnsubscribe = null === (t2 = (i2 = this._configSource).onMatchingConditionsChanged) || void 0 === t2 ? void 0 : t2.call(i2, this._notifyActiveMatchingSurveyCallbacks)));
  }
  _notifyActiveMatchingSurveyCallback(e5, t2) {
    if (this._disposed || !e5.active) return;
    const i2 = ++e5.revision, s2 = (s3) => {
      if (!this._disposed && e5.active && i2 === e5.revision) try {
        const i3 = null != t2 ? t2 : { isLoaded: true }, r2 = JSON.stringify([s3, i3]);
        if (r2 === e5.lastResult) return;
        e5.lastResult = r2, e5.callback(s3, i3);
      } catch (e6) {
        Jc.error("Error in active matching surveys callback", e6);
      }
    };
    try {
      t2 && !t2.isLoaded ? s2([]) : this.getActiveMatchingSurveys(s2);
    } catch (e6) {
      Jc.error("Error in active matching surveys callback", e6);
    }
  }
  _getSurveyById(e5) {
    let t2 = null;
    return this.getSurveys((i2) => {
      var s2;
      t2 = null !== (s2 = i2.find((t3) => t3.id === e5)) && void 0 !== s2 ? s2 : null;
    }), t2;
  }
  _checkSurveyEligibility(e5) {
    if (St(this._surveyManager)) return { eligible: false, reason: pd };
    const t2 = "string" == typeof e5 ? this._getSurveyById(e5) : e5;
    return t2 ? this._surveyManager.checkSurveyEligibility(t2) : { eligible: false, reason: "Survey not found" };
  }
  _checkSurveyRenderability(e5) {
    var t2;
    if (!(null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.canCapture)) return { eligible: false, reason: "PostHog is not capturing, so a survey response cannot be recorded" };
    if (St(this._surveyManager)) return { eligible: false, reason: pd };
    const i2 = "string" == typeof e5 ? this._getSurveyById(e5) : e5;
    return i2 ? this._surveyManager.checkSurveyRenderability(i2) : { eligible: false, reason: "Survey not found" };
  }
  canRenderSurvey(e5) {
    if (St(this._surveyManager)) return Jc.warn("init was not called"), { visible: false, disabledReason: pd };
    const t2 = this._checkSurveyRenderability(e5);
    return { visible: t2.eligible, disabledReason: t2.reason };
  }
  canRenderSurveyAsync(e5, t2) {
    return St(this._surveyManager) ? (Jc.warn("init was not called"), Promise.resolve({ visible: false, disabledReason: pd })) : new Promise((i2) => {
      this.getSurveys((t3) => {
        var s2;
        const r2 = null !== (s2 = t3.find((t4) => t4.id === e5)) && void 0 !== s2 ? s2 : null;
        if (r2) {
          const e6 = this._checkSurveyRenderability(r2);
          i2({ visible: e6.eligible, disabledReason: e6.reason });
        } else i2({ visible: false, disabledReason: "Survey not found" });
      }, t2);
    });
  }
  renderSurvey(e5, t2, i2) {
    var s2, r2, n2;
    if (!(null === (s2 = this._client) || void 0 === s2 ? void 0 : s2.canCapture)) return;
    if (St(this._surveyManager)) return void Jc.warn("init was not called");
    const o2 = "string" == typeof e5 ? this._getSurveyById(e5) : e5;
    if (!(null == o2 ? void 0 : o2.id)) return void Jc.warn("Survey not found");
    if (!Zc.includes(o2.type)) return void Jc.warn(`Surveys of type ${o2.type} cannot be rendered in the app`);
    const a2 = null === (r2 = typeof document > "u" ? void 0 : document) || void 0 === r2 ? void 0 : r2.querySelector(t2);
    if (a2) {
      if (null === (n2 = o2.appearance) || void 0 === n2 ? void 0 : n2.surveyPopupDelaySeconds) {
        Jc.info(`Rendering survey ${o2.id} with delay of ${o2.appearance.surveyPopupDelaySeconds} seconds`);
        const e6 = setTimeout(() => {
          var t3, s3, r3;
          this._renderTimeouts.delete(e6), !this._disposed && (null === (t3 = this._client) || void 0 === t3 ? void 0 : t3.canCapture) && (Jc.info(`Rendering survey ${o2.id} with delay of ${null === (s3 = o2.appearance) || void 0 === s3 ? void 0 : s3.surveyPopupDelaySeconds} seconds`), null === (r3 = this._surveyManager) || void 0 === r3 || r3.renderSurvey(o2, a2, i2), Jc.info(`Survey ${o2.id} rendered`));
        }, 1e3 * o2.appearance.surveyPopupDelaySeconds);
        return void this._renderTimeouts.add(e6);
      }
      this._surveyManager.renderSurvey(o2, a2, i2);
    } else Jc.warn("Survey element not found");
  }
  displaySurvey(e5, t2) {
    var i2, s2;
    if (!(null === (i2 = this._client) || void 0 === i2 ? void 0 : i2.canCapture)) return;
    if (St(this._surveyManager)) return void Jc.warn("init was not called");
    const r2 = this._getSurveyById(e5);
    if (!r2) return void Jc.warn("Survey not found");
    let n2 = r2;
    if ((null === (s2 = r2.appearance) || void 0 === s2 ? void 0 : s2.surveyPopupDelaySeconds) && t2.ignoreDelay && (n2 = ls(ls({}, r2), {}, { appearance: ls(ls({}, r2.appearance), {}, { surveyPopupDelaySeconds: 0 }) })), t2.displayType !== gl.Popover && t2.initialResponses && Jc.warn("initialResponses is only supported for popover surveys. prefill will not be applied."), false === t2.ignoreConditions) {
      const e6 = this._checkSurveyEligibility(r2);
      if (!e6.eligible) return void Jc.warn("Survey is not eligible to be displayed: ", e6.reason);
    }
    t2.displayType !== gl.Inline ? this._surveyManager.handlePopoverSurvey(n2, t2) : this.renderSurvey(n2, t2.selector, t2.properties);
  }
  cancelPendingSurvey(e5) {
    St(this._surveyManager) ? Jc.warn("init was not called") : this._surveyManager.cancelSurvey(e5);
  }
  handlePageUnload() {
    var e5, t2;
    null === (e5 = this._surveyManager) || void 0 === e5 || null === (t2 = e5.handlePageUnload) || void 0 === t2 || t2.call(e5);
  }
};
var fd = class {
  constructor(e5) {
    this._instance = e5;
  }
  get() {
    var e5, t2, i2, s2;
    const r2 = null === (e5 = this._instance) || void 0 === e5 ? void 0 : e5.config;
    return { disableSurveys: !!(null == r2 ? void 0 : r2.disable_surveys), cookielessMode: !!(null == r2 ? void 0 : r2.cookieless_mode), advancedEnableSurveys: !!(null == r2 ? void 0 : r2.advanced_enable_surveys), requestTimeoutMs: null !== (t2 = null == r2 ? void 0 : r2.surveys_request_timeout_ms) && void 0 !== t2 ? t2 : 1e4, prefillFromUrl: !!(null == r2 || null === (i2 = r2.surveys) || void 0 === i2 ? void 0 : i2.prefillFromUrl), automaticDisplay: !(null == r2 ? void 0 : r2.disable_surveys_automatic_display), featureFlagEvaluation: !(null == r2 ? void 0 : r2.advanced_disable_feature_flags), overrideLanguage: null == r2 ? void 0 : r2.override_display_language, prepareStylesheet: null == r2 ? void 0 : r2.prepare_external_dependency_stylesheet, get_current_url: null == r2 ? void 0 : r2.get_current_url, uiHost: null === (s2 = this._instance) || void 0 === s2 || null === (s2 = s2.requestRouter) || void 0 === s2 ? void 0 : s2.endpointFor("ui", "") };
  }
  getExtensions() {
    const e5 = null == tt ? void 0 : tt.__PosthogExtensions__;
    if (!e5 || !this._instance) return;
    const t2 = this._instance, { generateSurveys: i2, loadExternalDependency: s2 } = e5;
    return { generateSurveys: i2 ? (e6) => i2(t2, e6) : void 0, loadExternalDependency: s2 ? (e6) => s2(t2, "surveys", e6) : void 0 };
  }
  onMatchingConditionsChanged(e5) {
    var t2, i2;
    const s2 = null === (t2 = this._instance) || void 0 === t2 ? void 0 : t2._addCaptureHook((t3) => {
      "$pageview" !== t3 && t3 !== _l.SHOWN && t3 !== _l.DISMISSED && t3 !== _l.SENT || e5();
    }), r2 = () => e5();
    Bn(je, "PHSurveyShown", r2);
    let n2 = false;
    const o2 = null === (i2 = this._instance) || void 0 === i2 ? void 0 : i2.onFeatureFlags(() => {
      n2 && e5();
    });
    return n2 = true, () => {
      n2 = false, null == s2 || s2(), null == o2 || o2(), null == je || je.removeEventListener("PHSurveyShown", r2);
    };
  }
};
var md = (null == je ? void 0 : je.location) ? Ta(je.location.hash, "__posthog") || Ta(location.hash, "state") : null;
var yd = "_postHogToolbarParams";
var bd = Fn("[Toolbar]");
var Sd = Fn("[FeatureFlags]");
var wd = Fn("[FeatureFlags]", { debugEnabled: true });
var Ed = `" failed. Feature flags didn't load in time.`;
var Cd = [502, 504];
var kd = ["click", "keydown", "wheel", "touchstart", "pointerdown"];
var xd = "connection_error";
var Pd = (e5) => {
  const t2 = {};
  for (let i2 = 0; e5.length > i2; i2++) t2[e5[i2]] = true;
  return t2;
};
var Id = (e5) => {
  const t2 = {};
  for (const [i2, s2] of An(e5 || {})) s2 && (t2[i2] = s2);
  return t2;
};
var Fd = class {
  constructor(e5) {
    this.name = "featureFlags", this._override_warning = false, this.featureFlagEventHandlers = [], this._logger = Sd, this._baseEventProperties = {}, this._eventPropertiesWithFlagValues = {}, this._reloadingHandlers = [], this._pendingReloads = /* @__PURE__ */ new Set(), this._activeReloads = /* @__PURE__ */ new Set(), this._hasLoadedFlags = false, this._requestInFlight = false, this._requestGeneration = 0, this._reloadingDisabled = false, this._additionalReloadRequested = false, this._firingFeatureFlagsCallbacks = false, this._flagsLoadedFromRemote = false, this._staleCacheRefreshTriggered = false, this._consecutiveStatusZeroFailures = 0, this._hadUserInteraction = false, this._onOnline = () => {
      const e6 = this._hasStatusZeroCircuitBreakerTripped();
      this._consecutiveStatusZeroFailures = 0, e6 && this.reloadFeatureFlags();
    }, this._refreshIfDue = () => {
      var e6, t2;
      const i2 = this._refreshIntervalMs, s2 = null !== (e6 = this._dueRefreshIntervalMs) && void 0 !== e6 ? e6 : i2;
      ft(i2) || ft(s2) || this._config.remoteRequestsDisabled || !this._document || "hidden" === this._document.visibilityState || Date.now() - (null !== (t2 = this._lastRefreshAt) && void 0 !== t2 ? t2 : 0) < s2 || (this._dueRefreshIntervalMs = this._hadUserInteraction || !this._config.idleRefreshBackoff ? i2 : Math.min(2 * s2, 36e5), this._hadUserInteraction = false, this.reloadFeatureFlags(), this._scheduleNextRefresh());
    }, this._onUserInteraction = () => {
      this._hadUserInteraction && this._dueRefreshIntervalMs === this._refreshIntervalMs || this._resumeConfiguredInterval();
    }, this._onVisibilityChange = () => {
      var e6;
      "visible" === (null === (e6 = this._document) || void 0 === e6 ? void 0 : e6.visibilityState) && this._resumeConfiguredInterval();
    }, this._configSource = e5;
  }
  get _crossTabPersistence() {
  }
  _onConfigUpdated() {
    this._client && this._syncAutomaticRefresh();
  }
  setup(e5) {
    try {
      this._window = typeof window > "u" ? void 0 : window, this._document = typeof document > "u" ? void 0 : document;
    } catch (e6) {
      this._window = void 0, this._document = void 0;
    }
    return this._initializingClient = e5, this._logger = e5.logger.createLogger("[FeatureFlags]"), _d(e5.kv.initialize(), () => {
      this._initializingClient === e5 && (this._initializingClient = void 0, this._client = e5, this._finishSetup(e5));
    });
  }
  _finishSetup(e5) {
    var t2;
    if (this._client === e5) return this._window && Bn(this._window, "online", this._onOnline), this._syncAutomaticRefresh(), this._dynamicProperties = e5.registerDynamicEventProperties(() => this._isCacheStale() ? this._baseEventProperties : this._eventPropertiesWithFlagValues), this._crossTabPersistenceUnsubscribe = null === (t2 = this._crossTabPersistence) || void 0 === t2 ? void 0 : t2.onCrossTabFeatureFlagChange(() => {
      this._clearBootstrapState(), this._rebuildEventProperties(), this._fireFeatureFlagsCallbacks();
    }), this._rebuildEventProperties(), this.initialize();
  }
  _resumeConfiguredInterval() {
    this._hadUserInteraction = true, this._dueRefreshIntervalMs = this._refreshIntervalMs, this._refreshIfDue();
  }
  _syncAutomaticRefresh() {
    var e5;
    const t2 = this._config.refreshIntervalMs, i2 = !this._config.remoteRequestsDisabled && this._document && !ft(t2) && t2 > 0 ? t2 : void 0;
    this._config.idleRefreshBackoff || (this._dueRefreshIntervalMs = i2), i2 !== this._refreshIntervalMs && (this._stopAutomaticRefresh(), ft(i2) || (this._refreshIntervalMs = i2, this._dueRefreshIntervalMs = i2, this._scheduleNextRefresh(), (null === (e5 = this._document) || void 0 === e5 ? void 0 : e5.addEventListener) && (Bn(this._document, m, this._onVisibilityChange), Tn(kd, (e6) => {
      Bn(this._document, e6, this._onUserInteraction, { capture: true });
    }))));
  }
  _scheduleNextRefresh() {
    ft(this._refreshIntervalMs) || (ft(this._refreshInterval) || clearInterval(this._refreshInterval), this._lastRefreshAt = Date.now(), this._refreshInterval = setInterval(this._refreshIfDue, this._refreshIntervalMs));
  }
  _stopAutomaticRefresh() {
    var e5, t2;
    ft(this._refreshInterval) || (clearInterval(this._refreshInterval), this._refreshInterval = void 0, null === (e5 = this._document) || void 0 === e5 || null === (t2 = e5.removeEventListener) || void 0 === t2 || t2.call(e5, "visibilitychange", this._onVisibilityChange), Tn(kd, (e6) => {
      var t3, i2;
      null === (t3 = this._document) || void 0 === t3 || null === (i2 = t3.removeEventListener) || void 0 === i2 || i2.call(t3, e6, this._onUserInteraction, { capture: true });
    })), this._refreshIntervalMs = void 0, this._dueRefreshIntervalMs = void 0, this._hadUserInteraction = false, this._lastRefreshAt = void 0;
  }
  destroy() {
    this._dispose();
  }
  dispose() {
    this._dispose();
  }
  _dispose() {
    var e5, t2, i2;
    this._stopAutomaticRefresh(), this._requestGeneration++, this._additionalReloadRequested = false, this._initializingClient = void 0, this._settleReloads(this._pendingReloads, "cancelled"), this._settleReloads(this._activeReloads, "cancelled"), this._client && (this._clearDebouncer(), null === (e5 = this._dynamicProperties) || void 0 === e5 || e5.dispose(), this._dynamicProperties = void 0, null === (t2 = this._crossTabPersistenceUnsubscribe) || void 0 === t2 || t2.call(this), this._crossTabPersistenceUnsubscribe = void 0, this._reloadingHandlers = [], null === (i2 = this._window) || void 0 === i2 || i2.removeEventListener("online", this._onOnline), this._client = void 0);
  }
  get _config() {
    return this._configSource.get();
  }
  _prop(e5) {
    var t2;
    return this._bootstrapState && e5 in this._bootstrapState ? this._bootstrapState[e5] : null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.kv.get(e5);
  }
  _clearBootstrapState() {
    return !!this._bootstrapState && (this._bootstrapState = void 0, true);
  }
  _fallBackToPersistedFlags() {
    var e5;
    return !ft(null === (e5 = this._client) || void 0 === e5 ? void 0 : e5.kv.get("$enabled_feature_flags")) && this._clearBootstrapState();
  }
  _set(e5) {
    this._persist(() => {
      var t2;
      return null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.kv.set(e5);
    });
  }
  _markCrossTabFeatureFlagSnapshot(e5, t2, i2) {
    if (!this._crossTabPersistence || !e5.$enabled_feature_flags) return;
    const s2 = this._prop("$enabled_feature_flags") || {}, o2 = e5.$enabled_feature_flags || {}, d2 = t2.flags || t2.featureFlags, h2 = t2.flags ? Object.entries(t2.flags).filter(([, e6]) => !(null == e6 ? void 0 : e6.failed)).map(([e6]) => e6) : [], _2 = !!t2.errorsWhileComputingFlags && !!t2.flags, p2 = _2 ? h2 : i2 && !_t(d2) ? Object.keys(d2 || {}) : Array.from(/* @__PURE__ */ new Set([...Object.keys(s2), ...Object.keys(o2)])), v2 = this._prop("$feature_flag_payloads") || {}, f2 = e5.$feature_flag_payloads || {}, m2 = _2 || i2 ? p2 : Array.from(/* @__PURE__ */ new Set([...Object.keys(v2), ...Object.keys(f2)])), y2 = !_2 && !i2, b2 = !!y2 || p2, S2 = !!y2 || m2, w2 = { [r]: b2, [u]: b2, [g]: S2 };
    e5.$feature_flag_details && (w2[n] = b2);
    for (const t3 of [l, a, c]) ft(e5[t3]) || (w2[t3] = true);
    this._crossTabPersistence.markCrossTabFeatureFlagChanges(w2);
  }
  _remove(e5) {
    this._persist(() => {
      var t2;
      return null === (t2 = this._client) || void 0 === t2 ? void 0 : t2.kv.remove(e5);
    });
  }
  _persist(e5) {
    try {
      e5();
    } catch (e6) {
      this._logger.error("Failed to update feature flag persistence", e6);
    }
  }
  _rebuildEventProperties() {
    const e5 = {};
    for (const t3 of [r, g, l, v]) {
      const i3 = this._prop(t3);
      ft(i3) || (e5[t3] = i3);
    }
    this._baseEventProperties = e5;
    const t2 = ls({}, e5), i2 = this._prop(u);
    if (i2) for (const [e6, s2] of Object.entries(i2)) t2[`$feature/${e6}`] = s2;
    this._eventPropertiesWithFlagValues = t2;
  }
  _isCacheStale() {
    const e5 = this._config.cacheTtlMs;
    if (!e5 || 0 >= e5) return false;
    const t2 = this._prop(a);
    return "number" != typeof t2 || Date.now() - t2 > e5;
  }
  _checkAndTriggerStaleRefresh() {
    return !!this._isCacheStale() && (this._staleCacheRefreshTriggered || this._requestInFlight || (this._staleCacheRefreshTriggered = true, this._logger.warn("Feature flag cache is stale, triggering refresh..."), this.reloadFeatureFlags()), true);
  }
  _getValidEvaluationEnvironments() {
    const e5 = this._config.evaluationContexts;
    return (null == e5 ? void 0 : e5.length) ? e5.filter((e6) => {
      const t2 = e6 && "string" == typeof e6 && e6.trim().length > 0;
      return t2 || this._logger.error("Invalid evaluation context found:", e6, "Expected non-empty string"), t2;
    }) : [];
  }
  _getValidFlagKeys() {
    const e5 = this._config.flagKeys;
    if (!ft(e5)) return e5.filter((e6) => {
      const t2 = e6 && "string" == typeof e6 && e6.trim().length > 0;
      return t2 || this._logger.error("Invalid flag key found:", e6, "Expected non-empty string"), t2;
    });
  }
  initialize() {
    var e5, t2;
    const i2 = this._config, s2 = null !== (e5 = null === (t2 = i2.bootstrap) || void 0 === t2 ? void 0 : t2.featureFlags) && void 0 !== e5 ? e5 : {};
    if (Object.keys(s2).length) {
      var r2, n2;
      const e6 = null !== (r2 = null === (n2 = i2.bootstrap) || void 0 === n2 ? void 0 : n2.featureFlagPayloads) && void 0 !== r2 ? r2 : {}, t3 = Object.keys(s2).filter((e7) => !ft(s2[e7])).reduce((e7, t4) => (e7[t4] = s2[t4], e7), {}), o2 = Object.keys(e6).filter((e7) => t3[e7]).reduce((t4, i3) => (t4[i3] = e6[i3], t4), {});
      return this._receivedFeatureFlags({ featureFlags: t3, featureFlagPayloads: o2 }, void 0, { persist: false });
    }
  }
  updateFlags(e5, t2, i2) {
    var s2, r2;
    const n2 = (null == i2 ? void 0 : i2.merge) && null !== (s2 = this._prop("$enabled_feature_flags")) && void 0 !== s2 ? s2 : {}, o2 = (null == i2 ? void 0 : i2.merge) && null !== (r2 = this._prop("$feature_flag_payloads")) && void 0 !== r2 ? r2 : {}, a2 = ls(ls({}, n2), e5), l2 = ls(ls({}, o2), t2), c2 = {};
    for (const [e6, t3] of Object.entries(a2)) c2[e6] = { key: e6, enabled: tr(t3), variant: ir(t3), reason: void 0, metadata: ft(null == l2 ? void 0 : l2[e6]) ? void 0 : { id: 0, version: void 0, description: void 0, payload: l2[e6] } };
    this._receivedFeatureFlags({ flags: c2 });
  }
  get hasLoadedFlags() {
    return this._hasLoadedFlags;
  }
  getFlags() {
    return Object.keys(this.getFlagVariants());
  }
  getFlagsWithDetails() {
    const e5 = this._prop(n), t2 = this._prop(v), i2 = this._prop(f);
    if (!i2 && !t2) return e5 || {};
    const s2 = $n({}, e5 || {}), r2 = [.../* @__PURE__ */ new Set([...Object.keys(i2 || {}), ...Object.keys(t2 || {})])];
    for (const e6 of r2) {
      var o2, a2;
      const r3 = s2[e6], n2 = null == t2 ? void 0 : t2[e6], l2 = ft(n2) ? null !== (o2 = null == r3 ? void 0 : r3.enabled) && void 0 !== o2 && o2 : !!n2, c2 = ft(n2) ? null == r3 ? void 0 : r3.variant : "string" == typeof n2 ? n2 : void 0, u2 = null == i2 ? void 0 : i2[e6], d2 = ls(ls({}, r3), {}, { enabled: l2, variant: l2 ? null != c2 ? c2 : null == r3 ? void 0 : r3.variant : void 0 });
      l2 !== (null == r3 ? void 0 : r3.enabled) && (d2.original_enabled = null == r3 ? void 0 : r3.enabled), c2 !== (null == r3 ? void 0 : r3.variant) && (d2.original_variant = null == r3 ? void 0 : r3.variant), u2 && (d2.metadata = ls(ls({}, null == r3 ? void 0 : r3.metadata), {}, { payload: u2, original_payload: null == r3 || null === (a2 = r3.metadata) || void 0 === a2 ? void 0 : a2.payload })), s2[e6] = d2;
    }
    return this._override_warning || (this._logger.warn(" Overriding feature flag details!", { flagDetails: e5, overriddenPayloads: i2, finalDetails: s2 }), this._override_warning = true), s2;
  }
  getAllFeatureFlags() {
    const e5 = this.getFlagVariants(), t2 = this.getFlagPayloads();
    return Object.keys(e5).map((i2) => {
      const s2 = e5[i2];
      return { key: i2, enabled: tr(s2), variant: ir(s2), payload: er(t2[i2]) };
    });
  }
  getFlagVariants() {
    const e5 = this._prop(u), t2 = this._prop(v);
    if (!t2) return e5 || {};
    const i2 = $n({}, e5 || {}), s2 = Object.keys(t2);
    for (let e6 = 0; s2.length > e6; e6++) i2[s2[e6]] = t2[s2[e6]];
    return this._override_warning || (this._logger.warn(" Overriding feature flags!", { enabledFlags: e5, overriddenFlags: t2, finalFlags: i2 }), this._override_warning = true), i2;
  }
  getFlagPayloads() {
    const e5 = this._prop(g), t2 = this._prop(f);
    if (!t2) return e5 || {};
    const i2 = $n({}, e5 || {}), s2 = Object.keys(t2);
    for (let e6 = 0; s2.length > e6; e6++) i2[s2[e6]] = t2[s2[e6]];
    return this._override_warning || (this._logger.warn(" Overriding feature flag payloads!", { flagPayloads: e5, overriddenPayloads: t2, finalPayloads: i2 }), this._override_warning = true), i2;
  }
  reloadFeatureFlags() {
    this._reloadingDisabled || this._config.featureFlagsDisabled || this._hasStatusZeroCircuitBreakerTripped() || (this._firingFeatureFlagsCallbacks && this._logger.warn("reloadFeatureFlags() was called inside an onFeatureFlags callback. This callback also runs when flags change in other tabs, so this can cause a request loop."), this._requestInFlight && (this._additionalReloadRequested = true), this._reloadDebouncer || (this._reloadingHandlers.slice().forEach((e5) => {
      try {
        e5();
      } catch (e6) {
        this._logger.error("Error while running feature flags reloading callback", e6);
      }
    }), this._reloadDebouncer = setTimeout(() => {
      this._callFlagsEndpoint();
    }, 5)));
  }
  reloadFeatureFlagsAsync() {
    return !this._client || this._reloadingDisabled || this._config.featureFlagsDisabled || this._config.remoteRequestsDisabled || this._hasStatusZeroCircuitBreakerTripped() ? Promise.resolve({ status: "skipped" }) : new Promise((e5) => {
      this._pendingReloads.add(e5), this.reloadFeatureFlags();
    });
  }
  _settleReloads(e5, t2) {
    e5.forEach((e6) => e6({ status: t2 })), e5.clear();
  }
  _clearDebouncer() {
    clearTimeout(this._reloadDebouncer), this._reloadDebouncer = void 0;
  }
  onReloading(e5) {
    return this._reloadingHandlers.push(e5), () => {
      this._reloadingHandlers = this._reloadingHandlers.filter((t2) => t2 !== e5);
    };
  }
  ensureFlagsLoaded() {
    this._hasLoadedFlags || this._requestInFlight || this._reloadDebouncer || this.reloadFeatureFlags();
  }
  setAnonymousDistinctId(e5) {
    this.$anon_distinct_id = e5;
  }
  setReloadingPaused(e5) {
    this._reloadingDisabled = e5;
  }
  resetFlagCallReported() {
    this._remove(_);
  }
  _callFlagsEndpoint(e5) {
    var t2;
    this._clearDebouncer();
    const i2 = this._client;
    if (!i2 || this._config.remoteRequestsDisabled || this._hasStatusZeroCircuitBreakerTripped()) return void this._settleReloads(this._pendingReloads, "skipped");
    if (this._requestInFlight) return void (this._additionalReloadRequested = true);
    const s2 = { token: i2.projectToken, distinct_id: i2.distinctId, groups: i2.groups, $anon_distinct_id: this.$anon_distinct_id, person_properties: ls(ls(ls({}, i2.initialPersonProperties), this._prop("$stored_person_properties") || {}), {}, { $lib: i2.library.name, $lib_version: i2.library.version }), group_properties: this._prop(d), timezone: wa() };
    ft(i2.deviceId) || (s2.$device_id = i2.deviceId), ((null == e5 ? void 0 : e5.disableFlags) || this._config.featureFlagsDisabled) && (s2.disable_flags = true);
    const r2 = this._getValidEvaluationEnvironments();
    r2.length && (s2.evaluation_contexts = r2);
    const n2 = this._getValidFlagKeys();
    ft(n2) || (s2.flag_keys = n2);
    const a2 = this._config.onlyEvaluateSurveyFeatureFlags, l2 = "/flags/?v=2" + (a2 ? "&only_evaluate_survey_feature_flags=true" : ""), c2 = this._requestGeneration, u2 = this._pendingReloads;
    this._pendingReloads = /* @__PURE__ */ new Set(), this._activeReloads = u2, this._requestInFlight = true;
    const h2 = () => {
      this._additionalReloadRequested && (this._additionalReloadRequested = false, this._callFlagsEndpoint());
    }, _2 = (e6) => {
      var t3, i3;
      const r3 = null !== (t3 = e6.json) && void 0 !== t3 ? t3 : {}, n3 = 200 !== e6.statusCode;
      if (this._requestInFlight = false, c2 !== this._requestGeneration) return void h2();
      if (this._trackStatusZeroReachability(e6.statusCode), n3 || this._additionalReloadRequested || (this.$anon_distinct_id = void 0), s2.disable_flags && !this._additionalReloadRequested) return void this._settleReloads(u2, "skipped");
      this._flagsLoadedFromRemote = !n3;
      const l3 = [];
      e6.error ? l3.push(e6.error instanceof Error && "AbortError" === e6.error.name ? "timeout" : e6.error instanceof Error ? xd : "unknown_error") : 200 !== e6.statusCode && l3.push(`api_error_${e6.statusCode}`), r3.errorsWhileComputingFlags && l3.push("errors_while_computing_flags");
      const d2 = !!(null === (i3 = r3.quotaLimited) || void 0 === i3 ? void 0 : i3.includes("feature_flags"));
      d2 && l3.push("quota_limited"), this._set({ [o]: l3 }), d2 ? this._logger.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : s2.disable_flags || this._receivedFeatureFlags(r3, n3, { partialResponse: a2 }), this._settleReloads(u2, s2.disable_flags ? "skipped" : l3.length || !r3.flags && !r3.featureFlags ? "error" : "loaded"), h2();
    }, p2 = (e6) => {
      this._requestInFlight = false, c2 === this._requestGeneration ? (this._set({ [o]: [xd] }), this._logger.error("Feature flag request failed", e6), this._fallBackToPersistedFlags() && this._fireFeatureFlagsCallbacks(true), this._settleReloads(u2, "error"), h2()) : h2();
    };
    let g2 = null !== (t2 = this._config.requestMaxRetries) && void 0 !== t2 ? t2 : 1;
    const v2 = () => g2 > 0 && c2 === this._requestGeneration, f2 = () => {
      if (c2 !== this._requestGeneration || !this._client || this._config.remoteRequestsDisabled) return this._requestInFlight = false, this._settleReloads(u2, "skipped"), void h2();
      try {
        i2.sendRequest(l2, { target: "flags", method: "POST", body: s2, compression: this._config.compression, sentAt: "body", timeoutMs: this._config.requestTimeoutMs }).then((e6) => {
          if (((e7) => Cd.includes(e7.statusCode) || ((e8) => 0 === e8.statusCode && e8.error instanceof Error && "AbortError" === e8.error.name)(e7))(e6) && v2()) return g2--, void setTimeout(f2, 500);
          _2(e6);
        }).catch(p2);
      } catch (e6) {
        p2(e6);
      }
    };
    f2();
  }
  _hasStatusZeroCircuitBreakerTripped() {
    return ka(this._consecutiveStatusZeroFailures, 3);
  }
  _trackStatusZeroReachability(e5) {
    this._consecutiveStatusZeroFailures = xa(e5, this._consecutiveStatusZeroFailures, 3, () => this._logger.warn("Feature flag requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped refreshing feature flags; will try again when connectivity changes."));
  }
  getFeatureFlag(e5, t2 = {}) {
    var i2;
    if (t2.fresh && !this._flagsLoadedFromRemote) return;
    if (!(this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0)) return void this._logger.warn('getFeatureFlag for key "' + e5 + Ed);
    if (this._checkAndTriggerStaleRefresh()) return;
    const s2 = this.getFeatureFlagResult(e5, t2);
    return null !== (i2 = null == s2 ? void 0 : s2.variant) && void 0 !== i2 ? i2 : null == s2 ? void 0 : s2.enabled;
  }
  getFeatureFlagDetails(e5) {
    return this.getFlagsWithDetails()[e5];
  }
  getFeatureFlagPayload(e5) {
    const t2 = this.getFeatureFlagResult(e5, { send_event: false });
    return null == t2 ? void 0 : t2.payload;
  }
  getFeatureFlagResult(e5, t2 = {}) {
    if (t2.fresh && !this._flagsLoadedFromRemote) return;
    if (!(this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0)) return void this._logger.warn('getFeatureFlagResult for key "' + e5 + Ed);
    if (this._checkAndTriggerStaleRefresh()) return;
    const i2 = this.getFlagVariants(), s2 = e5 in i2, r2 = i2[e5], n2 = this.getFlagPayloads()[e5], o2 = String(r2), a2 = this._prop("$feature_flag_request_id") || void 0, l2 = this._prop("$feature_flag_evaluated_at") || void 0;
    let c2, u2 = this._prop("$flag_call_reported") || {};
    if (this._config.deduplicateCallsPerSession) {
      var d2;
      const e6 = null === (d2 = this._client) || void 0 === d2 || null === (d2 = d2.session) || void 0 === d2 ? void 0 : d2.sessionId, t3 = this._prop(p);
      e6 && e6 !== t3 && (u2 = {}, c2 = e6);
    }
    if (!t2.send_event && "send_event" in t2) c2 && this._set({ [_]: u2, [p]: c2 });
    else {
      var h2, g2;
      const t3 = null === (h2 = this._client) || void 0 === h2 ? void 0 : h2.canCapture;
      if (!t3 && Object.keys(u2).length > 0 && (u2 = {}, this._set({ [_]: u2 })), t3 && !(null === (g2 = u2[e5]) || void 0 === g2 ? void 0 : g2.includes(o2))) {
        var v2, f2, m2, y2, b2, S2, w2, E2, C2, k2, x2, P2, I2;
        _t(u2[e5]) ? u2[e5].push(o2) : u2[e5] = [o2], this._set(ls({ [_]: u2 }, c2 ? { [p]: c2 } : {}));
        const t4 = this.getFeatureFlagDetails(e5), i3 = [...null !== (v2 = this._prop("$feature_flag_errors")) && void 0 !== v2 ? v2 : []];
        ft(r2) && i3.push("flag_missing");
        const s3 = { $feature_flag: e5, $feature_flag_response: r2, $feature_flag_payload: null != n2 ? n2 : null, $feature_flag_request_id: a2, $feature_flag_evaluated_at: l2, $feature_flag_bootstrapped_response: null !== (f2 = null === (m2 = this._config.bootstrap) || void 0 === m2 || null === (m2 = m2.featureFlags) || void 0 === m2 ? void 0 : m2[e5]) && void 0 !== f2 ? f2 : null, $feature_flag_bootstrapped_payload: null !== (y2 = null === (b2 = this._config.bootstrap) || void 0 === b2 || null === (b2 = b2.featureFlagPayloads) || void 0 === b2 ? void 0 : b2[e5]) && void 0 !== y2 ? y2 : null, $used_bootstrap_value: !this._flagsLoadedFromRemote };
        ft(null == t4 || null === (S2 = t4.metadata) || void 0 === S2 ? void 0 : S2.has_experiment) || (s3.$feature_flag_has_experiment = t4.metadata.has_experiment), ft(null == t4 || null === (w2 = t4.metadata) || void 0 === w2 ? void 0 : w2.version) || (s3.$feature_flag_version = t4.metadata.version);
        const d3 = null !== (E2 = null == t4 || null === (C2 = t4.reason) || void 0 === C2 ? void 0 : C2.description) && void 0 !== E2 ? E2 : null == t4 || null === (k2 = t4.reason) || void 0 === k2 ? void 0 : k2.code;
        d3 && (s3.$feature_flag_reason = d3), (null == t4 || null === (x2 = t4.metadata) || void 0 === x2 ? void 0 : x2.id) && (s3.$feature_flag_id = t4.metadata.id), ft(null == t4 ? void 0 : t4.original_variant) && ft(null == t4 ? void 0 : t4.original_enabled) || (s3.$feature_flag_original_response = ft(t4.original_variant) ? t4.original_enabled : t4.original_variant), (null == t4 || null === (P2 = t4.metadata) || void 0 === P2 ? void 0 : P2.original_payload) && (s3.$feature_flag_original_payload = null == t4 || null === (I2 = t4.metadata) || void 0 === I2 ? void 0 : I2.original_payload), i3.length && (s3.$feature_flag_error = i3.join(",")), this._captureFeatureFlagCalled(s3);
      } else c2 && this._set({ [_]: u2, [p]: c2 });
    }
    return s2 ? { key: e5, enabled: !!r2, variant: "string" == typeof r2 ? r2 : void 0, payload: er(n2) } : void 0;
  }
  _captureFeatureFlagCalled(e5) {
    try {
      var t2;
      null === (t2 = this._client) || void 0 === t2 || t2.capture("$feature_flag_called", e5);
    } catch (e6) {
      this._logger.error("Failed to capture feature flag call", e6);
    }
  }
  getRemoteConfigPayload(e5, t2) {
    this._getRemoteConfigPayload(e5, t2);
  }
  _getRemoteConfigPayload(e5, t2) {
    var i2 = this;
    return Lt(function* () {
      const s2 = i2._client;
      if (!s2) return;
      const r2 = { distinct_id: s2.distinctId, token: s2.projectToken, person_properties: { $lib: s2.library.name, $lib_version: s2.library.version } }, n2 = i2._getValidEvaluationEnvironments();
      n2.length && (r2.evaluation_contexts = n2);
      const o2 = i2._getValidFlagKeys();
      let a2;
      ft(o2) || (r2.flag_keys = o2);
      try {
        var l2;
        const t3 = null === (l2 = (yield s2.sendRequest("/flags/?v=2", { target: "flags", method: "POST", body: r2, compression: i2._config.compression, sentAt: "body", timeoutMs: i2._config.requestTimeoutMs })).json) || void 0 === l2 ? void 0 : l2.featureFlagPayloads;
        a2 = (null == t3 ? void 0 : t3[e5]) || void 0;
      } catch (e6) {
        return void i2._logger.error("Remote config feature flag request failed", e6);
      }
      try {
        t2(a2);
      } catch (e6) {
        i2._logger.error("Remote config feature flag callback failed", e6);
      }
    })();
  }
  isFeatureEnabled(e5, t2 = {}) {
    if (t2.fresh && !this._flagsLoadedFromRemote) return t2.defaultValue;
    if (!(this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0)) return this._logger.warn('isFeatureEnabled for key "' + e5 + Ed), t2.defaultValue;
    const i2 = this.getFeatureFlag(e5, t2);
    return ft(i2) ? t2.defaultValue : !!i2;
  }
  addFeatureFlagsHandler(e5) {
    this.featureFlagEventHandlers.push(e5);
  }
  removeFeatureFlagsHandler(e5) {
    this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t2) => t2 !== e5);
  }
  receivedFeatureFlags(e5, t2, i2) {
    this._receivedFeatureFlags(e5, t2, i2);
  }
  _receivedFeatureFlags(e5, t2, i2) {
    if (!this._client) return;
    this._hasLoadedFlags = true;
    const s2 = ((e6, t3 = {}, i3 = {}, s3 = {}, o2, d2 = Sd) => {
      const h2 = ((e7, t4) => {
        const i4 = e7.flags;
        if (i4) {
          const t5 = Object.fromEntries(Object.keys(i4).map((e8) => {
            var t6;
            return [e8, null !== (t6 = i4[e8].variant) && void 0 !== t6 ? t6 : i4[e8].enabled];
          })), s4 = Object.fromEntries(Object.keys(i4).filter((e8) => i4[e8].enabled).filter((e8) => {
            var t6;
            return !ft(null === (t6 = i4[e8].metadata) || void 0 === t6 ? void 0 : t6.payload);
          }).map((e8) => {
            var t6;
            return [e8, null === (t6 = i4[e8].metadata) || void 0 === t6 ? void 0 : t6.payload];
          }));
          return ls(ls({}, e7), {}, { featureFlags: t5, featureFlagPayloads: s4 });
        }
        return e7.featureFlags && t4.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), e7;
      })(e6, d2), _2 = h2.flags, p2 = h2.featureFlags, v2 = h2.featureFlagPayloads;
      if (!p2) return;
      const f2 = e6.requestId, m2 = e6.evaluatedAt;
      if (_t(p2)) {
        d2.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
        const e7 = {};
        if (p2) for (let t4 = 0; p2.length > t4; t4++) e7[p2[t4]] = true;
        return { [r]: p2, [u]: e7, [c]: false };
      }
      let y2 = p2, b2 = v2, S2 = _2;
      if (null == o2 ? void 0 : o2.partialResponse) {
        const e7 = Object.keys(y2), r2 = b2 || {};
        y2 = ls(ls({}, t3), y2), b2 = ls(ls({}, i3), r2), e7.forEach((e8) => {
          e8 in r2 || null == b2 || delete b2[e8];
        }), S2 = ls(ls({}, s3), S2);
      } else if (e6.errorsWhileComputingFlags) if (_2) {
        const e7 = new Set(Object.keys(_2).filter((e8) => {
          var t4;
          return !(null === (t4 = _2[e8]) || void 0 === t4 ? void 0 : t4.failed);
        }));
        y2 = ls(ls({}, t3), Object.fromEntries(Object.entries(y2).filter(([t4]) => e7.has(t4))));
        const r2 = Object.fromEntries(Object.entries(b2 || {}).filter(([t4]) => e7.has(t4)));
        b2 = ls(ls({}, i3), r2), e7.forEach((e8) => {
          e8 in r2 || null == b2 || delete b2[e8];
        }), S2 = ls(ls({}, s3), Object.fromEntries(Object.entries(S2 || {}).filter(([t4]) => e7.has(t4))));
      } else y2 = ls(ls({}, t3), y2), b2 = ls(ls({}, i3), b2), S2 = ls(ls({}, s3), S2);
      return ls(ls({ [r]: Object.keys(Id(y2)), [u]: y2 || {}, [g]: b2 || {}, [n]: S2 || {}, [c]: true === e6.minimalFlagCalledEvents }, f2 ? { [l]: f2 } : {}), m2 ? { [a]: m2 } : {});
    })(e5, this.getFlagVariants(), this.getFlagPayloads(), this.getFlagsWithDetails(), i2, this._logger);
    if (s2) if (false === (null == i2 ? void 0 : i2.persist)) {
      const e6 = !ft(this._client.kv.get(u));
      this._bootstrapState = s2, e6 || this._set(s2);
    } else this._clearBootstrapState(), this._markCrossTabFeatureFlagSnapshot(s2, e5, !!(null == i2 ? void 0 : i2.partialResponse)), this._set(s2);
    else t2 && this._fallBackToPersistedFlags();
    t2 || (this._staleCacheRefreshTriggered = false), this._fireFeatureFlagsCallbacks(t2);
  }
  override(e5, t2 = false) {
    this._logger.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: e5, suppressWarning: t2 });
  }
  overrideFeatureFlags(e5) {
    this._overrideFeatureFlags(e5);
  }
  _overrideFeatureFlags(e5) {
    if (this._client) {
      if (false === e5) return this._remove([v, f]), this._fireFeatureFlagsCallbacks(), void wd.info("All overrides cleared");
      if (_t(e5)) return this._set({ [v]: Pd(e5) }), this._fireFeatureFlagsCallbacks(), void wd.info("Flag overrides set", { flags: e5 });
      if (e5 && "object" == typeof e5 && ("flags" in e5 || "payloads" in e5)) {
        var t2;
        const i2 = e5;
        this._override_warning = Boolean(null !== (t2 = i2.suppressWarning) && void 0 !== t2 && t2);
        const s2 = {}, r2 = i2.flags, n2 = i2.payloads;
        return r2 && (s2[v] = _t(r2) ? Pd(r2) : r2), n2 && (s2[f] = n2), Object.keys(s2).length && this._set(s2), false === r2 && false === n2 ? this._remove([v, f]) : false === r2 ? this._remove(v) : false === n2 && this._remove(f), this._fireFeatureFlagsCallbacks(), false === r2 ? wd.info("Flag overrides cleared") : r2 && wd.info("Flag overrides set", { flags: r2 }), void (false === n2 ? wd.info("Payload overrides cleared") : n2 && wd.info("Payload overrides set", { payloads: n2 }));
      }
      if (e5 && "object" == typeof e5) return this._set({ [v]: e5 }), this._fireFeatureFlagsCallbacks(), void wd.info("Flag overrides set", { flags: e5 });
      this._logger.warn("Invalid overrideOptions provided to overrideFeatureFlags", { overrideOptions: e5 });
    } else this._logger.warn("posthog.featureFlags.overrideFeatureFlags called before feature flags were ready");
  }
  onFeatureFlags(e5) {
    if (this.addFeatureFlagsHandler(e5), this._hasLoadedFlags) {
      const { flags: t2, flagVariants: i2 } = this._prepareFeatureFlagsForCallbacks();
      try {
        e5(t2, i2);
      } catch (e6) {
        this._logger.error("Error while running feature flags callback", e6);
      }
    }
    return () => this.removeFeatureFlagsHandler(e5);
  }
  updateEarlyAccessFeatureEnrollment(e5, t2, i2) {
    var s2;
    const n2 = (this._prop("$early_access_features") || []).find((t3) => t3.flagKey === e5), o2 = { [`$feature_enrollment/${e5}`]: t2 }, a2 = { $feature_flag: e5, $feature_enrollment: t2, $set: o2 };
    n2 && (a2.$early_access_feature_name = n2.name), i2 && (a2.$feature_enrollment_stage = i2);
    const l2 = ls(ls({}, this.getFlagVariants()), {}, { [e5]: t2 });
    null === (s2 = this._crossTabPersistence) || void 0 === s2 || s2.markCrossTabFeatureFlagChanges({ $active_feature_flags: [e5], $enabled_feature_flags: [e5], $stored_person_properties: Object.keys(o2) }), this._set({ [r]: Object.keys(Id(l2)), [u]: l2, [h]: ls(ls({}, this._prop("$stored_person_properties") || {}), o2) }), this._fireFeatureFlagsCallbacks();
    try {
      var c2;
      null === (c2 = this._client) || void 0 === c2 || c2.capture("$feature_enrollment_update", a2);
    } catch (e6) {
      this._logger.error("Failed to capture early access feature enrollment", e6);
    }
  }
  getEarlyAccessFeatures(e5, t2 = false, i2) {
    const r2 = this._prop(s);
    !r2 || t2 ? this._getEarlyAccessFeatures(e5, i2) : e5(r2);
  }
  _getEarlyAccessFeatures(e5, t2) {
    var i2 = this;
    return Lt(function* () {
      const r2 = i2._client;
      if (!r2) return;
      const n2 = t2 ? `&${t2.map((e6) => `stage=${e6}`).join("&")}` : "";
      let o2;
      try {
        const e6 = yield r2.sendRequest(`/api/early_access_features/?token=${r2.projectToken}${n2}`, { target: "api", method: "GET", sentAt: "query" });
        if (!e6.json) return;
        o2 = e6.json.earlyAccessFeatures, i2._set({ [s]: o2 });
      } catch (e6) {
        return void i2._logger.error("Early access feature request failed", e6);
      }
      try {
        e5(o2);
      } catch (e6) {
        i2._logger.error("Early access feature callback failed", e6);
      }
    })();
  }
  _prepareFeatureFlagsForCallbacks() {
    const e5 = this.getFlags(), t2 = this.getFlagVariants();
    return { flags: e5.filter((e6) => t2[e6]), flagVariants: Object.keys(t2).filter((e6) => t2[e6]).reduce((e6, i2) => (e6[i2] = t2[i2], e6), {}) };
  }
  _fireFeatureFlagsCallbacks(e5) {
    this._rebuildEventProperties();
    const { flags: t2, flagVariants: i2 } = this._prepareFeatureFlagsForCallbacks(), s2 = this._firingFeatureFlagsCallbacks;
    this._firingFeatureFlagsCallbacks = true, this.featureFlagEventHandlers.forEach((s3) => {
      try {
        s3(t2, i2, { errorsLoading: e5 });
      } catch (e6) {
        this._logger.error("Error while running feature flags callback", e6);
      }
    }), this._firingFeatureFlagsCallbacks = s2;
  }
  setPersonPropertiesForFlags(e5, t2 = true) {
    this._setPersonPropertiesForFlags(e5, t2);
  }
  _setPersonPropertiesForFlags(e5, t2 = true) {
    const i2 = this._prop("$stored_person_properties") || {}, s2 = (null == e5 ? void 0 : e5.$set) || ((null == e5 ? void 0 : e5.$set_once) ? {} : e5), r2 = null == e5 ? void 0 : e5.$set_once, n2 = {};
    if (r2) for (const e6 in r2) ({}).hasOwnProperty.call(r2, e6) && (e6 in i2 || (n2[e6] = r2[e6]));
    this._set({ [h]: ls(ls(ls({}, i2), n2), s2) }), t2 && this.reloadFeatureFlags();
  }
  unsetPersonPropertiesForFlags(e5, t2 = true) {
    const i2 = ls({}, this._prop("$stored_person_properties") || {});
    e5.forEach((e6) => {
      delete i2[e6];
    }), this._set({ [h]: i2 }), t2 && this.reloadFeatureFlags();
  }
  resetPersonPropertiesForFlags(e5 = true) {
    this._remove(h), e5 && this.reloadFeatureFlags();
  }
  setGroupPropertiesForFlags(e5, t2 = true) {
    const i2 = this._prop("$stored_group_properties") || {}, s2 = ls({}, i2);
    for (const t3 of Object.keys(e5)) s2[t3] = ls(ls({}, i2[t3]), e5[t3]);
    this._set({ [d]: s2 }), t2 && this.reloadFeatureFlags();
  }
  resetGroupPropertiesForFlags(e5) {
    if (e5) {
      const t2 = this._prop("$stored_group_properties") || {};
      this._set({ [d]: ls(ls({}, t2), {}, { [e5]: {} }) });
    } else this._remove(d);
  }
  reset() {
    this._requestGeneration++, this._settleReloads(this._pendingReloads, "cancelled"), this._settleReloads(this._activeReloads, "cancelled"), this._additionalReloadRequested = false, this._baseEventProperties = {}, this._eventPropertiesWithFlagValues = {}, this._bootstrapState = void 0, this._hasLoadedFlags = false, this._reloadingDisabled = false, this._flagsLoadedFromRemote = false, this.$anon_distinct_id = void 0, this._clearDebouncer(), this._override_warning = false, this._consecutiveStatusZeroFailures = 0;
  }
};
var Td = Fn("[FeatureFlags]");
var Rd = class {
  constructor(e5, t2 = false) {
    this._loggedEvaluationEnvironmentsDeprecation = false, this.update(e5, t2);
  }
  update(e5, t2) {
    this._snapshot = ((e6, t3) => {
      var i2, s2, r2, n2, o2, a2, l2, c2;
      return { bootstrap: { featureFlags: null !== (i2 = null === (s2 = e6.bootstrap) || void 0 === s2 ? void 0 : s2.featureFlags) && void 0 !== i2 ? i2 : void 0, featureFlagPayloads: null !== (r2 = null === (n2 = e6.bootstrap) || void 0 === n2 ? void 0 : n2.featureFlagPayloads) && void 0 !== r2 ? r2 : void 0 }, remoteRequestsDisabled: t3, featureFlagsDisabled: !!e6.advanced_disable_feature_flags, onlyEvaluateSurveyFeatureFlags: !!e6.advanced_only_evaluate_survey_feature_flags, deduplicateCallsPerSession: !!e6.advanced_feature_flags_dedup_per_session, cacheTtlMs: e6.feature_flag_cache_ttl_ms, refreshIntervalMs: null !== (o2 = e6.remote_config_refresh_interval_ms) && void 0 !== o2 ? o2 : 3e5, idleRefreshBackoff: ft(e6.remote_config_refresh_interval_ms), requestTimeoutMs: e6.feature_flag_request_timeout_ms, requestMaxRetries: Math.max(0, null !== (a2 = e6.feature_flag_request_max_retries) && void 0 !== a2 ? a2 : 1), compression: e6.disable_compression ? void 0 : "best-available", evaluationContexts: null !== (l2 = null !== (c2 = e6.evaluation_contexts) && void 0 !== c2 ? c2 : e6.evaluation_environments) && void 0 !== l2 ? l2 : [], flagKeys: _t(e6.flag_keys) ? e6.flag_keys : void 0 };
    })(e5, t2), !e5.evaluation_environments || e5.evaluation_contexts || this._loggedEvaluationEnvironmentsDeprecation || (Td.warn("evaluation_environments is deprecated. Use evaluation_contexts instead. evaluation_environments will be removed in a future version."), this._loggedEvaluationEnvironmentsDeprecation = true), ft(e5.flag_keys) || _t(e5.flag_keys) || Td.error("Invalid flag_keys found:", e5.flag_keys, "Expected array of non-empty strings");
  }
  get() {
    return this._snapshot;
  }
};
var $d = (e5) => Ft(e5) && ("RangeError" === e5.name && 0 === e5.message.indexOf("Maximum call stack size exceeded") || "InternalError" === e5.name && "too much recursion" === e5.message);
var Ad = Fn("[Error tracking]");
var Md = "webkit-masked-url:";
var Od = [{ value: "isolatedAPI.contexts.topHostname", exact: false }, { value: "No response from target", exact: true }];
var Ld = ["chrome-extension://", "moz-extension://", "safari-extension:", "safari-web-extension:", Md];
var Dd = ["__firefox__", "__gCrWeb"];
var Nd = "Refusing to render web experiment since the viewer is a likely bot";
var Bd = { icontains: (e5, t2) => t2.toLowerCase().indexOf(e5.toLowerCase()) > -1, not_icontains: (e5, t2) => -1 === t2.toLowerCase().indexOf(e5.toLowerCase()), regex: (e5, t2) => Uc(t2, e5), not_regex: (e5, t2) => !Uc(t2, e5), exact: (e5, t2) => t2 === e5, is_not: (e5, t2) => t2 !== e5 };
var Ud = Fn("[Conversations]");
var qd = "Conversations not available yet.";
function Hd(e5, t2) {
  var i2, s2, r2, n2, o2, a2, l2;
  const c2 = null !== (i2 = null == e5 ? void 0 : e5.flushIntervalMs) && void 0 !== i2 ? i2 : 3e3, u2 = null !== (s2 = null == e5 ? void 0 : e5.maxBufferSize) && void 0 !== s2 ? s2 : 100, d2 = (null == t2 ? void 0 : t2.consoleCapture) ? void 0 : null !== (r2 = null == e5 ? void 0 : e5.maxLogsPerInterval) && void 0 !== r2 ? r2 : 1e3, h2 = ft(d2) ? Math.max(u2, 2048) : Math.max(u2, d2), _2 = ls(ls({}, (function() {
    let e6 = "", t3 = "";
    try {
      var i3;
      const s3 = "u" > typeof globalThis ? globalThis : "u" > typeof window ? window : void 0, r3 = null == s3 || null === (i3 = s3.navigator) || void 0 === i3 ? void 0 : i3.userAgent;
      r3 && ([e6, t3] = Ui(r3));
    } catch (e7) {
    }
    return (function(e7, t4) {
      const i4 = (function(e8) {
        if (e8) return {}.hasOwnProperty.call(an, e8) ? an[e8] : e8;
      })(e7);
      return ls(ls({}, i4 ? { "os.name": i4 } : {}), t4 ? { "os.version": t4 } : {});
    })(e6, t3);
  })()), null == e5 ? void 0 : e5.resourceAttributes);
  return { serviceName: null !== (n2 = null !== (o2 = null == _2 ? void 0 : _2["service.name"]) && void 0 !== o2 ? o2 : null == e5 ? void 0 : e5.serviceName) && void 0 !== n2 ? n2 : null == t2 ? void 0 : t2.serviceNameDefault, serviceVersion: null !== (a2 = null == _2 ? void 0 : _2["service.version"]) && void 0 !== a2 ? a2 : null == e5 ? void 0 : e5.serviceVersion, environment: null !== (l2 = null == _2 ? void 0 : _2["deployment.environment"]) && void 0 !== l2 ? l2 : null == e5 ? void 0 : e5.environment, resourceAttributes: _2, beforeSend: null == e5 ? void 0 : e5.beforeSend, flushIntervalMs: c2, maxBufferSize: u2, maxQueueSize: h2, maxBatchRecordsPerPost: 100, rateCapWindowMs: c2, maxLogsPerInterval: d2, backgroundFlushBudgetMs: 0, terminationFlushBudgetMs: 0 };
}
var zd = ["debug", "log", "warn", "error", "info"];
var jd = (e5) => {
  for (; null == e5 ? void 0 : e5.__rrweb_original__; ) e5 = e5.__rrweb_original__;
  return e5;
};
var Wd = "console";
var Vd = "__posthogHandledLogsRequestError";
var Gd = (e5, t2) => {
  const i2 = e5 instanceof Error ? e5 : new Error(t2);
  return i2[Vd] = true, i2;
};
var Kd = (e5) => !!e5 && "object" == typeof e5 && true === e5[Vd];
var Qd = class {
  get _coreLogger() {
    return ls(ls({}, this._logger), {}, { error: (...e5) => {
      e5.some(Kd) || this._logger.error(...e5);
    } });
  }
  constructor(e5, t2) {
    var i2;
    this._configSource = e5, this._getSdkContext = t2, this.name = "logs", this._isLogsEnabled = false, this._isLoaded = false, this._isLoading = false, this._logger = Fn("[logs]"), this._queue = [], this._consoleQueue = [], this._consecutiveStatusZeroFailures = 0, this._setupStarted = false, this._disposed = false, this._consoleBuffer = [], this._consoleRecorderUnpatchers = [], this._isRecordingConsole = false, this._isRecordingConsoleEntry = false, this._listeningForReconnect = false, this._onReconnect = () => {
      var e6, t3;
      this._disposed || (this._consecutiveStatusZeroFailures = 0, null === (e6 = this._core) || void 0 === e6 || e6.onReconnect(), null === (t3 = this._consoleCore) || void 0 === t3 || t3.onReconnect());
    }, this._isLogsEnabled = !!(null === (i2 = e5.get()) || void 0 === i2 ? void 0 : i2.captureConsoleLogs);
  }
  get _isRequestReady() {
    return true;
  }
  _getConsoleLoader() {
  }
  _listenForReconnect() {
    if (!this._listeningForReconnect) {
      try {
        this._window = typeof window > "u" ? void 0 : window;
      } catch (e5) {
        this._window = void 0;
      }
      this._window && (Bn(this._window, "online", this._onReconnect), this._listeningForReconnect = true);
    }
  }
  _buildCore(e5, t2, i2, s2) {
    this._listenForReconnect();
    const r2 = Hd(this._configSource.get(), i2);
    return [new fn(this._createHost(e5, t2), r2, this._coreLogger, () => this._getSdkContext(), (e6) => e6(), void 0, s2), r2];
  }
  _getCore() {
    const e5 = this._configSource.get();
    var t2;
    return this._core && this._resolvedFrom === e5 || (null === (t2 = this._core) || void 0 === t2 || t2.reset(), this._resolvedFrom = e5, [this._core, this._resolvedConfig] = this._buildCore(() => this._queue, (e6) => {
      this._queue = e6;
    })), this._core;
  }
  _getConsoleCore() {
    const e5 = this._configSource.get();
    var t2;
    return this._consoleCore && this._consoleResolvedFrom === e5 || (null === (t2 = this._consoleCore) || void 0 === t2 || t2.reset(), this._consoleResolvedFrom = e5, [this._consoleCore, this._consoleResolvedConfig] = this._buildCore(() => this._consoleQueue, (e6) => {
      this._consoleQueue = e6;
    }, { serviceNameDefault: "posthog-browser-logs", consoleCapture: true }, Wd)), this._consoleCore;
  }
  setup(e5) {
    if (!this._disposed && !this._setupStarted) return this._setupStarted = true, this._client = e5, this._logger = e5.logger.createLogger("[logs]"), _d(e5.kv.initialize(), () => {
      this._disposed || this._finishSetup(e5);
    });
  }
  _finishSetup(e5) {
    var t2;
    this._listenForReconnect(), (null === (t2 = this._configSource.get()) || void 0 === t2 ? void 0 : t2.captureConsoleLogs) && (this._isLogsEnabled = true), (this._isLogsEnabled || this._configSource.remoteConfigWillArrive && e5.kv.get(this._configSource.captureHintKey)) && this._startConsoleRecorder();
    let i2 = false;
    const s2 = e5.onRemoteConfig((e6) => {
      var t3;
      i2 = e6.ok && true === (null === (t3 = e6.config.logs) || void 0 === t3 ? void 0 : t3.captureConsoleLogs), this.onRemoteConfig(e6);
    });
    this._disposed ? s2.dispose() : (this._remoteConfigSubscription = s2, i2 || this.loadIfEnabled());
  }
  dispose() {
    var e5, t2, i2, s2, r2, n2, o2;
    this._disposed || (this._disposed = true, this._stopConsoleRecorder(), null === (e5 = this._remoteConfigSubscription) || void 0 === e5 || e5.dispose(), this._remoteConfigSubscription = void 0, this._client = void 0, this._isLoading = false, null === (t2 = this._window) || void 0 === t2 || t2.removeEventListener("online", this._onReconnect), null === (i2 = this._consoleLogsDispose) || void 0 === i2 || i2.call(this), this._consoleLogsDispose = void 0, null === (s2 = this._core) || void 0 === s2 || s2.clearQueue(), null === (r2 = this._consoleCore) || void 0 === r2 || r2.clearQueue(), null === (n2 = this._core) || void 0 === n2 || n2.reset(), null === (o2 = this._consoleCore) || void 0 === o2 || o2.reset());
  }
  onRemoteConfig(e5) {
    var t2, i2;
    if (this._disposed) return;
    const s2 = e5.ok ? null === (t2 = e5.config.logs) || void 0 === t2 ? void 0 : t2.captureConsoleLogs : void 0;
    St(s2) ? this._stopRecorderStartedByPersistedHint() : (null === (i2 = this._client) || void 0 === i2 || i2.kv.set(this._configSource.captureHintKey, !!s2), s2 ? (this._isLogsEnabled = true, this._isLoaded || this._startConsoleRecorder(), this.loadIfEnabled()) : this._stopRecorderStartedByPersistedHint());
  }
  reset() {
    var e5, t2, i2, s2;
    this._stopConsoleRecorder(), null === (e5 = this._core) || void 0 === e5 || e5.clearQueue(), this._queue = [], null === (t2 = this._core) || void 0 === t2 || t2.reset(), null === (i2 = this._consoleCore) || void 0 === i2 || i2.clearQueue(), this._consoleQueue = [], null === (s2 = this._consoleCore) || void 0 === s2 || s2.reset(), this._consecutiveStatusZeroFailures = 0;
  }
  captureLog(e5) {
    !this._disposed && this._client && this._getCore().captureLog(e5);
  }
  captureConsoleLog(e5) {
    !this._disposed && this._client && this._getConsoleCore().captureLog(e5);
  }
  captureBufferedConsoleLog(e5, t2, i2) {
    !this._disposed && this._client && this._getConsoleCore().captureLog(e5, { context: t2, occurredAtMs: i2 });
  }
  _onOptOut() {
    var e5;
    this._stopConsoleRecorder(), null === (e5 = this._consoleCore) || void 0 === e5 || e5.clearQueue(), this._consoleQueue = [];
  }
  _stopRecorderStartedByPersistedHint() {
    this._isLogsEnabled || this._stopConsoleRecorder();
  }
  _startConsoleRecorder() {
    var e5;
    if (this._isRecordingConsole || !(null === (e5 = this._window) || void 0 === e5 ? void 0 : e5.console)) return;
    const t2 = Hd(this._configSource.get()).maxBufferSize;
    let i2 = true;
    this._consoleRecorderUnpatchers.push(() => {
      i2 = false;
    });
    for (const e6 of zd) {
      let s2;
      try {
        s2 = jd(this._window.console[e6]);
      } catch (e7) {
        continue;
      }
      s2 && this._consoleRecorderUnpatchers.push(Wu(this._window.console, e6, (r2) => {
        const n2 = (...s3) => {
          try {
            i2 && this._recordConsoleEntry(e6, s3, t2);
          } catch (e7) {
          }
          return r2.apply(this._window.console, s3);
        };
        return n2.__rrweb_original__ = s2, n2;
      }));
    }
    this._isRecordingConsole = true, this._consoleRecorderTimeout = setTimeout(() => {
      this._stopConsoleRecorder();
    }, 3e4);
  }
  _recordConsoleEntry(e5, t2, i2) {
    var s2;
    if (this._isRecordingConsole && !this._isRecordingConsoleEntry && 0 !== t2.length) if (null === (s2 = this._client) || void 0 === s2 ? void 0 : s2.canCapture) {
      if (i2 > this._consoleBuffer.length) {
        this._isRecordingConsoleEntry = true;
        try {
          this._consoleBuffer.push({ level: e5, args: t2, occurredAtMs: Date.now(), context: this._getSdkContext() });
        } finally {
          this._isRecordingConsoleEntry = false;
        }
      }
    } else this._stopConsoleRecorder();
  }
  _stopConsoleRecorder() {
    if (this._consoleBuffer = [], this._isRecordingConsole) {
      this._isRecordingConsole = false, this._consoleRecorderTimeout && (clearTimeout(this._consoleRecorderTimeout), this._consoleRecorderTimeout = void 0);
      for (const e5 of this._consoleRecorderUnpatchers) e5();
      this._consoleRecorderUnpatchers = [];
    }
  }
  _takeConsoleBuffer() {
    const e5 = this._consoleBuffer;
    return this._stopConsoleRecorder(), e5;
  }
  get logger() {
    return this._capture_logger || (this._capture_logger = { trace: (e5, t2) => this.captureLog({ body: e5, level: "trace", attributes: t2 }), debug: (e5, t2) => this.captureLog({ body: e5, level: "debug", attributes: t2 }), info: (e5, t2) => this.captureLog({ body: e5, level: "info", attributes: t2 }), warn: (e5, t2) => this.captureLog({ body: e5, level: "warn", attributes: t2 }), error: (e5, t2) => this.captureLog({ body: e5, level: "error", attributes: t2 }), fatal: (e5, t2) => this.captureLog({ body: e5, level: "fatal", attributes: t2 }) }), this._capture_logger;
  }
  flushLogs(e5) {
    this._client && (e5 ? this._flushViaTransport(e5) : (this._core && this._core.flush().catch((e6) => this._logFlushError(e6)), this._consoleCore && this._consoleCore.flush().catch((e6) => this._logFlushError(e6))));
  }
  flush() {
    var e5 = this;
    return Lt(function* () {
      var t2, i2;
      const s2 = null === (t2 = e5._core) || void 0 === t2 ? void 0 : t2.flush().catch((t3) => e5._logFlushError(t3)), r2 = null === (i2 = e5._consoleCore) || void 0 === i2 ? void 0 : i2.flush().catch((t3) => e5._logFlushError(t3));
      yield s2, yield r2;
    })();
  }
  _logFlushError(e5) {
    Kd(e5) || this._logger.error("PostHog logs flush failed:", e5);
  }
  loadIfEnabled() {
    if (this._disposed || !this._isLogsEnabled || this._isLoaded || this._isLoading) return;
    const e5 = this._getConsoleLoader();
    if (e5) {
      this._isLoading = true;
      try {
        e5((e6, t2) => {
          if (this._isLoading = false, !this._disposed && this._isLogsEnabled) if (e6 || !t2) this._logger.error("Could not load logs script", e6), this._stopConsoleRecorder();
          else {
            const e7 = this._takeConsoleBuffer();
            this._consoleLogsDispose = t2.initialize(this._client), this._isLoaded = true, e7.length > 0 && t2.replay(this._client, e7);
          }
        });
      } catch (e6) {
        throw this._isLoading = false, e6;
      }
    } else this._stopConsoleRecorder();
  }
  _createHost(e5, t2) {
    const i2 = this._client;
    return { get isDisabled() {
      return false;
    }, get optedOut() {
      return !i2.canCapture;
    }, getPersistedProperty: (t3) => t3 === it.LogsQueue ? e5() : void 0, setPersistedProperty(e6, i3) {
      e6 === it.LogsQueue && t2(null != i3 ? i3 : []);
    }, _sendLogsBatch: (e6) => this._sendLogsBatch(e6), getLibraryId: () => i2.library.name, getLibraryVersion: () => i2.library.version };
  }
  _sendLogsBatch(e5) {
    return new Promise((t2) => {
      if (ka(this._consecutiveStatusZeroFailures, 3)) return void t2({ kind: "fatal", error: Gd(void 0, "logs endpoint is unreachable, dropping batch") });
      let i2 = false;
      const s2 = (e6) => {
        i2 || (i2 = true, clearTimeout(r2), t2(e6));
      }, r2 = setTimeout(() => {
        this._logger.warn("Logs request timed out before receiving a response"), s2({ kind: "retry-later", error: Gd(void 0, "logs request timed out") });
      }, 9e4), n2 = this._isRequestReady;
      this._client.sendRequest("/i/v1/logs", { method: "POST", query: { token: this._client.projectToken }, body: e5, compression: "best-available", timeoutMs: 6e4 }).then((e6) => {
        var t3;
        const i3 = e6.statusCode;
        this._trackEndpointReachability(i3, n2), i3 >= 200 && 300 > i3 ? s2({ kind: "ok" }) : 413 === i3 ? s2({ kind: "too-large" }) : 0 !== i3 && 408 !== i3 && 429 !== i3 && 500 > i3 ? s2({ kind: "fatal", error: new Error(`logs request failed with status ${i3}`) }) : 0 === i3 ? (e6.error || this._logger.warn("Logs request failed before receiving an HTTP response"), s2({ kind: "retry-later", error: Gd(e6.error, "logs request failed before receiving an HTTP response") })) : s2({ kind: "retry-later", error: null !== (t3 = e6.error) && void 0 !== t3 ? t3 : new Error(`logs request failed with status ${i3}`) });
      }, (e6) => {
        s2({ kind: "retry-later", error: e6 });
      });
    });
  }
  _trackEndpointReachability(e5, t2) {
    (0 !== e5 || t2) && (this._consecutiveStatusZeroFailures = xa(e5, this._consecutiveStatusZeroFailures, 3, () => this._logger.warn("Log requests are failing before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped sending logs; will try again when connectivity changes.")));
  }
  _flushViaTransport(e5) {
    this._queue.length > 0 && this._drainQueueViaTransport(e5, this._queue, this._resolvedConfig, this._client.library.name, (e6) => {
      this._queue = e6;
    }), this._consoleQueue.length > 0 && this._drainQueueViaTransport(e5, this._consoleQueue, this._consoleResolvedConfig, Wd, (e6) => {
      this._consoleQueue = e6;
    });
  }
  _drainQueueViaTransport(e5, t2, i2, s2, r2) {
    if (0 === t2.length) return;
    const n2 = t2.map((e6) => e6.record);
    r2([]);
    const o2 = _n(n2, hn(i2, this._client.library.name, this._client.library.version), s2, this._client.library.version);
    this._client.sendRequest("/i/v1/logs", { method: "POST", query: { token: this._client.projectToken }, body: o2, compression: "best-available", transport: e5, timeoutMs: 6e4 }).catch((e6) => this._logFlushError(e6));
  }
};
var Jd = Fn("[NetworkMetrics]");
var Yd = () => {
  var e5;
  return (null == je || null === (e5 = je.performance) || void 0 === e5 ? void 0 : e5.now) ? je.performance.now() : Date.now();
};
var Zd = { "http:": 80, "https:": 443 };
var Xd = /* @__PURE__ */ new Set(["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"]);
var eh = (e5, t2) => {
  var i2;
  const s2 = String(t2);
  return { method: String(e5).toUpperCase(), url: (null === (i2 = Ea(s2)) || void 0 === i2 ? void 0 : i2.href) || s2 };
};
var th = (e5, t2, i2, s2, r2, n2, o2 = false) => {
  try {
    var a2, l2;
    const c2 = r2();
    if (!c2) return;
    const u2 = i2 || void 0, d2 = Yd() - s2, h2 = Ea(t2.url);
    if (h2 && "http:" !== h2.protocol && "https:" !== h2.protocol) return;
    const _2 = { url: (null == h2 ? void 0 : h2.href) || t2.url, method: t2.method }, p2 = pt(c2.name) ? c2.name(_2) : mt(c2.name) ? c2.name : "http.client.request.duration";
    if (!p2) return;
    const g2 = o2 && !u2 ? void 0 : ((e6, t3) => e6 ? 400 > e6 ? void 0 : String(e6) : (null == t3 ? void 0 : t3.name) || "_OTHER")(u2, n2), v2 = ls(ls(ls(ls(ls({}, ((e6) => {
      const t3 = Xd.has(e6) ? e6 : "_OTHER";
      return ls({ "http.request.method": t3 }, "_OTHER" === t3 && e6 !== t3 ? { "http.request.method_original": e6 } : {});
    })(_2.method)), h2 ? ((e6) => {
      return { "server.address": e6.hostname.startsWith("[") && e6.hostname.endsWith("]") ? e6.hostname.slice(1, -1) : e6.hostname, "server.port": Number(e6.port) || Zd[e6.protocol], "url.scheme": e6.protocol.slice(0, -1), "url.template": (t3 = e6.pathname, t3.split("/").map((e7) => ((e8) => /^\d+$/.test(e8) || e8.length >= 8 && /^[0-9a-f-]*\d[0-9a-f-]*$/i.test(e8))(e7) ? ":id" : e7).join("/")) };
      var t3;
    })(h2) : {}), u2 ? { "http.response.status_code": u2 } : {}), g2 ? { "error.type": g2 } : {}), null === (a2 = c2.attributes) || void 0 === a2 ? void 0 : a2.call(c2, _2, { status: u2, durationMs: d2 }));
    null === (l2 = e5.metrics) || void 0 === l2 || l2.histogram(p2, d2, { unit: "ms", attributes: v2 });
  } catch (e6) {
    Jd.error("Failed to record network metric", e6);
  }
};
var ih = () => {
};
var sh = (e5, t2) => pt(null == je ? void 0 : je.fetch) ? Wu(je, "fetch", (i2) => function(...s2) {
  const r2 = Yd(), n2 = i2.apply(this, s2);
  if (!t2()) return n2;
  try {
    var o2, a2, l2;
    const [i3, c2] = s2, u2 = eh(null !== (o2 = null !== (a2 = null == c2 ? void 0 : c2.method) && void 0 !== a2 ? a2 : null == i3 ? void 0 : i3.method) && void 0 !== o2 ? o2 : "GET", null !== (l2 = null == i3 ? void 0 : i3.url) && void 0 !== l2 ? l2 : i3);
    return n2.then((i4) => (th(e5, u2, null == i4 ? void 0 : i4.status, r2, t2, void 0, true), i4), (i4) => {
      throw th(e5, u2, void 0, r2, t2, i4), i4;
    });
  } catch (e6) {
    return Jd.error("Failed to observe fetch", e6), n2;
  }
}) : ih;
var rh = (e5, t2) => {
  var i2;
  const s2 = null == je || null === (i2 = je.XMLHttpRequest) || void 0 === i2 ? void 0 : i2.prototype;
  if (!s2) return ih;
  const r2 = /* @__PURE__ */ new WeakMap(), n2 = Wu(s2, "open", (e6) => function(...t3) {
    try {
      (() => nc.has(this))() || r2.set(this, eh(t3[0], t3[1]));
    } catch (e7) {
      Jd.error("Failed to observe XHR open", e7);
    }
    return e6.apply(this, t3);
  }), o2 = Wu(s2, "send", (i3) => function(...s3) {
    let n3;
    try {
      const i4 = r2.get(this);
      if (i4 && t2()) {
        const s4 = Yd();
        n3 = () => {
          this.removeEventListener("loadend", n3), th(e5, i4, this.status, s4, t2);
        }, Bn(this, "loadend", n3);
      }
    } catch (e6) {
      Jd.error("Failed to observe XHR send", e6);
    }
    try {
      return i3.apply(this, s3);
    } catch (e6) {
      throw n3 && this.removeEventListener("loadend", n3), e6;
    }
  });
  return () => {
    n2(), o2();
  };
};
var nh = /* @__PURE__ */ new WeakMap();
var oh = /* @__PURE__ */ new Set(["$comment", "$defs", "$id", "$schema", "additionalProperties", "default", "definitions", "deprecated", "description", "examples", "minProperties", "properties", "readOnly", "required", "title", "type", "writeOnly"]);
var ah = { maxStringLength: 2048, truncationSuffix: "..." };
var lh = { maxStringLength: 2048, truncationSuffix: "..." };
function ch(e5) {
  if (e5) return true === e5 ? { intent: true, model: true } : { intent: false !== e5.intent, model: false !== e5.model };
}
function uh(e5, t2) {
  return {}.hasOwnProperty.call(e5, t2);
}
function dh(e5, t2) {
  const i2 = Object.create(e5);
  return t2 && Object.defineProperty(i2, "inputSchema", { configurable: true, enumerable: true, writable: true, value: t2 }), i2;
}
function hh(e5, t2, i2 = false) {
  if (!mt(e5)) return;
  const s2 = e5.trim();
  return s2 ? (i2 ? Qr(s2, ah) : s2).slice(0, t2) : void 0;
}
function _h(e5) {
  try {
    return gt(e5) && true === e5.isError;
  } catch (e6) {
    return false;
  }
}
function ph(e5) {
  return Qr(e5 || "Unknown error", lh).slice(0, 2048);
}
function gh(e5, t2) {
  try {
    return ph(t2 ? (function(e6) {
      try {
        if (!gt(e6) || !_t(e6.content)) return;
        return e6.content.filter((e7) => gt(e7) && "text" === e7.type && mt(e7.text)).map((e7) => e7.text).join(" ").trim() || void 0;
      } catch (e7) {
        return;
      }
    })(e5) : gt(e5) && mt(e5.message) ? e5.message : mt(e5) ? e5 : String(e5));
  } catch (e6) {
    return "Unknown error";
  }
}
function vh(e5, t2, i2) {
  return t2.errorResult ? [{ type: "Error", value: i2, mechanism: { type: "generic", handled: true, synthetic: true, exception_id: 0 } }] : e5.buildProperties(t2.error, { handled: true }).$exception_list.map((e6) => ls(ls({}, e6), {}, { value: ph(e6.value) }));
}
function fh(e5, t2) {
  if (t2) return "Error";
  try {
    if (!gt(e5)) return "Error";
    let t3 = mt(e5.name) ? e5.name.trim() : "";
    const i2 = e5.constructor;
    return t3 && "Error" !== t3 || !pt(i2) || "Error" === i2.name || (t3 = i2.name), (t3 || "Error").slice(0, 256);
  } catch (e6) {
    return "Error";
  }
}
function mh(e5, t2) {
  return { message: gh(e5, t2), type: fh(e5, t2) };
}
var yh = { featureFlags: class extends Fd {
  constructor(e5) {
    const t2 = new Rd(e5.config, e5._shouldDisableFlags());
    super(t2), this.name = pu, this._instance = e5, this._mutableConfigSource = t2;
  }
  get _crossTabPersistence() {
    return this._instance.persistence;
  }
  updateConfig(e5, t2) {
    this._mutableConfigSource.update(e5, t2), this._onConfigUpdated();
  }
} };
var bh = { sessionRecording: class {
  get _config() {
    return this._instance.config;
  }
  get _persistence() {
    return this._instance.persistence;
  }
  get started() {
    var e5;
    return !!(null === (e5 = this._lazyLoadedSessionRecording) || void 0 === e5 ? void 0 : e5.isStarted);
  }
  get status() {
    var e5, t2;
    return "awaiting_config" === this._recordingStatus || "missing_config" === this._recordingStatus ? this._recordingStatus : null !== (e5 = null === (t2 = this._lazyLoadedSessionRecording) || void 0 === t2 ? void 0 : t2.status) && void 0 !== e5 ? e5 : this._recordingStatus;
  }
  constructor(e5) {
    if (this._instance = e5, this._forceAllowLocalhostNetworkCapture = false, this._recordingStatus = Zu, this._persistFlagsOnSessionListener = void 0, this._sessionRecordingDisposed = false, this._documentWasEverVisible = (() => {
      var e6, t2;
      if (!(null == Ge ? void 0 : Ge.visibilityState) || "visible" === Ge.visibilityState) return true;
      const i2 = null == je || null === (e6 = je.performance) || void 0 === e6 || null === (t2 = e6.getEntriesByType) || void 0 === t2 ? void 0 : t2.call(e6, "visibility-state");
      return !(null == i2 ? void 0 : i2.length) || i2.some((e7) => "visible" === e7.name);
    })(), this._onVisibilityChange = () => {
      var e6, t2;
      "visible" === (null == Ge ? void 0 : Ge.visibilityState) && (this._documentWasEverVisible = true, null === (e6 = this._lazyLoadedSessionRecording) || void 0 === e6 || null === (t2 = e6.setDocumentWasEverVisible) || void 0 === t2 || t2.call(e6, true));
    }, !this._instance.sessionManager) throw ed.error("started without valid sessionManager"), new Error("[SessionRecording] started without valid sessionManager. This is a bug.");
    if ("always" === this._config.cookieless_mode) throw new Error('[SessionRecording] cannot be used with cookieless_mode="always"');
    (null == Ge ? void 0 : Ge.addEventListener) && Bn(Ge, "visibilitychange", this._onVisibilityChange);
  }
  initialize() {
    this.startIfEnabledOrStop();
  }
  dispose({ discardBufferedEvents: e5 = false } = {}) {
    var t2;
    this._sessionRecordingDisposed = true, null == Ge || null === (t2 = Ge.removeEventListener) || void 0 === t2 || t2.call(Ge, "visibilitychange", this._onVisibilityChange), e5 ? this._discardRecording(true) : this.stopRecording();
  }
  get _isRecordingEnabled() {
    var e5;
    const t2 = !!(null === (e5 = this._instance.get_property("$session_recording_remote_config")) || void 0 === e5 ? void 0 : e5.enabled), i2 = !this._config.disable_session_recording, s2 = this._config.disable_session_recording || this._instance.consent.isOptedOut();
    return je && t2 && i2 && !s2;
  }
  startIfEnabledOrStop(e5) {
    var t2;
    if (this._sessionRecordingDisposed) return;
    if (this._isRecordingEnabled && (null === (t2 = this._lazyLoadedSessionRecording) || void 0 === t2 ? void 0 : t2.isStarted)) return;
    const i2 = !ft(Object.assign) && !ft(Array.from);
    this._isRecordingEnabled && i2 ? (this._lazyLoadAndStart(e5), ed.info("starting")) : (this._recordingStatus = Zu, this.stopRecording());
  }
  _lazyLoadAndStart(e5) {
    var t2, i2;
    if (this._isRecordingEnabled) if ("awaiting_config" !== this._recordingStatus && "missing_config" !== this._recordingStatus && (this._recordingStatus = Xu), (null == tt || null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 || null === (t2 = t2.rrweb) || void 0 === t2 ? void 0 : t2.record) && (null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 ? void 0 : i2.initSessionRecording)) this._onScriptLoaded(e5);
    else {
      var s2, r2;
      const t3 = this._instance.sessionManager;
      null === (s2 = tt.__PosthogExtensions__) || void 0 === s2 || null === (r2 = s2.loadExternalDependency) || void 0 === r2 || r2.call(s2, this._instance, this._scriptName, (i3) => {
        if (!this._sessionRecordingDisposed && this._isRecordingEnabled && this._instance.sessionManager === t3) return i3 ? (this._instance.register_for_session({ $sdk_debug_recording_script_not_loaded: true }), ed.error("could not load recorder", i3)) : void this._onScriptLoaded(e5);
        this._recordingStatus = "disabled";
      });
    }
  }
  stopRecording() {
    var e5, t2;
    null === (e5 = this._persistFlagsOnSessionListener) || void 0 === e5 || e5.call(this), this._persistFlagsOnSessionListener = void 0, null === (t2 = this._lazyLoadedSessionRecording) || void 0 === t2 || t2.stop();
  }
  _discardRecording(e5 = false) {
    var t2, i2;
    null === (t2 = this._persistFlagsOnSessionListener) || void 0 === t2 || t2.call(this), this._persistFlagsOnSessionListener = void 0, null === (i2 = this._lazyLoadedSessionRecording) || void 0 === i2 || i2.discard({ discardProducerEvents: e5 });
  }
  _resetSampling() {
    var e5, t2;
    null === (e5 = this._persistence) || void 0 === e5 || e5.unregister("$session_is_sampled"), null === (t2 = this._persistence) || void 0 === t2 || t2.unregister("$replay_sample_rate");
  }
  _validateSampleRate(e5, t2) {
    if (St(e5)) return null;
    const i2 = wt(e5) ? e5 : parseFloat(e5);
    return "number" != typeof (s2 = i2) || !Number.isFinite(s2) || 0 > s2 || s2 > 1 ? (ed.warn(`${t2} must be between 0 and 1. Ignoring invalid value:`, e5), null) : i2;
    var s2;
  }
  _persistRemoteConfig(e5) {
    if (this._persistence) {
      var t2, i2;
      const s2 = this._persistence, r2 = () => {
        var t3;
        const i3 = false === e5.sessionRecording ? void 0 : e5.sessionRecording, r3 = this._validateSampleRate(null === (t3 = this._config.session_recording) || void 0 === t3 ? void 0 : t3.sampleRate, "session_recording.sampleRate"), n2 = this._validateSampleRate(null == i3 ? void 0 : i3.sampleRate, "remote config sampleRate"), o2 = null != r3 ? r3 : n2;
        St(o2) && this._resetSampling();
        const a2 = null == i3 ? void 0 : i3.minimumDurationMilliseconds;
        s2.register({ [G]: ls(ls({ cache_timestamp: Date.now(), enabled: !!i3 }, i3), {}, { networkPayloadCapture: ls({ capturePerformance: e5.capturePerformance }, null == i3 ? void 0 : i3.networkPayloadCapture), canvasRecording: { enabled: null == i3 ? void 0 : i3.recordCanvas, fps: null == i3 ? void 0 : i3.canvasFps, quality: null == i3 ? void 0 : i3.canvasQuality }, sampleRate: o2, minimumDurationMilliseconds: ft(a2) ? null : a2, endpoint: null == i3 ? void 0 : i3.endpoint, triggerMatchType: null == i3 ? void 0 : i3.triggerMatchType, masking: null == i3 ? void 0 : i3.masking, urlTriggers: null == i3 ? void 0 : i3.urlTriggers, version: null == i3 ? void 0 : i3.version, triggerGroups: null == i3 ? void 0 : i3.triggerGroups }) });
      };
      r2(), null === (t2 = this._persistFlagsOnSessionListener) || void 0 === t2 || t2.call(this), this._persistFlagsOnSessionListener = null === (i2 = this._instance.sessionManager) || void 0 === i2 ? void 0 : i2.onSessionId(r2);
    }
  }
  onRemoteConfig(e5) {
    const t2 = e5.ok ? e5.config : void 0;
    return t2 && "sessionRecording" in t2 ? false === t2.sessionRecording ? (this._persistRemoteConfig(t2), void this._discardRecording()) : (this._persistRemoteConfig(t2), void this.startIfEnabledOrStop()) : ("awaiting_config" === this._recordingStatus && (this._recordingStatus = "missing_config", this._instance.register_for_session({ [Pe]: true }), ed.warn("config refresh failed, recording will not start until page reload")), void this.startIfEnabledOrStop());
  }
  log(e5, t2 = "log") {
    var i2;
    (null === (i2 = this._lazyLoadedSessionRecording) || void 0 === i2 ? void 0 : i2.log) ? this._lazyLoadedSessionRecording.log(e5, t2) : ed.warn("log called before recorder was ready");
  }
  get _scriptName() {
    var e5, t2;
    const i2 = null === (e5 = this._instance) || void 0 === e5 || null === (e5 = e5.persistence) || void 0 === e5 ? void 0 : e5.get_property(G);
    return (null == i2 || null === (t2 = i2.scriptConfig) || void 0 === t2 ? void 0 : t2.script) || "lazy-recorder";
  }
  _isRemoteConfigFresh() {
    const e5 = this._instance.get_property(G);
    if (!e5) return false;
    let t2;
    try {
      t2 = "object" == typeof e5 ? e5 : JSON.parse(e5);
    } catch (e6) {
      return ed.warn("persisted remote config for session recording is invalid and will be ignored", e6), false;
    }
    return !St(t2.cache_timestamp) && 36e5 >= Date.now() - t2.cache_timestamp;
  }
  _onScriptLoaded(e5) {
    var t2, i2, s2;
    if (!this._sessionRecordingDisposed && this._isRecordingEnabled && this._instance.sessionManager) {
      if (!(null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.initSessionRecording)) return ed.warn("Called on script loaded before session recording is available. This can be caused by adblockers."), void this._instance.register_for_session({ [xe]: true });
      var r2;
      if (this._lazyLoadedSessionRecording || (this._lazyLoadedSessionRecording = null === (r2 = tt.__PosthogExtensions__) || void 0 === r2 ? void 0 : r2.initSessionRecording(this._instance, this._documentWasEverVisible), this._lazyLoadedSessionRecording._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), !this._isRemoteConfigFresh()) {
        if ("missing_config" === this._recordingStatus || "awaiting_config" === this._recordingStatus) return;
        return this._recordingStatus = "awaiting_config", ed.info("persisted remote config is stale, requesting fresh config before starting"), void new El(this._instance).load();
      }
      this._recordingStatus = Xu, null === (i2 = (s2 = this._lazyLoadedSessionRecording).setDocumentWasEverVisible) || void 0 === i2 || i2.call(s2, this._documentWasEverVisible), this._lazyLoadedSessionRecording.start(e5);
    } else this._recordingStatus = Zu;
  }
  onRRwebEmit(e5) {
    var t2, i2;
    null === (t2 = this._lazyLoadedSessionRecording) || void 0 === t2 || null === (i2 = t2.onRRwebEmit) || void 0 === i2 || i2.call(t2, e5);
  }
  overrideLinkedFlag() {
    var e5, t2;
    this._lazyLoadedSessionRecording || null === (t2 = this._persistence) || void 0 === t2 || t2.register({ $replay_override_linked_flag: true }), null === (e5 = this._lazyLoadedSessionRecording) || void 0 === e5 || e5.overrideLinkedFlag();
  }
  overrideSampling() {
    var e5, t2;
    this._lazyLoadedSessionRecording || null === (t2 = this._persistence) || void 0 === t2 || t2.register({ $replay_override_sampling: true }), null === (e5 = this._lazyLoadedSessionRecording) || void 0 === e5 || e5.overrideSampling();
  }
  overrideTrigger(e5) {
    var t2, i2;
    this._lazyLoadedSessionRecording || null === (i2 = this._persistence) || void 0 === i2 || i2.register({ ["url" === e5 ? "$replay_override_url_trigger" : "$replay_override_event_trigger"]: true }), null === (t2 = this._lazyLoadedSessionRecording) || void 0 === t2 || t2.overrideTrigger(e5);
  }
  get sdkDebugProperties() {
    var e5;
    const t2 = {};
    for (const e6 of td) {
      var i2;
      const s2 = null === (i2 = this._instance.sessionPersistence) || void 0 === i2 ? void 0 : i2.get_property(e6);
      ft(s2) || (t2[e6] = s2);
    }
    return ls(ls({}, t2), (null === (e5 = this._lazyLoadedSessionRecording) || void 0 === e5 ? void 0 : e5.sdkDebugProperties) || { $recording_status: this.status });
  }
  tryAddCustomEvent(e5, t2) {
    var i2;
    return !!(null === (i2 = this._lazyLoadedSessionRecording) || void 0 === i2 ? void 0 : i2.tryAddCustomEvent(e5, t2));
  }
  flushBeforeIdentityReset() {
    var e5, t2;
    null === (e5 = this._lazyLoadedSessionRecording) || void 0 === e5 || null === (t2 = e5.flushBeforeIdentityReset) || void 0 === t2 || t2.call(e5);
  }
} };
var Sh = { autocapture: class extends _u {
  constructor(e5) {
    super(new qu(e5)), this.instance = e5;
  }
}, historyAutocapture: class {
  constructor(e5) {
    this._isFlushingPageview = false, this._instance = e5, this._lastLocation = this._getCurrentLocation();
  }
  initialize() {
    this.startIfEnabled();
  }
  get isEnabled() {
    const e5 = this._getCaptureOptions();
    return !!(e5.path || e5.search || this._shouldCaptureHashChanges(e5));
  }
  startIfEnabled() {
    this.isEnabled && (In.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
  }
  startIfEnabledOrStop() {
    this.stop(), this._lastLocation = this._getCurrentLocation(), this.startIfEnabled();
  }
  stop() {
    this._popstateListener && this._popstateListener(), this._popstateListener = void 0, this._hashchangeListener && this._hashchangeListener(), this._hashchangeListener = void 0, In.info("History API monitoring stopped");
  }
  monitorHistoryChanges() {
    je && je.history && (this._patchHistoryMethod("pushState"), this._patchHistoryMethod("replaceState"), this._setupPopstateListener(), this._shouldCaptureHashChanges() && this._setupHashchangeListener());
  }
  _patchHistoryMethod(e5) {
    var t2;
    if (!je || (null === (t2 = je.history[e5]) || void 0 === t2 ? void 0 : t2.__posthog_wrapped__)) return;
    const i2 = this;
    Wu(je.history, e5, (t3) => function(s2, r2, n2) {
      var o2;
      i2._isUrlChanging(n2) && i2._flushPendingPageview(), t3.call(this, s2, r2, n2), i2._capturePageview(e5, !i2._isFlushingPageview && "popstate" !== (null == je || null === (o2 = je.event) || void 0 === o2 ? void 0 : o2.type));
    });
  }
  _getCurrentLocation() {
    const e5 = null == je ? void 0 : je.location;
    if (null == e5 ? void 0 : e5.pathname) return { pathname: e5.pathname, search: e5.search, hash: e5.hash };
  }
  _getCaptureOptions() {
    const e5 = this._instance.config.capture_pageview;
    return "history_change" === e5 ? { path: true } : gt(e5) ? e5 : {};
  }
  _shouldCaptureHashChanges(e5 = this._getCaptureOptions()) {
    return !!e5.hash && !this._instance.config.disable_capture_url_hashes;
  }
  _hasLocationChanged(e5) {
    const t2 = this._getCaptureOptions(), i2 = this._lastLocation;
    return !(!i2 || !(t2.path && e5.pathname !== i2.pathname || t2.search && e5.search !== i2.search || this._shouldCaptureHashChanges(t2) && e5.hash !== i2.hash));
  }
  _capturePageview(e5, t2 = false) {
    try {
      t2 || this._flushPendingPageview();
      const i2 = this._getCurrentLocation();
      if (!i2) return;
      if (this._hasLocationChanged(i2)) {
        const i3 = () => this._instance.capture(Ue, { navigation_type: e5 });
        t2 ? (this._pendingPageview = i3, Promise.resolve().then(() => this._flushPendingPageview())) : i3();
      }
      this._lastLocation = i2;
    } catch (t3) {
      In.error(`Error capturing ${e5} pageview`, t3);
    }
  }
  _isUrlChanging(e5) {
    var t2, i2;
    return !(St(e5) || !je) && (null === (t2 = Ea(String(e5))) || void 0 === t2 ? void 0 : t2.href) !== (null === (i2 = je.location) || void 0 === i2 ? void 0 : i2.href);
  }
  _flushPendingPageview() {
    const e5 = this._pendingPageview;
    if (e5) {
      this._pendingPageview = void 0, this._isFlushingPageview = true;
      try {
        e5();
      } catch (e6) {
        In.error("Error capturing deferred pageview", e6);
      } finally {
        this._isFlushingPageview = false;
      }
      this._lastLocation = this._getCurrentLocation();
    }
  }
  _setupPopstateListener() {
    if (this._popstateListener) return;
    const e5 = () => {
      this._capturePageview("popstate");
    };
    Bn(je, "popstate", e5), this._popstateListener = () => {
      je && je.removeEventListener("popstate", e5);
    };
  }
  _setupHashchangeListener() {
    if (this._hashchangeListener) return;
    const e5 = () => {
      this._capturePageview("hashchange");
    };
    Bn(je, "hashchange", e5), this._hashchangeListener = () => {
      je && je.removeEventListener("hashchange", e5);
    };
  }
}, heatmaps: class {
  get _config() {
    return this.instance.config;
  }
  constructor(e5) {
    var t2;
    this._enabledServerSide = false, this._initialized = false, this._flushInterval = null, this.instance = e5, this._enabledServerSide = !!(null === (t2 = this.instance.persistence) || void 0 === t2 ? void 0 : t2.props[N]), this.rageclicks = new su(e5.config.rageclick);
  }
  initialize() {
    this.startIfEnabled();
  }
  get flushIntervalMilliseconds() {
    let e5 = 5e3;
    return gt(this._config.capture_heatmaps) && this._config.capture_heatmaps.flush_interval_milliseconds && (e5 = this._config.capture_heatmaps.flush_interval_milliseconds), e5;
  }
  get isEnabled() {
    return St(this._config.capture_heatmaps) ? St(this._config.enable_heatmaps) ? this._enabledServerSide : this._config.enable_heatmaps : false !== this._config.capture_heatmaps;
  }
  startIfEnabled() {
    if (this.isEnabled) {
      if (this._initialized) return;
      id.info("starting..."), this._setupListeners(), this._onVisibilityChange();
    } else {
      var e5;
      clearInterval(null !== (e5 = this._flushInterval) && void 0 !== e5 ? e5 : void 0), this._removeListeners(), this.getAndClearBuffer();
    }
  }
  onRemoteConfig(e5) {
    if (!e5.ok) return;
    const t2 = e5.config;
    if (!("heatmaps" in t2)) return;
    const i2 = !!t2.heatmaps;
    this.instance.persistence && this.instance.persistence.register({ [N]: i2 }), this._enabledServerSide = i2, this.startIfEnabled();
  }
  getAndClearBuffer() {
    const e5 = this._buffer;
    return this._buffer = void 0, e5;
  }
  _onDeadClick(e5) {
    sd(e5.originalEvent) && this._onClick(e5.originalEvent, "deadclick");
  }
  _onVisibilityChange() {
    this._flushInterval && clearInterval(this._flushInterval), this._flushInterval = "visible" === (null == Ge ? void 0 : Ge.visibilityState) ? setInterval(this._flush.bind(this), this.flushIntervalMilliseconds) : null;
  }
  _setupListeners() {
    je && Ge && (this._flushHandler = this._flush.bind(this), Bn(je, Be, this._flushHandler), this._onClickHandler = (e5) => this._onClick(e5 || (null == je ? void 0 : je.event)), Bn(Ge, "click", this._onClickHandler, { capture: true }), this._onMouseMoveHandler = (e5) => this._onMouseMove(e5 || (null == je ? void 0 : je.event)), Bn(Ge, "mousemove", this._onMouseMoveHandler, { capture: true }), this._deadClicksCapture = new da(this.instance, ca, this._onDeadClick.bind(this)), this._deadClicksCapture.startIfEnabledOrStop(), this._onVisibilityChange_handler = this._onVisibilityChange.bind(this), Bn(Ge, m, this._onVisibilityChange_handler), this._initialized = true);
  }
  _removeListeners() {
    var e5;
    je && Ge && (this._flushHandler && je.removeEventListener(Be, this._flushHandler), this._onClickHandler && Ge.removeEventListener("click", this._onClickHandler, { capture: true }), this._onMouseMoveHandler && Ge.removeEventListener("mousemove", this._onMouseMoveHandler, { capture: true }), this._onVisibilityChange_handler && Ge.removeEventListener(m, this._onVisibilityChange_handler), clearTimeout(this._mouseMoveTimeout), null === (e5 = this._deadClicksCapture) || void 0 === e5 || e5.stop(), this._initialized = false);
  }
  _getProperties(e5, t2) {
    const i2 = this.instance.scrollManager.scrollY(), s2 = this.instance.scrollManager.scrollX(), r2 = this.instance.scrollManager.scrollElement(), n2 = (function(e6, t3, i3) {
      let s3 = e6;
      for (; s3 && bo(s3) && !So(s3, "body"); ) {
        if (s3 === i3) return false;
        let e7;
        try {
          var r3, n3, o2;
          e7 = null === (r3 = null !== (n3 = null === (o2 = s3.ownerDocument) || void 0 === o2 ? void 0 : o2.defaultView) && void 0 !== n3 ? n3 : je) || void 0 === r3 ? void 0 : r3.getComputedStyle(s3).position;
        } catch (e8) {
          return false;
        }
        if (ot(t3, e7)) return true;
        s3 = Ao(s3);
      }
      return false;
    })(Fo(e5), ["fixed", "sticky"], r2);
    return { x: e5.clientX + (n2 ? 0 : s2), y: e5.clientY + (n2 ? 0 : i2), target_fixed: n2, type: t2 };
  }
  _onClick(e5, t2 = "click") {
    var i2;
    if (yo(e5.target) || !sd(e5)) return;
    const s2 = this._getProperties(e5, t2);
    (null === (i2 = this.rageclicks) || void 0 === i2 ? void 0 : i2.isRageClick(e5.clientX, e5.clientY, (/* @__PURE__ */ new Date()).getTime())) && Wo(Fo(e5), this.instance.config.rageclick) && this._capture(ls(ls({}, s2), {}, { type: "rageclick" })), this._capture(s2);
  }
  _onMouseMove(e5) {
    !yo(e5.target) && sd(e5) && (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout(() => {
      this._capture(this._getProperties(e5, "mousemove"));
    }, 500));
  }
  _capture(e5) {
    if (!je) return;
    const t2 = this._config.disable_capture_url_hashes ? es(je.location.href) : je.location.href, i2 = this._config.custom_personal_data_properties, s2 = this._config.mask_personal_data_properties ? [...Ra, ...i2 || []] : [], r2 = Fa(t2, s2, Aa);
    this._buffer = this._buffer || {}, this._buffer[r2] || (this._buffer[r2] = []), this._buffer[r2].push(e5);
  }
  _flush() {
    this._buffer && !vt(this._buffer) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
  }
}, deadClicksAutocapture: da, webVitalsAutocapture: class {
  constructor(e5) {
    var t2;
    this._instance = e5, this._enabledServerSide = false, this._initialized = false, this._buffer = { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 }, this._flushToCapture = (e6 = false) => {
      clearTimeout(this._delayedFlushTimer), this._delayedFlushTimer = void 0, 0 !== this._buffer.metrics.length && (this._instance.capture("$web_vitals", ls({ $current_url: this._buffer.url }, this._buffer.metrics.reduce((e7, t3) => ls(ls({}, e7), {}, { [`$web_vitals_${t3.name}_event`]: ls({}, t3), [`$web_vitals_${t3.name}_value`]: t3.value }), {})), e6 ? { transport: "sendBeacon", send_instantly: true } : void 0), this._buffer = { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 });
    }, this._addToBuffer = (e6) => {
      var t3;
      if (this._buffer = this._buffer || { navigationKey: void 0, url: void 0, metrics: [], firstMetricTimestamp: void 0 }, St(null == e6 ? void 0 : e6.name) || St(null == e6 ? void 0 : e6.value)) return void Gu.error("Invalid metric received", e6);
      const i2 = "string" == typeof e6.navigationURL ? e6.navigationURL : void 0, s2 = this._maskedURL(i2);
      if (ft(s2)) return;
      const r2 = wt(e6.navigationId) || "string" == typeof e6.navigationId ? `navigation:${e6.navigationId}` : `url:${s2}`;
      if (this._maxAllowedValue && e6.value >= this._maxAllowedValue) return void Gu.error("Ignoring metric with value >= " + this._maxAllowedValue, e6);
      this._buffer.navigationKey !== r2 && (this._flushToCapture(), this._delayedFlushTimer = setTimeout(this._flushToCapture, this.flushToCaptureTimeoutMs)), ft(this._buffer.navigationKey) && (this._buffer.navigationKey = r2, this._buffer.url = s2), this._buffer.firstMetricTimestamp = ft(this._buffer.firstMetricTimestamp) ? Date.now() : this._buffer.firstMetricTimestamp;
      const n2 = null === (t3 = this._instance.sessionManager) || void 0 === t3 ? void 0 : t3.checkAndGetSessionAndWindowId(true), o2 = ls(ls(ls({}, e6), i2 ? { navigationURL: s2 } : {}), {}, { $current_url: s2, timestamp: Date.now() });
      if (delete o2.entries, gt(e6.attribution) && this.attributionMetrics.indexOf(e6.name) > -1) {
        const t4 = {};
        for (const i3 of Yu) {
          const s3 = "url" === i3 && "string" == typeof e6.attribution[i3] ? this._maskedURL(e6.attribution[i3]) : e6.attribution[i3];
          ft(s3) || (t4[i3] = s3);
        }
        o2.attribution = t4;
      } else delete o2.attribution;
      ft(n2) || (o2.$session_id = n2.sessionId, o2.$window_id = n2.windowId), this._buffer.metrics.push(o2), this._buffer.metrics.length === this.allowedMetrics.length && this._flushToCapture();
    }, this._startCapturing = () => {
      if (this._initialized) return;
      let e6, t3, i2, s2, r2 = false;
      const n2 = tt.__PosthogExtensions__, o2 = null == n2 ? void 0 : n2.postHogWebVitalsCallbacksByFlavor, a2 = (null == o2 ? void 0 : o2[this._callbackFlavor]) || ("web-vitals" === this._callbackFlavor && ft(o2) ? null == n2 ? void 0 : n2.postHogWebVitalsCallbacks : void 0);
      if (!ft(a2)) {
        const n3 = a2.withoutAttribution, o3 = this.attributionMetrics;
        r2 = !ft(n3), e6 = o3.indexOf("LCP") > -1 ? a2.onLCP : (null == n3 ? void 0 : n3.onLCP) || a2.onLCP, t3 = o3.indexOf("CLS") > -1 ? a2.onCLS : (null == n3 ? void 0 : n3.onCLS) || a2.onCLS, i2 = o3.indexOf("FCP") > -1 ? a2.onFCP : (null == n3 ? void 0 : n3.onFCP) || a2.onFCP, s2 = o3.indexOf("INP") > -1 ? a2.onINP : (null == n3 ? void 0 : n3.onINP) || a2.onINP;
      }
      if (!(e6 && t3 && i2 && s2)) return void Gu.error("web vitals callbacks not loaded - not starting");
      const l2 = { reportSoftNavs: this.useSoftNavs }, c2 = r2 && this.attributionMetrics.indexOf("INP") > -1 ? ls(ls({}, l2), {}, { includeProcessedEventEntries: false }) : l2;
      this.allowedMetrics.indexOf("LCP") > -1 && e6(this._addToBuffer.bind(this), l2), this.allowedMetrics.indexOf("CLS") > -1 && t3(this._addToBuffer.bind(this), l2), this.allowedMetrics.indexOf("FCP") > -1 && i2(this._addToBuffer.bind(this), l2), this.allowedMetrics.indexOf("INP") > -1 && s2(this._addToBuffer.bind(this), c2);
      const u2 = null == je ? void 0 : je.document;
      Bn(u2, m, () => {
        "hidden" === (null == u2 ? void 0 : u2.visibilityState) && this._flushToCapture(true);
      }), Bn(je, "pagehide", () => this._flushToCapture(true)), this._initialized = true;
    }, this._enabledServerSide = !!(null === (t2 = this._instance.persistence) || void 0 === t2 ? void 0 : t2.props[H]), this.startIfEnabled();
  }
  get _perfConfig() {
    return this._instance.config.capture_performance;
  }
  get allowedMetrics() {
    var e5, t2;
    const i2 = gt(this._perfConfig) ? null === (e5 = this._perfConfig) || void 0 === e5 ? void 0 : e5.web_vitals_allowed_metrics : void 0;
    return St(i2) ? (null === (t2 = this._instance.persistence) || void 0 === t2 ? void 0 : t2.props.$web_vitals_allowed_metrics) || Qu : i2;
  }
  get flushToCaptureTimeoutMs() {
    return (gt(this._perfConfig) ? this._perfConfig.web_vitals_delayed_flush_ms : void 0) || 5e3;
  }
  get attributionMetrics() {
    const e5 = gt(this._perfConfig) ? this._perfConfig.web_vitals_attribution : void 0;
    return Ct(e5) ? e5 ? Qu : [] : _t(e5) ? e5 : Ju;
  }
  get useAttribution() {
    return this.attributionMetrics.length > 0;
  }
  get useSoftNavs() {
    const e5 = gt(this._perfConfig) ? this._perfConfig.__preview_web_vitals_soft_navs : void 0;
    return null != e5 && e5;
  }
  get _maxAllowedValue() {
    const e5 = gt(this._perfConfig) && wt(this._perfConfig.__web_vitals_max_value) ? this._perfConfig.__web_vitals_max_value : Ku;
    return e5 > 0 && 6e4 >= e5 ? Ku : e5;
  }
  get isEnabled() {
    const e5 = null == Ke ? void 0 : Ke.protocol;
    if ("http:" !== e5 && "https:" !== e5) return Gu.info("Web Vitals are disabled on non-http/https protocols"), false;
    const t2 = gt(this._perfConfig) ? this._perfConfig.web_vitals : Ct(this._perfConfig) ? this._perfConfig : void 0;
    return Ct(t2) ? t2 : this._enabledServerSide;
  }
  startIfEnabled() {
    this.isEnabled && !this._initialized && (Gu.info("enabled, starting..."), this._loadScript(this._startCapturing));
  }
  onRemoteConfig(e5) {
    if (!e5.ok) return;
    const t2 = e5.config;
    if (!("capturePerformance" in t2)) return;
    const i2 = gt(t2.capturePerformance) && !!t2.capturePerformance.web_vitals, s2 = gt(t2.capturePerformance) ? t2.capturePerformance.web_vitals_allowed_metrics : void 0;
    this._instance.persistence && (this._instance.persistence.register({ [H]: i2 }), this._instance.persistence.register({ [V]: s2 })), this._enabledServerSide = i2, this.startIfEnabled();
  }
  get _callbackFlavor() {
    return this.useSoftNavs ? this.useAttribution ? "web-vitals-with-attribution-soft-navs" : "web-vitals-soft-navs" : this.useAttribution ? "web-vitals-with-attribution" : "web-vitals";
  }
  _loadScript(e5) {
    var t2;
    const i2 = tt.__PosthogExtensions__, s2 = this._callbackFlavor, r2 = null == i2 ? void 0 : i2.postHogWebVitalsCallbacksByFlavor;
    (null == r2 ? void 0 : r2[s2]) || "web-vitals" === s2 && ft(r2) && (null == i2 ? void 0 : i2.postHogWebVitalsCallbacks) ? e5() : null == i2 || null === (t2 = i2.loadExternalDependency) || void 0 === t2 || t2.call(i2, this._instance, s2, (t3) => {
      t3 ? Gu.error("failed to load script", t3) : e5();
    });
  }
  _maskedURL(e5) {
    const t2 = e5 || (null == je ? void 0 : je.location.href);
    if (!t2) return void Gu.error("Could not determine current URL");
    const i2 = this._instance.config.disable_capture_url_hashes ? es(t2) : t2, s2 = this._instance.config.custom_personal_data_properties, r2 = this._instance.config.mask_personal_data_properties ? [...Ra, ...s2 || []] : [];
    return Fa(i2, r2, Aa);
  }
} };
var wh = { exceptionObserver: class {
  constructor(e5) {
    var t2;
    this._startCapturing = () => {
      var e6;
      if (!je || !this.isEnabled || !(null === (e6 = tt.__PosthogExtensions__) || void 0 === e6 ? void 0 : e6.errorWrappingFunctions)) return;
      const t3 = tt.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, i2 = tt.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, s2 = tt.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
      try {
        !this._unwrapOnError && this._config.capture_unhandled_errors && (this._unwrapOnError = t3(this.captureException.bind(this))), !this._unwrapUnhandledRejection && this._config.capture_unhandled_rejections && (this._unwrapUnhandledRejection = i2(this.captureException.bind(this))), !this._unwrapConsoleError && this._config.capture_console_errors && (this._unwrapConsoleError = s2(this.captureException.bind(this)));
      } catch (e7) {
        Hu.error("failed to start", e7), this._stopCapturing();
      }
    }, this._instance = e5, this._remoteEnabled = !!(null === (t2 = this._instance.persistence) || void 0 === t2 ? void 0 : t2.props[B]), this._rateLimiter = new qt(ls(ls({}, (function(e6 = {}) {
      var t3, i2, s2, r2;
      return { refillRate: null !== (t3 = null !== (i2 = e6.exceptionRateLimiterRefillRate) && void 0 !== i2 ? i2 : e6.__exceptionRateLimiterRefillRate) && void 0 !== t3 ? t3 : 1, bucketSize: null !== (s2 = null !== (r2 = e6.exceptionRateLimiterBucketSize) && void 0 !== r2 ? r2 : e6.__exceptionRateLimiterBucketSize) && void 0 !== s2 ? s2 : 10 };
    })(this._instance.config.error_tracking)), {}, { refillInterval: 1e4, _logger: Hu })), this._config = this._requiredConfig(), this.startIfEnabledOrStop();
  }
  _requiredConfig() {
    const e5 = this._instance.config.capture_exceptions;
    let t2 = { capture_unhandled_errors: false, capture_unhandled_rejections: false, capture_console_errors: false };
    return gt(e5) ? t2 = ls(ls({}, t2), e5) : (ft(e5) ? this._remoteEnabled : e5) && (t2 = ls(ls({}, t2), {}, { capture_unhandled_errors: true, capture_unhandled_rejections: true })), t2;
  }
  get isEnabled() {
    return this._config.capture_console_errors || this._config.capture_unhandled_errors || this._config.capture_unhandled_rejections;
  }
  startIfEnabledOrStop() {
    this.isEnabled ? (Hu.info("enabled"), this._stopCapturing(), this._loadScript(this._startCapturing)) : this._stopCapturing();
  }
  _loadScript(e5) {
    var t2, i2, s2;
    (null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.errorWrappingFunctions) ? e5() : null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this._instance, "exception-autocapture", (t3) => {
      if (t3) return Hu.error("failed to load script", t3);
      e5();
    });
  }
  _stopCapturing() {
    var e5, t2, i2;
    null === (e5 = this._unwrapOnError) || void 0 === e5 || e5.call(this), this._unwrapOnError = void 0, null === (t2 = this._unwrapUnhandledRejection) || void 0 === t2 || t2.call(this), this._unwrapUnhandledRejection = void 0, null === (i2 = this._unwrapConsoleError) || void 0 === i2 || i2.call(this), this._unwrapConsoleError = void 0;
  }
  onRemoteConfig(e5) {
    if (!e5.ok) return;
    const t2 = e5.config;
    "autocaptureExceptions" in t2 && (this._remoteEnabled = !!t2.autocaptureExceptions || false, this._instance.persistence && this._instance.persistence.register({ [B]: this._remoteEnabled }), this._config = this._requiredConfig(), this.startIfEnabledOrStop());
  }
  onConfigChange() {
    this._config = this._requiredConfig();
  }
  captureException(e5) {
    try {
      var t2, i2, s2;
      const r2 = null !== (t2 = null == e5 || null === (i2 = e5.$exception_list) || void 0 === i2 || null === (i2 = i2[0]) || void 0 === i2 ? void 0 : i2.type) && void 0 !== t2 ? t2 : "Exception";
      if (this._rateLimiter.consumeRateLimit(r2)) return void Hu.info("Skipping exception capture because of client rate limiting.", { exception: r2 });
      null === (s2 = this._instance.exceptions) || void 0 === s2 || s2.sendExceptionEvent(e5);
    } catch (e6) {
    }
  }
}, exceptions: class {
  constructor(e5) {
    var t2, i2;
    this._suppressionRules = [], this._errorPropertiesBuilder = new gs([new Ls(), new Vs(), new Ns(), new Ds(), new js(), new zs(), new Us(), new Ws()], /* @__PURE__ */ (function(e6, ...t3) {
      return (i3, s2 = 0) => {
        const r2 = [], n2 = i3.split("\n"), o2 = Math.min(n2.length, s2 + 1e3), a2 = [];
        for (let i4 = s2; o2 > i4; i4++) {
          const s3 = n2[i4];
          if (s3.length > 1024) continue;
          const o3 = Is.test(s3) ? s3.replace(Is, "$1") : s3;
          if (!o3.match(/\S*Error: /)) {
            for (const i5 of t3) {
              const t4 = i5(o3, e6);
              if (t4) {
                r2.push(t4);
                const e7 = Ts(r2);
                if (e7) {
                  for (let t5 = a2.length - 1; t5 >= 0; t5--) {
                    const i6 = a2[t5];
                    if (e7.start >= i6.start + i6.length) break;
                    a2.pop();
                  }
                  a2.push(e7);
                }
                break;
              }
            }
            if (Ms(r2, a2) >= 50) break;
          }
        }
        const l2 = [...a2].sort((e7, t4) => t4.start - e7.start), c2 = l2[l2.length - 1];
        if (c2) {
          const e7 = $s(r2, c2);
          r2.splice(c2.start - e7, e7);
          for (const t4 of l2) t4.start -= e7;
        }
        for (const e7 of l2) Rs(r2, e7);
        return a2.some((e7) => 0 === e7.start && r2.length === e7.length) && (function(e7) {
          const t4 = e7.map((e8) => `${e8.function}|${e8.filename}|${e8.lineno}|${e8.colno}|${e8.module}`);
          let i4 = 0;
          for (let e8 = 1; t4.length > e8; e8++) Os(t4, e8, i4) && (i4 = e8);
          e7.push(...e7.splice(0, i4));
        })(r2), (function(e7) {
          if (!e7.length) return [];
          const t4 = Array.from(e7);
          return t4.reverse(), t4.slice(0, 50).map((e8) => {
            return ls(ls({}, e8), {}, { filename: e8.filename || (i4 = t4, i4[i4.length - 1] || {}).filename, function: e8.function || "?" });
            var i4;
          });
        })(r2);
      };
    })("web:javascript", Cs, Ps)), this._instance = e5, this._suppressionRules = null !== (t2 = null === (i2 = this._instance.persistence) || void 0 === i2 ? void 0 : i2.get_property("$error_tracking_suppression_rules")) && void 0 !== t2 ? t2 : [], this._exceptionStepsConfig = Ys(this._getExceptionStepsConfig()), this._exceptionStepsBuffer = new Zs(this._exceptionStepsConfig);
  }
  onConfigChange() {
    this._exceptionStepsConfig = Ys(this._getExceptionStepsConfig()), this._exceptionStepsBuffer.setConfig(this._exceptionStepsConfig);
  }
  onRemoteConfig(e5) {
    var t2, i2, s2;
    if (!e5.ok) return;
    const r2 = e5.config;
    if (!("errorTracking" in r2)) return;
    const n2 = null !== (t2 = null === (i2 = r2.errorTracking) || void 0 === i2 ? void 0 : i2.suppressionRules) && void 0 !== t2 ? t2 : [], o2 = null === (s2 = r2.errorTracking) || void 0 === s2 ? void 0 : s2.captureExtensionExceptions;
    this._suppressionRules = n2, this._instance.persistence && this._instance.persistence.register({ [U]: this._suppressionRules, [q]: o2 });
  }
  get _captureExtensionExceptions() {
    var e5;
    const t2 = !!this._instance.get_property(q), i2 = this._instance.config.error_tracking.captureExtensionExceptions;
    return null !== (e5 = null != i2 ? i2 : t2) && void 0 !== e5 && e5;
  }
  buildProperties(e5, t2) {
    return this._errorPropertiesBuilder.buildFromUnknown(e5, { syntheticException: null == t2 ? void 0 : t2.syntheticException, mechanism: { handled: null == t2 ? void 0 : t2.handled } });
  }
  addExceptionStep(e5, t2) {
    if (this._exceptionStepsConfig.enabled) try {
      if (!mt(e5) || 0 === e5.trim().length) return void Ad.warn("Ignoring exception step because message must be a non-empty string");
      const { sanitizedProperties: i2, droppedKeys: s2 } = (function(e6) {
        if (!e6) return { sanitizedProperties: {}, droppedKeys: [] };
        const t3 = [];
        return { sanitizedProperties: Object.keys(e6).reduce((i3, s3) => Qs.has(s3) ? (t3.push(s3), i3) : (i3[s3] = e6[s3], i3), {}), droppedKeys: t3 };
      })(this._coerceExceptionStepProperties(t2));
      s2.length > 0 && Ad.warn("Ignoring reserved exception step fields", { droppedKeys: s2 }), this._exceptionStepsBuffer.add(ls({ [Gs]: e5, [Ks]: (/* @__PURE__ */ new Date()).toISOString() }, i2));
    } catch (e6) {
      Ad.error("Failed to add exception step. Ignoring breadcrumb.", e6);
    }
  }
  sendExceptionEvent(e5) {
    try {
      const t2 = e5.$exception_list;
      if (this._isExceptionList(t2)) {
        if (this._matchesSuppressionRule(t2)) return this._addDroppedExceptionStep("Exception dropped: matched a suppression rule"), void Ad.info("Skipping exception capture because a suppression rule matched");
        if (!this._captureExtensionExceptions && this._isExtensionException(t2)) return this._addDroppedExceptionStep("Exception dropped: thrown by a browser extension"), void Ad.info("Skipping exception capture because it was thrown by an extension");
        if (!this._captureExtensionExceptions && this._isInjectedBrowserScriptException(t2)) return this._addDroppedExceptionStep("Exception dropped: thrown by an injected browser script"), void Ad.info("Skipping exception capture because it was thrown by an injected browser script");
        if (!this._instance.config.error_tracking.__capturePostHogExceptions && this._isPostHogException(t2)) return this._addDroppedExceptionStep("Exception dropped: thrown by the PostHog SDK"), void Ad.info("Skipping exception capture because it was thrown by the PostHog SDK");
      }
      const i2 = this._exceptionStepsConfig.enabled && St(e5.$exception_steps) ? this._addBufferedExceptionSteps(e5) : e5, s2 = (function() {
        if ("u" > typeof process) {
          var e6;
          const t4 = null === (e6 = process.env.POSTHOG_RELEASE_ID) || void 0 === e6 ? void 0 : e6.trim();
          if (t4) return t4;
        }
        const t3 = globalThis._posthogReleaseId;
        return "string" == typeof t3 && t3.length > 0 ? t3 : void 0;
      })();
      s2 && (i2.$release_id = s2);
      try {
        const e6 = this._instance.capture("$exception", i2, { _noTruncate: true, _batchKey: "exceptionEvent", _originatedFromCaptureException: true });
        return e6 && this._exceptionStepsBuffer.clear(), e6;
      } catch (e6) {
        return $d(e6) || Ad.error("Failed to capture exception event. Dropping this exception.", e6), void this._exceptionStepsBuffer.clear();
      }
    } catch (e6) {
      return void ($d(e6) || Ad.error("Failed to process exception event. Ignoring this exception.", e6));
    }
  }
  _addBufferedExceptionSteps(e5) {
    try {
      const t2 = this._exceptionStepsBuffer.getAttachable();
      return 0 === t2.length ? e5 : ls(ls({}, e5), {}, { $exception_steps: t2 });
    } catch (t2) {
      return Ad.error("Failed to read buffered exception steps. Capturing exception without steps.", t2), e5;
    }
  }
  _addDroppedExceptionStep(e5) {
    this._exceptionStepsConfig.enabled && this._exceptionStepsBuffer.add({ [Gs]: e5, [Ks]: (/* @__PURE__ */ new Date()).toISOString() });
  }
  _coerceExceptionStepProperties(e5) {
    return gt(e5) ? ls({}, e5) : {};
  }
  _getExceptionStepsConfig() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this._instance.config.error_tracking) || void 0 === t2 ? void 0 : t2.exception_steps) && void 0 !== e5 ? e5 : {};
  }
  _matchesSuppressionRule(e5) {
    if (0 === e5.length) return false;
    try {
      const t2 = e5.reduce((e6, { type: t3, value: i2 }) => (mt(t3) && t3.length > 0 && e6.$exception_types.push(t3), mt(i2) && i2.length > 0 && e6.$exception_values.push(i2), e6), { $exception_types: [], $exception_values: [] });
      return this._suppressionRules.some((e6) => {
        const i2 = e6.values.map((e7) => {
          const i3 = Hc[e7.operator], s2 = t2[e7.key];
          if (!i3 || !s2) return false;
          const r2 = _t(e7.value) ? e7.value : [e7.value];
          return r2.length > 0 && i3(r2, s2);
        });
        return "OR" === e6.type ? i2.some(Boolean) : i2.every(Boolean);
      });
    } catch (e6) {
      return Ad.warn("Failed to evaluate suppression rules. Capturing the exception.", e6), false;
    }
  }
  _isExtensionException(e5) {
    const t2 = e5.flatMap((e6) => {
      var t3, i3;
      return null !== (t3 = null === (i3 = e6.stacktrace) || void 0 === i3 ? void 0 : i3.frames) && void 0 !== t3 ? t3 : [];
    }), i2 = t2.filter(({ filename: e6 }) => !!e6 && Ld.some((t3) => e6.startsWith(t3)));
    return 0 !== i2.length && (!i2.every(({ filename: e6 }) => !!e6 && e6.startsWith(Md)) || e5.some(({ type: e6, value: t3 }) => "NoResponse" === e6 || mt(t3) && Od.some(({ value: e7, exact: i3 }) => i3 ? t3 === e7 : t3.includes(e7))) && !t2.some(({ in_app: e6, filename: t3 }) => e6 && !(null == t3 ? void 0 : t3.startsWith(Md))));
  }
  _isInjectedBrowserScriptException(e5) {
    return e5.some(({ value: e6 }) => mt(e6) && Dd.some((t2) => e6.includes(t2)));
  }
  _isPostHogException(e5) {
    if (e5.length > 0) {
      var t2, i2, s2, r2;
      const n2 = null !== (t2 = null === (i2 = e5[0].stacktrace) || void 0 === i2 ? void 0 : i2.frames) && void 0 !== t2 ? t2 : [], o2 = n2[n2.length - 1];
      return null !== (s2 = null == o2 || null === (r2 = o2.filename) || void 0 === r2 ? void 0 : r2.includes("posthog.com/static")) && void 0 !== s2 && s2;
    }
    return false;
  }
  _isExceptionList(e5) {
    return !St(e5) && _t(e5);
  }
} };
var Eh = ls({ productTours: class {
  get _persistence() {
    return this._instance.persistence;
  }
  constructor(e5) {
    this._productTourManager = null, this._cachedTours = null, this._instance = e5;
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(e5) {
    if (!e5.ok) return;
    const t2 = e5.config;
    if ("productTours" in t2) {
      var i2, s2;
      if (this._persistence && this._persistence.register({ [j]: !!t2.productTours }), !nd(this._instance)) return !this._productTourManager && St(null === (i2 = this._persistence) || void 0 === i2 ? void 0 : i2.props.ph_product_tours) || rd.info("product tours disabled; stopping and clearing cached tours"), null === (s2 = this._productTourManager) || void 0 === s2 || s2.stop(), this._productTourManager = null, void this.clearCache();
      this.loadIfEnabled();
    }
  }
  loadIfEnabled() {
    !this._productTourManager && nd(this._instance) && this._loadScript(() => this._startProductTours());
  }
  _loadScript(e5) {
    var t2, i2, s2;
    (null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.generateProductTours) ? e5() : null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this._instance, "product-tours", (t3) => {
      t3 ? rd.error("Could not load product tours script", t3) : e5();
    });
  }
  _startProductTours() {
    var e5;
    !this._productTourManager && (null === (e5 = tt.__PosthogExtensions__) || void 0 === e5 ? void 0 : e5.generateProductTours) && (this._productTourManager = tt.__PosthogExtensions__.generateProductTours(this._instance, true));
  }
  getProductTours(e5, t2 = false) {
    if (_t(this._cachedTours) && !t2) return void e5(this._cachedTours, { isLoaded: true });
    const i2 = this._persistence;
    if (i2) {
      const s2 = i2.props[le];
      if (_t(s2) && !t2) return this._cachedTours = s2, void e5(s2, { isLoaded: true });
    }
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", `/api/product_tours/?token=${this._instance.config.token}`), method: "GET", timestampMode: "query", callback: (t3) => {
      if (!nd(this._instance)) return void e5([], { isLoaded: true });
      const s2 = t3.statusCode;
      if (200 !== s2 || !t3.json) {
        const i3 = `Product Tours API could not be loaded, status: ${s2}`;
        return 0 === s2 ? t3.error || rd.warn(i3) : rd.error(i3), void e5([], { isLoaded: false, error: i3 });
      }
      const r2 = _t(t3.json.product_tours) ? t3.json.product_tours : [];
      this._cachedTours = r2, i2 && i2.register({ [le]: r2 }), e5(r2, { isLoaded: true });
    } });
  }
  getActiveProductTours(e5) {
    St(this._productTourManager) ? e5([], { isLoaded: false, error: "Product tours not loaded" }) : this._productTourManager.getActiveProductTours(e5);
  }
  showProductTour(e5) {
    var t2;
    null === (t2 = this._productTourManager) || void 0 === t2 || t2.showTourById(e5);
  }
  previewTour(e5) {
    this._productTourManager ? this._productTourManager.previewTour(e5) : this._loadScript(() => {
      var t2;
      this._startProductTours(), null === (t2 = this._productTourManager) || void 0 === t2 || t2.previewTour(e5);
    });
  }
  dismissProductTour() {
    var e5;
    null === (e5 = this._productTourManager) || void 0 === e5 || e5.dismissTour("user_clicked_skip");
  }
  nextStep() {
    var e5;
    null === (e5 = this._productTourManager) || void 0 === e5 || e5.nextStep();
  }
  previousStep() {
    var e5;
    null === (e5 = this._productTourManager) || void 0 === e5 || e5.previousStep();
  }
  clearCache() {
    var e5;
    this._cachedTours = null, null === (e5 = this._persistence) || void 0 === e5 || e5.unregister("ph_product_tours");
  }
  resetTour(e5) {
    var t2;
    null === (t2 = this._productTourManager) || void 0 === t2 || t2.resetTour(e5);
  }
  resetAllTours() {
    var e5;
    null === (e5 = this._productTourManager) || void 0 === e5 || e5.resetAllTours();
  }
  cancelPendingTour(e5) {
    var t2;
    null === (t2 = this._productTourManager) || void 0 === t2 || t2.cancelPendingTour(e5);
  }
} }, yh);
var Ch = { siteApps: class {
  constructor(e5) {
    this._instance = e5, this._siteAppElementPatchCount = 0, this._bufferedInvocations = [], this.apps = {};
  }
  get isEnabled() {
    return !!this._instance.config.opt_in_site_apps;
  }
  _eventCollector(e5, t2) {
    if (!t2) return;
    const i2 = this.globalsForEvent(t2);
    this._bufferedInvocations.push(i2), this._bufferedInvocations.length > 1e3 && (this._bufferedInvocations = this._bufferedInvocations.slice(10));
  }
  get siteAppLoaders() {
    var e5;
    return null === (e5 = tt._POSTHOG_REMOTE_CONFIG) || void 0 === e5 || null === (e5 = e5[this._instance.config.token]) || void 0 === e5 ? void 0 : e5.siteApps;
  }
  initialize() {
    if (this.isEnabled) {
      const e5 = this._instance._addCaptureHook(this._eventCollector.bind(this));
      this._stopBuffering = () => {
        e5(), this._bufferedInvocations = [], this._stopBuffering = void 0;
      };
    }
  }
  globalsForEvent(e5) {
    var t2, i2, s2, r2, n2, o2, a2;
    if (!e5) throw new Error("Event payload is required");
    const l2 = {}, c2 = this._instance.get_property("$groups") || [], u2 = this._instance.get_property("$stored_group_properties") || {};
    for (const [e6, t3] of Object.entries(u2)) l2[e6] = { id: c2[e6], type: e6, properties: t3 };
    const { $set_once: d2, $set: h2 } = e5;
    return { event: ls(ls({}, _r(e5, od)), {}, { properties: ls(ls(ls({}, e5.properties), h2 ? { $set: ls(ls({}, null !== (t2 = null === (i2 = e5.properties) || void 0 === i2 ? void 0 : i2.$set) && void 0 !== t2 ? t2 : {}), h2) } : {}), d2 ? { $set_once: ls(ls({}, null !== (s2 = null === (r2 = e5.properties) || void 0 === r2 ? void 0 : r2.$set_once) && void 0 !== s2 ? s2 : {}), d2) } : {}), elements_chain: null !== (n2 = null === (o2 = e5.properties) || void 0 === o2 ? void 0 : o2.$elements_chain) && void 0 !== n2 ? n2 : "", distinct_id: null === (a2 = e5.properties) || void 0 === a2 ? void 0 : a2.distinct_id }), person: { properties: this._instance.get_property("$stored_person_properties") }, groups: l2 };
  }
  _prepareElementForSiteApp(e5) {
    var t2;
    const i2 = null === (t2 = e5.tagName) || void 0 === t2 ? void 0 : t2.toLowerCase();
    if ("style" === i2 && this._instance.config.prepare_external_dependency_stylesheet) {
      return this._instance.config.prepare_external_dependency_stylesheet(e5) || (ad.error("prepare_external_dependency_stylesheet returned null"), null);
    }
    if ("script" === i2 && this._instance.config.prepare_external_dependency_script) {
      return this._instance.config.prepare_external_dependency_script(e5) || (ad.error("prepare_external_dependency_script returned null"), null);
    }
    return e5;
  }
  _patchSiteAppElementInsertionMethods() {
    var e5, t2, i2, s2, r2, n2, o2, a2;
    if (!this._instance.config.prepare_external_dependency_stylesheet && !this._instance.config.prepare_external_dependency_script) return () => {
    };
    const l2 = null == Ge ? void 0 : Ge.defaultView, c2 = null == l2 || null === (e5 = l2.Node) || void 0 === e5 ? void 0 : e5.prototype;
    if (!l2 || !c2) return () => {
    };
    if (this._siteAppElementPatchCount++, this._restoreSiteAppElementPatches) return this._releaseSiteAppElementPatches();
    const u2 = [], d2 = this, h2 = /* @__PURE__ */ new WeakSet(), _2 = (e6, t3, i3) => {
      if (!(null == e6 ? void 0 : e6[t3])) return;
      const s3 = e6[t3];
      e6[t3] = i3(s3), u2.push(() => {
        e6[t3] = s3;
      });
    }, p2 = (e6) => {
      if (h2.has(e6)) return e6;
      const t3 = d2._prepareElementForSiteApp(e6);
      return t3 && h2.add(t3), t3;
    }, g2 = (e6) => e6.map((e7) => "string" == typeof e7 ? e7 : p2(e7)).filter((e7) => !bt(e7));
    return _2(c2, "appendChild", (e6) => function(t3) {
      const i3 = p2(t3);
      return i3 ? e6.call(this, i3) : t3;
    }), _2(c2, "insertBefore", (e6) => function(t3, i3) {
      const s3 = p2(t3);
      return s3 ? e6.call(this, s3, i3) : t3;
    }), _2(c2, "replaceChild", (e6) => function(t3, i3) {
      const s3 = p2(t3);
      return s3 ? e6.call(this, s3, i3) : i3;
    }), [null === (t2 = l2.Element) || void 0 === t2 ? void 0 : t2.prototype, null === (i2 = l2.Document) || void 0 === i2 ? void 0 : i2.prototype, null === (s2 = l2.DocumentFragment) || void 0 === s2 ? void 0 : s2.prototype].forEach((e6) => {
      _2(e6, "append", (e7) => function(...t3) {
        return e7.apply(this, g2(t3));
      }), _2(e6, "prepend", (e7) => function(...t3) {
        return e7.apply(this, g2(t3));
      });
    }), [null === (r2 = l2.Element) || void 0 === r2 ? void 0 : r2.prototype, null === (n2 = l2.CharacterData) || void 0 === n2 ? void 0 : n2.prototype, null === (o2 = l2.DocumentType) || void 0 === o2 ? void 0 : o2.prototype].forEach((e6) => {
      _2(e6, "before", (e7) => function(...t3) {
        return e7.apply(this, g2(t3));
      }), _2(e6, "after", (e7) => function(...t3) {
        return e7.apply(this, g2(t3));
      }), _2(e6, "replaceWith", (e7) => function(...t3) {
        const i3 = g2(t3);
        return t3.length && !i3.length ? void 0 : e7.apply(this, i3);
      });
    }), _2(null === (a2 = l2.Element) || void 0 === a2 ? void 0 : a2.prototype, "insertAdjacentElement", (e6) => function(t3, i3) {
      const s3 = p2(i3);
      return s3 ? e6.call(this, t3, s3) : null;
    }), this._restoreSiteAppElementPatches = () => {
      u2.forEach((e6) => e6()), this._restoreSiteAppElementPatches = void 0;
    }, this._releaseSiteAppElementPatches();
  }
  _releaseSiteAppElementPatches() {
    let e5 = false;
    return () => {
      var t2;
      e5 || (e5 = true, this._siteAppElementPatchCount--, 0 === this._siteAppElementPatchCount && (null === (t2 = this._restoreSiteAppElementPatches) || void 0 === t2 || t2.call(this)));
    };
  }
  _runWithPreparedSiteAppElements(e5, t2 = true) {
    const i2 = this._patchSiteAppElementInsertionMethods();
    try {
      const s2 = e5(i2);
      return t2 && i2(), s2;
    } catch (e6) {
      throw i2(), e6;
    }
  }
  setupSiteApp(e5) {
    const t2 = this.apps[e5.id], i2 = () => {
      var i3;
      !t2.errored && this._bufferedInvocations.length && (ad.info(`Processing ${this._bufferedInvocations.length} events for site app with id ${e5.id}`), this._bufferedInvocations.forEach((e6) => this._runWithPreparedSiteAppElements(() => {
        var i4;
        return null === (i4 = t2.processEvent) || void 0 === i4 ? void 0 : i4.call(t2, e6);
      })), t2.processedBuffer = true), Object.values(this.apps).every((e6) => e6.processedBuffer || e6.errored) && (null === (i3 = this._stopBuffering) || void 0 === i3 || i3.call(this));
    };
    let s2 = false;
    const r2 = (r3) => {
      t2.errored = !r3, t2.loaded = true, ad.info(`Site app with id ${e5.id} ${r3 ? "loaded" : "errored"}`), s2 && i2();
    };
    try {
      const { processEvent: i3 } = this._runWithPreparedSiteAppElements((t3) => e5.init({ posthog: this._instance, callback(e6) {
        t3(), r2(e6);
      } }), false);
      i3 && (t2.processEvent = i3), s2 = true;
    } catch (t3) {
      ad.error(ld + e5.id, t3), r2(false);
    }
    if (s2 && t2.loaded) try {
      i2();
    } catch (i3) {
      ad.error(`Error while processing buffered events PostHog app with config id ${e5.id}`, i3), t2.errored = true;
    }
  }
  _setupSiteApps() {
    const e5 = this.siteAppLoaders || [];
    for (const t2 of e5) this.apps[t2.id] = { id: t2.id, loaded: false, errored: false, processedBuffer: false };
    for (const t2 of e5) this.setupSiteApp(t2);
  }
  _onCapturedEvent(e5) {
    if (0 === Object.keys(this.apps).length) return;
    const t2 = this.globalsForEvent(e5);
    for (const i2 of Object.values(this.apps)) try {
      this._runWithPreparedSiteAppElements(() => {
        var e6;
        return null === (e6 = i2.processEvent) || void 0 === e6 ? void 0 : e6.call(i2, t2);
      });
    } catch (t3) {
      ad.error(`Error while processing event ${e5.event} for site app ${i2.id}`, t3);
    }
  }
  onRemoteConfig(e5) {
    var t2, i2, s2;
    if (null === (t2 = this.siteAppLoaders) || void 0 === t2 ? void 0 : t2.length) return this.isEnabled ? (this._setupSiteApps(), void this._instance.on("eventCaptured", (e6) => this._onCapturedEvent(e6))) : void ad.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    if (null === (i2 = this._stopBuffering) || void 0 === i2 || i2.call(this), !e5.ok) return;
    const r2 = e5.config;
    if (null === (s2 = r2.siteApps) || void 0 === s2 ? void 0 : s2.length) if (this.isEnabled) for (const { id: e6, url: t3 } of r2.siteApps) {
      var n2, o2;
      tt[`__$$ph_site_app_${e6}`] = this._instance, null === (n2 = tt.__PosthogExtensions__) || void 0 === n2 || null === (o2 = n2.loadSiteApp) || void 0 === o2 || o2.call(n2, this._instance, t3, (t4) => {
        if (t4) return ad.error(ld + e6, t4);
      });
    }
    else ad.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
  }
} };
var kh = { tracingHeaders: class {
  constructor(e5) {
    this._instance = e5, this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0, this._hostnamesForPatch = void 0, this._startCapturing = () => {
      const e6 = this._syncHostnamesForPatch();
      var t2, i2;
      e6 ? (ft(this._restoreXHRPatch) && (this._restoreXHRPatch = null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 || null === (t2 = t2.tracingHeadersPatchFns) || void 0 === t2 ? void 0 : t2._patchXHR(e6, () => this._instance.get_distinct_id(), this._instance.sessionManager)), ft(this._restoreFetchPatch) && (this._restoreFetchPatch = null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (i2 = i2.tracingHeadersPatchFns) || void 0 === i2 ? void 0 : i2._patchFetch(e6, () => this._instance.get_distinct_id(), this._instance.sessionManager))) : this._stopCapturing();
    };
  }
  initialize() {
    this.startIfEnabledOrStop();
  }
  _loadScript(e5) {
    var t2, i2, s2;
    (null === (t2 = tt.__PosthogExtensions__) || void 0 === t2 ? void 0 : t2.tracingHeadersPatchFns) ? e5() : null === (i2 = tt.__PosthogExtensions__) || void 0 === i2 || null === (s2 = i2.loadExternalDependency) || void 0 === s2 || s2.call(i2, this._instance, "tracing-headers", (t3) => {
      if (t3) return Vu.error("failed to load script", t3);
      e5();
    });
  }
  _getConfiguredHostnames() {
    var e5, t2;
    return null !== (e5 = null !== (t2 = this._instance.config.tracing_headers) && void 0 !== t2 ? t2 : this._instance.config.addTracingHeaders) && void 0 !== e5 ? e5 : this._instance.config.__add_tracing_headers;
  }
  _syncHostnamesForPatch() {
    const e5 = this._getConfiguredHostnames();
    return _t(e5) ? (_t(this._hostnamesForPatch) ? this._hostnamesForPatch.splice(0, this._hostnamesForPatch.length, ...e5) : this._hostnamesForPatch = [...e5], e5.length > 0 ? this._hostnamesForPatch : void 0) : (_t(this._hostnamesForPatch) && this._hostnamesForPatch.splice(0), this._hostnamesForPatch = e5 || void 0, this._hostnamesForPatch);
  }
  _stopCapturing() {
    var e5, t2;
    null === (e5 = this._restoreXHRPatch) || void 0 === e5 || e5.call(this), null === (t2 = this._restoreFetchPatch) || void 0 === t2 || t2.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0;
  }
  startIfEnabledOrStop() {
    this._syncHostnamesForPatch() ? this._loadScript(this._startCapturing) : this._stopCapturing();
  }
} };
var xh = ls({ surveys: class extends vd {
  constructor(e5) {
    super(new fd(e5));
  }
} }, yh);
var Ph = { toolbar: class {
  constructor(e5) {
    this.instance = e5;
  }
  _setToolbarState(e5) {
    tt.ph_toolbar_state = e5;
  }
  _getToolbarState() {
    var e5;
    return null !== (e5 = tt.ph_toolbar_state) && void 0 !== e5 ? e5 : 0;
  }
  initialize() {
    return this.maybeLoadToolbar();
  }
  maybeLoadToolbar(e5 = void 0, t2 = void 0, i2 = void 0) {
    var s2, r2;
    if (Un(this.instance.config)) return false;
    if (!je || !Ge) return false;
    e5 = null !== (s2 = e5) && void 0 !== s2 ? s2 : je.location, i2 = null !== (r2 = i2) && void 0 !== r2 ? r2 : je.history;
    try {
      if (!t2) {
        try {
          je.localStorage.setItem("test", "test"), je.localStorage.removeItem("test");
        } catch (e6) {
          return false;
        }
        t2 = null == je ? void 0 : je.localStorage;
      }
      const s3 = md || Ta(e5.hash, "__posthog") || Ta(e5.hash, "state");
      let r3;
      const n2 = s3 ? ts(() => JSON.parse(atob(decodeURIComponent(s3)))) || ts(() => JSON.parse(decodeURIComponent(s3))) : null;
      return n2 && "ph_authorize" === n2.action ? (r3 = n2, r3.source = "url", r3 && Object.keys(r3).length > 0 && (n2.desiredHash ? e5.hash = n2.desiredHash : i2 ? i2.replaceState(i2.state, "", e5.pathname + e5.search) : e5.hash = "")) : (r3 = JSON.parse(t2.getItem(yd) || "{}"), r3.source = "localstorage", delete r3.userIntent), !(!r3.token || this.instance.config.token !== r3.token || (this.loadToolbar(r3), 0));
    } catch (e6) {
      return false;
    }
  }
  _callLoadToolbar(e5) {
    const t2 = tt.ph_load_toolbar || tt.ph_load_editor;
    !St(t2) && pt(t2) ? t2(e5, this.instance) : bd.warn("No toolbar load function found");
  }
  loadToolbar(e5) {
    const t2 = !!(null == Ge ? void 0 : Ge.getElementById("__POSTHOG_TOOLBAR__"));
    if (!je || t2) return false;
    const i2 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, s2 = ls(ls({ token: this.instance.config.token }, e5), {}, { apiURL: this.instance.requestRouter.endpointFor("ui") }, i2 ? { instrument: false } : {});
    if (je.localStorage.setItem(yd, JSON.stringify(ls(ls({}, s2), {}, { source: void 0 }))), 2 === this._getToolbarState()) this._callLoadToolbar(s2);
    else if (0 === this._getToolbarState()) {
      var r2, n2;
      this._setToolbarState(1), null === (r2 = tt.__PosthogExtensions__) || void 0 === r2 || null === (n2 = r2.loadExternalDependency) || void 0 === n2 || n2.call(r2, this.instance, "toolbar", (e6) => {
        if (e6) return bd.error("[Toolbar] Failed to load", e6), void this._setToolbarState(0);
        this._setToolbarState(2), this._callLoadToolbar(s2);
      }), Bn(je, "turbolinks:load", () => {
        this._setToolbarState(0), this.loadToolbar(s2);
      });
    }
    return true;
  }
  _loadEditor(e5) {
    return this.loadToolbar(e5);
  }
  maybeLoadEditor(e5 = void 0, t2 = void 0, i2 = void 0) {
    return this.maybeLoadToolbar(e5, t2, i2);
  }
} };
var Ih = ls({ experiments: class e4 {
  get _config() {
    return this._instance.config;
  }
  constructor(t2) {
    this._instance = t2, this.getWebExperimentsAndEvaluateDisplayLogic = (t3 = false) => {
      this.getWebExperiments((t4) => {
        e4._logInfo("retrieved web experiments from the server"), this._flagToExperiments = /* @__PURE__ */ new Map(), t4.forEach((t5) => {
          if (t5.feature_flag_key) {
            var i2;
            this._flagToExperiments && (e4._logInfo("setting flag key ", t5.feature_flag_key, " to web experiment ", t5), null === (i2 = this._flagToExperiments) || void 0 === i2 || i2.set(t5.feature_flag_key, t5));
            const s2 = this._instance.getFeatureFlag(t5.feature_flag_key);
            mt(s2) && t5.variants[s2] && this._applyTransforms(t5.name, s2, t5.variants[s2].transforms);
          } else if (t5.variants) for (const i3 in t5.variants) {
            const s2 = t5.variants[i3];
            e4._matchesTestVariant(s2, this._instance) && this._applyTransforms(t5.name, i3, s2.transforms);
          }
        });
      }, t3);
    }, this._instance.onFeatureFlags((e5) => {
      this.onFeatureFlags(e5);
    });
  }
  initialize() {
  }
  onFeatureFlags(t2) {
    if (this._is_bot()) e4._logInfo(Nd);
    else if (!this._config.disable_web_experiments) {
      if (St(this._flagToExperiments)) return this._flagToExperiments = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
      e4._logInfo("applying feature flags", t2), t2.forEach((e5) => {
        var t3;
        if (this._flagToExperiments && (null === (t3 = this._flagToExperiments) || void 0 === t3 ? void 0 : t3.has(e5))) {
          var i2;
          const t4 = this._instance.getFeatureFlag(e5), s2 = null === (i2 = this._flagToExperiments) || void 0 === i2 ? void 0 : i2.get(e5);
          t4 && (null == s2 ? void 0 : s2.variants[t4]) && this._applyTransforms(s2.name, t4, s2.variants[t4].transforms);
        }
      });
    }
  }
  previewWebExperiment() {
    const t2 = e4.getWindowLocation();
    if (null == t2 ? void 0 : t2.search) {
      const i2 = Ia(null == t2 ? void 0 : t2.search, "__experiment_id"), s2 = Ia(null == t2 ? void 0 : t2.search, "__experiment_variant");
      i2 && s2 && (e4._logInfo(`previewing web experiments ${i2} && ${s2}`), this.getWebExperiments((e5) => {
        this._showPreviewWebExperiment(parseInt(i2), s2, e5);
      }, false, true));
    }
  }
  loadIfEnabled() {
    this._config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
  }
  getWebExperiments(e5, t2, i2) {
    if (this._config.disable_web_experiments && !i2) return e5([]);
    const s2 = this._instance.get_property("$web_experiments");
    if (s2 && !t2) return e5(s2);
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", `/api/web_experiments/?token=${this._config.token}`), method: "GET", timestampMode: "query", callback: (t3) => e5(200 === t3.statusCode && t3.json && t3.json.experiments || []) });
  }
  _showPreviewWebExperiment(t2, i2, s2) {
    const r2 = s2.filter((e5) => e5.id === t2);
    r2 && r2.length > 0 && (e4._logInfo(`Previewing web experiment [${r2[0].name}] with variant [${i2}]`), this._applyTransforms(r2[0].name, i2, r2[0].variants[i2].transforms));
  }
  static _matchesTestVariant(t2, i2) {
    return !St(t2.conditions) && e4._matchUrlConditions(t2, i2) && e4._matchUTMConditions(t2);
  }
  static _matchUrlConditions(t2, i2) {
    var s2;
    if (St(t2.conditions) || St(null === (s2 = t2.conditions) || void 0 === s2 ? void 0 : s2.url)) return true;
    const r2 = e4.getWindowLocation();
    if (r2) {
      var n2, o2, a2;
      const e5 = mo(i2, r2.href);
      return !(null === (n2 = t2.conditions) || void 0 === n2 ? void 0 : n2.url) || Bd[null !== (o2 = null === (a2 = t2.conditions) || void 0 === a2 ? void 0 : a2.urlMatchType) && void 0 !== o2 ? o2 : "icontains"](t2.conditions.url, e5);
    }
    return false;
  }
  static getWindowLocation() {
    return null == je ? void 0 : je.location;
  }
  static _matchUTMConditions(e5) {
    var t2;
    if (St(e5.conditions) || St(null === (t2 = e5.conditions) || void 0 === t2 ? void 0 : t2.utm)) return true;
    const i2 = Oa();
    if (i2.utm_source) {
      var s2, r2, n2, o2, a2, l2, c2, u2;
      const t3 = !(null === (s2 = e5.conditions) || void 0 === s2 || null === (s2 = s2.utm) || void 0 === s2 ? void 0 : s2.utm_campaign) || (null === (r2 = e5.conditions) || void 0 === r2 || null === (r2 = r2.utm) || void 0 === r2 ? void 0 : r2.utm_campaign) == i2.utm_campaign, d2 = !(null === (n2 = e5.conditions) || void 0 === n2 || null === (n2 = n2.utm) || void 0 === n2 ? void 0 : n2.utm_source) || (null === (o2 = e5.conditions) || void 0 === o2 || null === (o2 = o2.utm) || void 0 === o2 ? void 0 : o2.utm_source) == i2.utm_source, h2 = !(null === (a2 = e5.conditions) || void 0 === a2 || null === (a2 = a2.utm) || void 0 === a2 ? void 0 : a2.utm_medium) || (null === (l2 = e5.conditions) || void 0 === l2 || null === (l2 = l2.utm) || void 0 === l2 ? void 0 : l2.utm_medium) == i2.utm_medium, _2 = !(null === (c2 = e5.conditions) || void 0 === c2 || null === (c2 = c2.utm) || void 0 === c2 ? void 0 : c2.utm_term) || (null === (u2 = e5.conditions) || void 0 === u2 || null === (u2 = u2.utm) || void 0 === u2 ? void 0 : u2.utm_term) == i2.utm_term;
      return t3 && h2 && _2 && d2;
    }
    return false;
  }
  static _logInfo(e5, ...t2) {
    In.info(`[WebExperiments] ${e5}`, t2);
  }
  _applyTransforms(t2, i2, s2) {
    this._is_bot() ? e4._logInfo(Nd) : "control" !== i2 ? s2.forEach((s3) => {
      if (s3.selector) {
        var r2;
        e4._logInfo(`applying transform of variant ${i2} for experiment ${t2} `, s3);
        const n2 = null === (r2 = document) || void 0 === r2 ? void 0 : r2.querySelectorAll(s3.selector);
        null == n2 || n2.forEach((e5) => {
          const t3 = e5;
          s3.html && (t3.innerHTML = s3.html), s3.css && t3.setAttribute("style", s3.css);
        });
      }
    }) : e4._logInfo("Control variants leave the page unmodified.");
  }
  _is_bot() {
    return Ve && this._instance ? Lc(Ve, this._config.custom_blocked_useragents) : void 0;
  }
} }, yh);
var Fh = { conversations: class {
  constructor(e5) {
    this._instance = e5, this._isConversationsEnabled = void 0, this._conversationsManager = null, this._isInitializing = false, this._remoteConfig = null, this._loadFailed = false, this._resetGeneration = 0, this._pendingPanelAction = null;
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(e5) {
    if (this._instance.config.disable_conversations) return void (this._pendingPanelAction = null);
    if (this._remoteConfigSuccessful = e5.ok, !e5.ok) return;
    const t2 = e5.config.conversations;
    St(t2) ? this._pendingPanelAction = null : (Ct(t2) ? this._isConversationsEnabled = t2 : (this._isConversationsEnabled = t2.enabled, this._remoteConfig = t2), this._isConversationsEnabled || (this._pendingPanelAction = null), this.loadIfEnabled());
  }
  reset() {
    var e5;
    null === (e5 = this._conversationsManager) || void 0 === e5 || e5.reset(), this._conversationsManager = null, this._resetGeneration++, this._isConversationsEnabled = void 0, this._remoteConfig = null, this._remoteConfigSuccessful = void 0, this._loadFailed = false, this._pendingPanelAction = null;
  }
  loadIfEnabled() {
    if (this._conversationsManager) return;
    if (this._isInitializing) return;
    if (this._instance.config.disable_conversations) return;
    if (Un(this._instance.config)) return;
    if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) return;
    const e5 = null == tt ? void 0 : tt.__PosthogExtensions__;
    if (e5 && !ft(this._isConversationsEnabled) && this._isConversationsEnabled) if (this._remoteConfig && this._remoteConfig.token) {
      this._isInitializing = true;
      try {
        const t2 = e5.initConversations;
        if (t2) return this._completeInitialization(t2), void (this._isInitializing = false);
        const i2 = e5.loadExternalDependency;
        if (!i2) return void this._handleLoadError(w);
        const s2 = this._resetGeneration;
        i2(this._instance, "conversations", (t3) => {
          if (s2 !== this._resetGeneration) return this._isInitializing = false, void this.loadIfEnabled();
          t3 || !e5.initConversations ? this._handleLoadError("Could not load conversations script", t3) : this._completeInitialization(e5.initConversations), this._isInitializing = false;
        });
      } catch (e6) {
        this._handleLoadError("Error initializing conversations", e6), this._isInitializing = false;
      }
    } else Ud.error("Conversations enabled but missing token in remote config.");
  }
  _completeInitialization(e5) {
    if (this._remoteConfig) {
      try {
        this._conversationsManager = e5(this._remoteConfig, this._instance), this._loadFailed = false, Ud.info("Conversations loaded successfully");
      } catch (e6) {
        return void this._handleLoadError("Error completing conversations initialization", e6);
      }
      this._applyPendingPanelAction();
    } else Ud.error("Cannot complete initialization: remote config is null");
  }
  _applyPendingPanelAction() {
    const e5 = this._pendingPanelAction;
    this._pendingPanelAction = null, this._conversationsManager && e5 && ("open" === e5 ? this._conversationsManager.open() : this._conversationsManager.close());
  }
  _handleLoadError(e5, t2) {
    Ud.error(e5, t2), this._conversationsManager = null, this._isInitializing = false, this._loadFailed = true;
  }
  show() {
    this._conversationsManager ? this._conversationsManager.show() : Ud.warn("Conversations not loaded yet.");
  }
  hide() {
    "open" === this._pendingPanelAction && (this._pendingPanelAction = null), this._conversationsManager && this._conversationsManager.hide();
  }
  open() {
    this._conversationsManager ? (this._pendingPanelAction = null, this._conversationsManager.open()) : this._pendingPanelAction = "open";
  }
  close() {
    this._conversationsManager ? (this._pendingPanelAction = null, this._conversationsManager.close()) : this._pendingPanelAction = "close";
  }
  isAvailable() {
    return true === this._isConversationsEnabled && !bt(this._conversationsManager);
  }
  getUnavailableReason() {
    return this.isAvailable() ? null : this._instance.config.disable_conversations ? "disabled_by_config" : Un(this._instance.config) ? "disabled_for_toolbar" : this._instance.config.cookieless_mode && this._instance.consent.isOptedOut() ? "consent_opted_out" : false === this._remoteConfigSuccessful ? "remote_config_failed" : ft(this._isConversationsEnabled) ? this._remoteConfigSuccessful ? "disabled_in_project" : "remote_config_pending" : this._isConversationsEnabled ? St(this._remoteConfig) || !this._remoteConfig.token ? "missing_token" : (null == tt ? void 0 : tt.__PosthogExtensions__) ? this._isInitializing ? "initializing" : this._loadFailed ? "load_failed" : "not_loaded" : "extensions_unavailable" : "disabled_in_project";
  }
  isVisible() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this._conversationsManager) || void 0 === t2 ? void 0 : t2.isVisible()) && void 0 !== e5 && e5;
  }
  sendMessage(e5, t2, i2) {
    var s2 = this;
    return Lt(function* () {
      return s2._conversationsManager ? s2._conversationsManager.sendMessage(e5, t2, i2) : (Ud.warn(qd), null);
    })();
  }
  getMessages(e5, t2) {
    var i2 = this;
    return Lt(function* () {
      return i2._conversationsManager ? i2._conversationsManager.getMessages(e5, t2) : (Ud.warn(qd), null);
    })();
  }
  markAsRead(e5) {
    var t2 = this;
    return Lt(function* () {
      return t2._conversationsManager ? t2._conversationsManager.markAsRead(e5) : (Ud.warn(qd), null);
    })();
  }
  getTickets(e5) {
    var t2 = this;
    return Lt(function* () {
      return t2._conversationsManager ? t2._conversationsManager.getTickets(e5) : (Ud.warn(qd), null);
    })();
  }
  requestRestoreLink(e5) {
    var t2 = this;
    return Lt(function* () {
      return t2._conversationsManager ? t2._conversationsManager.requestRestoreLink(e5) : (Ud.warn(qd), null);
    })();
  }
  restoreFromToken(e5) {
    var t2 = this;
    return Lt(function* () {
      return t2._conversationsManager ? t2._conversationsManager.restoreFromToken(e5) : (Ud.warn(qd), null);
    })();
  }
  restoreFromUrlToken() {
    var e5 = this;
    return Lt(function* () {
      return e5._conversationsManager ? e5._conversationsManager.restoreFromUrlToken() : (Ud.warn(qd), null);
    })();
  }
  getCurrentTicketId() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this._conversationsManager) || void 0 === t2 ? void 0 : t2.getCurrentTicketId()) && void 0 !== e5 ? e5 : null;
  }
  getWidgetSessionId() {
    var e5, t2;
    return null !== (e5 = null === (t2 = this._conversationsManager) || void 0 === t2 ? void 0 : t2.getWidgetSessionId()) && void 0 !== e5 ? e5 : null;
  }
  _onIdentityChanged() {
    var e5;
    null === (e5 = this._conversationsManager) || void 0 === e5 || e5.setIdentity();
  }
  _onIdentityCleared() {
    var e5;
    null === (e5 = this._conversationsManager) || void 0 === e5 || e5.clearIdentity();
  }
} };
var Th = { logs: class extends Qd {
  constructor(e5) {
    super({ get() {
      var t2;
      return null == e5 || null === (t2 = e5.config) || void 0 === t2 ? void 0 : t2.logs;
    }, captureHintKey: W, get remoteConfigWillArrive() {
      var t2, i2;
      return !(null === (t2 = e5._shouldDisableFlags) || void 0 === t2 ? void 0 : t2.call(e5)) || !!(null === (i2 = tt._POSTHOG_REMOTE_CONFIG) || void 0 === i2 || null === (i2 = i2[e5.config.token]) || void 0 === i2 ? void 0 : i2.config);
    } }, () => (function(e6) {
      var t2;
      const i2 = {};
      if (i2.distinctId = e6.get_distinct_id(), e6.sessionManager) {
        const { sessionId: t3, windowId: s2, sessionStartTimestamp: r2, lastActivityTimestamp: n2 } = e6.sessionManager.checkAndGetSessionAndWindowId(true);
        i2.sessionId = t3, i2.windowId = s2, St(r2) || (i2.sessionStartTimestamp = r2), St(n2) || (i2.lastActivityTimestamp = n2);
      }
      if ((null == tt || null === (t2 = tt.location) || void 0 === t2 ? void 0 : t2.href) && (i2.currentUrl = e6.config.disable_capture_url_hashes ? es(tt.location.href) : tt.location.href), e6.featureFlags) {
        const t3 = e6.featureFlags.getFlags();
        t3 && t3.length > 0 && (i2.activeFeatureFlags = t3);
      }
      return i2;
    })(e5)), this._instance = e5, this.name = gu, this._listenForReconnect();
  }
  get _isRequestReady() {
    return this._instance.__loaded;
  }
  _getConsoleLoader() {
    const e5 = Fn("[logs]"), t2 = null == tt ? void 0 : tt.__PosthogExtensions__;
    if (!t2) return void e5.error("PostHog Extensions not found.");
    const i2 = t2.loadExternalDependency;
    if (i2) return (e6) => {
      i2(this._instance, "logs", (i3) => {
        const s2 = t2.logs;
        e6(i3, (null == s2 ? void 0 : s2.initializeLogs) ? { initialize: (e7) => s2.initializeLogs(e7), replay(e7, t3) {
          var i4;
          return null === (i4 = s2.replayConsoleBuffer) || void 0 === i4 ? void 0 : i4.call(s2, e7, t3);
        } } : void 0);
      });
    };
    e5.error(w);
  }
} };
var Rh = { metrics: class {
  constructor(e5) {
    this._instance = e5, this._logger = Fn("[metrics]"), this._disposed = false;
  }
  initialize() {
    this.onConfigChange();
  }
  onConfigChange() {
    var e5;
    if (this._disposed) return;
    const t2 = !!(null === (e5 = this._instance.config.metrics) || void 0 === e5 ? void 0 : e5.network);
    t2 && !this._stopNetworkMetrics ? this._stopNetworkMetrics = ((e6) => {
      let t3 = true;
      const i2 = () => t3 ? ((e7) => {
        var t4;
        const i3 = null === (t4 = e7.config.metrics) || void 0 === t4 ? void 0 : t4.network;
        return true === i3 ? {} : i3 || void 0;
      })(e6) : void 0, s2 = sh(e6, i2), r2 = rh(e6, i2);
      return () => {
        t3 = false, s2(), r2();
      };
    })(this._instance) : !t2 && this._stopNetworkMetrics && (this._stopNetworkMetrics(), this._stopNetworkMetrics = void 0);
  }
  _getCore() {
    var e5;
    const t2 = null === (e5 = this._instance) || void 0 === e5 || null === (e5 = e5.config) || void 0 === e5 ? void 0 : e5.metrics;
    var i2;
    return this._core && this._resolvedFrom === t2 || (null === (i2 = this._core) || void 0 === i2 || i2.reset(), this._resolvedFrom = t2, this._core = new kn(this._createHost(), (function(e6) {
      var t3, i3, s2, r2, n2;
      const o2 = null == e6 ? void 0 : e6.resourceAttributes;
      return { serviceName: null !== (t3 = null == o2 ? void 0 : o2["service.name"]) && void 0 !== t3 ? t3 : null == e6 ? void 0 : e6.serviceName, serviceVersion: null !== (i3 = null == o2 ? void 0 : o2["service.version"]) && void 0 !== i3 ? i3 : null == e6 ? void 0 : e6.serviceVersion, environment: null !== (s2 = null == o2 ? void 0 : o2["deployment.environment"]) && void 0 !== s2 ? s2 : null == e6 ? void 0 : e6.environment, resourceAttributes: o2, beforeSend: null == e6 ? void 0 : e6.beforeSend, flushIntervalMs: null !== (r2 = null == e6 ? void 0 : e6.flushIntervalMs) && void 0 !== r2 ? r2 : 1e4, maxSeriesPerFlush: null !== (n2 = null == e6 ? void 0 : e6.maxSeriesPerFlush) && void 0 !== n2 ? n2 : 1e3 };
    })(t2), this._logger)), this._core;
  }
  count(e5, t2 = 1, i2) {
    this._getCore().count(e5, t2, i2);
  }
  gauge(e5, t2, i2) {
    this._getCore().gauge(e5, t2, i2);
  }
  histogram(e5, t2, i2) {
    this._getCore().histogram(e5, t2, i2);
  }
  flush(e5) {
    if (!this._core) return Promise.resolve();
    if (e5) {
      const t2 = this._core.drainWindow();
      return t2 && this._sendMetricsBatch(t2, e5), Promise.resolve();
    }
    return this._core.flush().catch((e6) => this._logger.error("PostHog metrics flush failed:", e6));
  }
  reset() {
    var e5;
    null === (e5 = this._core) || void 0 === e5 || e5.reset();
  }
  dispose() {
    var e5, t2;
    this._disposed = true, null === (e5 = this._stopNetworkMetrics) || void 0 === e5 || e5.call(this), this._stopNetworkMetrics = void 0, null === (t2 = this._core) || void 0 === t2 || t2.reset();
  }
  _createHost() {
    const e5 = this._instance, t2 = this;
    return { get isDisabled() {
      return false;
    }, get optedOut() {
      return !e5.is_capturing();
    }, _sendMetricsBatch: (e6) => t2._sendMetricsBatch(e6), getLibraryId: () => i.LIB_NAME, getLibraryVersion: () => i.LIB_VERSION };
  }
  _sendMetricsBatch(e5, t2) {
    return new Promise((i2) => {
      let s2 = false;
      const r2 = (e6) => {
        s2 || (s2 = true, clearTimeout(n2), i2(e6));
      }, n2 = setTimeout(() => r2({ kind: "retry-later", error: new Error("metrics request timed out") }), 9e4);
      this._instance._send_request(ls(ls({ method: "POST", url: this._metricsUrl(), data: e5, compression: "best-available", batchKey: "metrics" }, t2 && { transport: t2 }), {}, { fireCallbackOnDrop: true, callback(e6) {
        const t3 = e6.statusCode;
        if (t3 >= 200 && 300 > t3) r2({ kind: "ok" });
        else if (413 === t3) r2({ kind: "too-large" });
        else if (0 !== t3 && 408 !== t3 && 429 !== t3 && 500 > t3) r2({ kind: "fatal", error: new Error(`metrics request failed with status ${t3}`) });
        else {
          var i3;
          r2({ kind: "retry-later", error: null !== (i3 = e6.error) && void 0 !== i3 ? i3 : new Error(`metrics request failed with status ${t3}`) });
        }
      } }));
    });
  }
  _metricsUrl() {
    return this._instance.requestRouter.endpointFor("api", "/i/v1/metrics") + "?token=" + encodeURIComponent(this._instance.config.token);
  }
} };
var $h = { webMCP: class {
  constructor(e5) {
    this._instance = e5, this._isPatched = false;
  }
  initialize() {
    this.startIfEnabled();
  }
  startIfEnabled() {
    if (!this._instance.config.capture_webmcp || this._isPatched) return;
    const e5 = null == Ge ? void 0 : Ge.modelContext;
    if (!e5 || !pt(e5.registerTool)) return;
    const t2 = nh.get(e5);
    if (t2) return t2.instances.add(this._instance), void (this._isPatched = true);
    const i2 = { instances: /* @__PURE__ */ new Set([this._instance]) }, s2 = e5.registerTool, r2 = this;
    Wu(e5, "registerTool", (e6) => {
      const t3 = e6;
      return function(e7, ...s3) {
        let n2 = e7;
        try {
          n2 = r2._wrapTool(e7, i2);
        } catch (i3) {
          return t3.call(this, e7, ...s3);
        }
        return t3.call(this, n2, ...s3);
      };
    }), e5.registerTool !== s2 && (nh.set(e5, i2), this._isPatched = true);
  }
  _wrapTool(e5, t2) {
    if (!e5 || !pt(e5.execute)) return e5;
    const i2 = e5.execute, s2 = this, { tool: r2, injected: n2 } = (function(e6, t3) {
      const i3 = { intent: false, model: false }, s3 = e6.inputSchema;
      if (!(function(e7) {
        return !!ft(e7) || gt(e7) && Object.keys(e7).every((e8) => oh.has(e8) || e8.startsWith("x-")) && true !== e7.additionalProperties && !gt(e7.additionalProperties) && (!e7.type || "object" === e7.type) && (!e7.properties || gt(e7.properties)) && (!e7.required || _t(e7.required));
      })(s3)) return { tool: dh(e6), injected: i3 };
      const r3 = (null == s3 ? void 0 : s3.properties) || {}, n3 = (e7) => uh(r3, e7) || _t(null == s3 ? void 0 : s3.required) && s3.required.includes(e7);
      if (i3.intent = t3.intent && !n3("context"), i3.model = t3.model && !n3("llm_model"), !i3.intent && !i3.model) return { tool: dh(e6), injected: i3 };
      const o2 = ls({}, r3), a2 = _t(null == s3 ? void 0 : s3.required) ? [...s3.required] : [];
      return i3.intent && (o2.context = { type: "string", description: `Explain why this tool is called and how it supports the user's goal. Describe the abstract purpose only. Do not include personal or identifying information. Generalize specific entities as roles such as "a customer".` }, a2.includes("context") || a2.push("context")), i3.model && (o2.llm_model = { type: "string", description: 'The exact model identifier you are running as, taken from your system prompt or environment. Pass "unknown" if you do not know it. Never guess.' }, a2.includes("llm_model") || a2.push("llm_model")), { tool: dh(e6, ls(ls({}, s3), {}, { type: (null == s3 ? void 0 : s3.type) || "object", properties: o2, required: a2 })), injected: i3 };
    })(e5, (function(e6) {
      const t3 = { intent: false, model: false };
      for (const i3 of e6.instances) {
        const e7 = ch(i3.config.capture_webmcp);
        t3.intent || (t3.intent = true === (null == e7 ? void 0 : e7.intent)), t3.model || (t3.model = true === (null == e7 ? void 0 : e7.model));
      }
      return t3;
    })(t2));
    return Object.defineProperty(r2, "execute", { configurable: true, enumerable: true, writable: true, value(...o2) {
      const a2 = /* @__PURE__ */ new Date(), l2 = (function(e6, t3) {
        if (!gt(e6)) return {};
        try {
          const i3 = t3.intent ? hh(e6.context, 2048, true) : void 0, s3 = t3.model ? hh(e6.llm_model, 256) : void 0;
          return ls(ls({}, i3 && "{}" !== i3 ? { intent: i3 } : {}), s3 && "unknown" !== s3.toLowerCase() ? { model: s3 } : {});
        } catch (e7) {
          return {};
        }
      })(o2[0], n2), c2 = (function(e6, t3) {
        const i3 = e6[0];
        if (!gt(i3)) return e6;
        try {
          const s3 = t3.intent && uh(i3, "context"), r3 = t3.model && uh(i3, "llm_model");
          if (!s3 && !r3) return e6;
          const n3 = ls({}, i3);
          return s3 && delete n3.context, r3 && delete n3.llm_model, [n3, ...e6.slice(1)];
        } catch (t4) {
          return e6;
        }
      })(o2, n2);
      let u2;
      try {
        u2 = i2.apply(this === r2 ? e5 : this, c2);
      } catch (e6) {
        throw s2._captureToolCall(t2, r2, a2, { error: e6, errorResult: false }, l2), e6;
      }
      if ((d2 = u2) && "function" == typeof d2.then) return Promise.resolve(u2).then((e6) => {
        const i3 = _h(e6) ? { error: e6, errorResult: true } : void 0;
        return s2._captureToolCall(t2, r2, a2, i3, l2), e6;
      }, (e6) => {
        throw s2._captureToolCall(t2, r2, a2, { error: e6, errorResult: false }, l2), e6;
      });
      var d2;
      const h2 = _h(u2) ? { error: u2, errorResult: true } : void 0;
      return s2._captureToolCall(t2, r2, a2, h2, l2), u2;
    } }), r2;
  }
  _captureToolCall(e5, t2, i2, s2, r2) {
    const n2 = Date.now() - i2.getTime();
    let o2;
    for (const l2 of e5.instances) {
      var a2;
      const e6 = ch(l2.config.capture_webmcp);
      if (e6) {
        s2 && !o2 && (o2 = mh(s2.error, s2.errorResult));
        try {
          l2.capture("$mcp_tool_call", ls(ls(ls({ $mcp_source: "posthog_mcp_analytics", $mcp_interface: "webmcp", $mcp_tool_name: t2.name, $mcp_resource_name: t2.name, $mcp_tool_description: t2.description, $mcp_server_name: null == Ke ? void 0 : Ke.hostname, $mcp_duration_ms: n2, $mcp_is_error: !!s2 }, o2 ? { $mcp_error_type: o2.type, $mcp_error_message: o2.message } : {}), e6.intent && r2.intent ? { $mcp_intent: r2.intent, $mcp_intent_source: "context_parameter" } : {}), e6.model && r2.model ? { $mcp_llm_model: r2.model, $mcp_llm_model_source: "self_reported" } : {}), { timestamp: i2 });
        } catch (e7) {
          continue;
        }
        if (s2 && o2 && l2.exceptions && (null === (a2 = l2.exceptionObserver) || void 0 === a2 ? void 0 : a2.isEnabled)) try {
          const e7 = { $exception_list: vh(l2.exceptions, s2, o2.message), $exception_level: "error", $exception_source: "mcp.tool_call", $mcp_interface: "webmcp", $mcp_tool_name: t2.name, $mcp_resource_name: t2.name, $mcp_tool_description: t2.description, $mcp_server_name: null == Ke ? void 0 : Ke.hostname };
          l2.exceptionObserver.captureException(e7);
        } catch (e7) {
        }
      }
    }
  }
} };
Bu.__defaultExtensionClasses = ls({}, ls(ls(ls(ls(ls(ls(ls(ls(ls(ls(ls(ls(ls(ls({}, yh), bh), Sh), wh), Eh), Ch), xh), kh), Ph), Ih), Fh), Th), Rh), $h));
var Ah = (function() {
  i.SDK_DIST_CHANNEL = "npm";
  const e5 = mu[$u] = new Bu();
  return (function() {
    function e6() {
      e6.done || (e6.done = true, Ec = false, Rn(mu, function(e7) {
        e7._dom_loaded();
      }));
    }
    (null == Ge ? void 0 : Ge.addEventListener) ? "complete" === Ge.readyState ? e6() : Bn(Ge, "DOMContentLoaded", e6, { capture: false }) : je && In.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
  })(), e5;
})();

// web/analytics.ts
var scope = new URL("../", import.meta.url);
var allowed = /* @__PURE__ */ new Set(["$pageview", "$pageleave", "slopbuzz_demo_run", "slopbuzz_api_request"]);
var local = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
function cleanUrl(value) {
  try {
    const u2 = new URL(String(value));
    return u2.origin + u2.pathname;
  } catch {
    return "";
  }
}
async function initialize() {
  const response = await fetch(new URL("analytics-config.json", scope));
  if (!response.ok) return;
  const config = await response.json();
  if (!config.enabled || !config.token || local && !config.allowLocal) return;
  const pageUrl = new URL(location.href);
  let active = false;
  const properties = { application: "slopbuzz", environment: local ? "preview" : config.environment, release: config.revision, $current_url: cleanUrl(location.href), $pathname: location.pathname, $referrer: document.referrer ? new URL(document.referrer).origin : "", $referring_domain: document.referrer ? new URL(document.referrer).hostname : "$direct", ...Object.fromEntries(["utm_source", "utm_medium", "utm_campaign"].filter((k2) => pageUrl.searchParams.has(k2)).map((k2) => [k2, pageUrl.searchParams.get(k2).slice(0, 150)])) };
  Ah.init(config.token, {
    api_host: new URL(config.apiHost || "https://us.i.posthog.com", scope).href.replace(/\/$/, ""),
    ui_host: "https://us.posthog.com",
    cookieless_mode: "always",
    person_profiles: "never",
    respect_dnt: false,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    disable_surveys: true,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_performance: false,
    advanced_disable_flags: true,
    disable_external_dependency_loading: true,
    persistence: "memory",
    disable_persistence: true,
    request_batching: false,
    before_send: (event) => {
      if (!event || !allowed.has(event.event) || !navigator.onLine) return null;
      for (const key of Object.keys(event.properties)) {
        if (/url|referrer/i.test(key) && typeof event.properties[key] === "string") event.properties[key] = cleanUrl(event.properties[key]);
        if (/initial|search|hash|title/.test(key)) delete event.properties[key];
      }
      return event;
    }
  });
  function capture(name, extra = {}) {
    if (navigator.onLine) Ah.capture(name, { ...properties, ...extra });
  }
  const enter = () => {
    if (!active) {
      active = true;
      capture("$pageview");
    }
  };
  const leave = () => {
    if (active) {
      active = false;
      capture("$pageleave");
    }
  };
  enter();
  window.addEventListener("pagehide", leave);
  window.addEventListener("pageshow", (e5) => {
    if (e5.persisted) enter();
  });
  window.addEventListener("slopbuzz:usage", (event) => {
    const d2 = event.detail;
    if (!["slopbuzz_demo_run", "slopbuzz_api_request"].includes(d2.event)) return;
    capture(d2.event, { outcome: d2.outcome, runtime_mode: d2.runtime_mode, duration_ms: Math.max(0, Math.round(d2.duration_ms)), status: d2.status, endpoint: d2.endpoint?.split(/[?#]/)[0], method: d2.method, cache_outcome: d2.cache_outcome });
  });
}
void initialize().catch((e5) => console.warn("Analytics initialization unavailable", e5));
