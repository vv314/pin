define(['zepto'], function($) {
  'use strict';

  var CONFS = [];
  var defaults = {
    target: null,
    contextEle: document,
    offset: 0,
    hackModel: false
  };
  var settings = null;
  var utils = {
    // 判断是否为微信浏览器
    isWeixin: function () {
      return /MicroMessenger/.test(navigator.userAgent);
    },
    isArray: function (a) {
      return Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
    }
  };

  function init(options) {
    settings = $.extend(true, {}, defaults, options);
    initConfig();
  }
  
  /**
   * 生成配置数据
   * @param  {String} target 目标元素id
   * @param  {Number} offset 偏移量
   * @return {Object}        配置数据
   */
  function createConfItem(target, offset) {
    var $target = $(target);
    offset = Number.isNaN(Number(offset))?0:offset;
    var originTop = $target.offset().top - offset;
    var topCache = $target.css('top');
    var width = $target.css('width');
    return {
      $target: $target,
      selector: target,
      offset: offset,
      width: width,
      topCache: topCache,
      originTop: originTop
    };
  }

  /**
   * 多元目标元素配置
   * @param  {[type]} target 目标元素id
   * @return {Array}         配置数据
   */
  function createMutiConfData(target) {
    var configs = [];
    target.forEach(function(item) {
      if(typeof(item)==='string') {
        configs.push(createConfItem(item, settings.offset));
      } else {
        configs.push(createConfItem(item.target, item.offset));             
      }
    });
    return configs;
  }

  function contextReady() {
    var configs = [],
        target = settings.target;
    if(utils.isArray(target)) {
      configs = createMutiConfData(target);
    } else {
      configs.push(createConfItem(target, settings.offset));
    }

    CONFS = configs;
    console.log(CONFS);
    bindScrollEvent();
  }

  /**
   * 初始化配置
   * @param  {Function} cb     回调函数
   */
  function initConfig() {
    var context = settings.contextEle || window;
    context.onload = function() {
      contextReady();
    };
    contextReady();
  }

  function fixedTop(config) {
    config.$target.addClass('pin-fixed-top').css({'top': config.offset+'px', 'width': config.width});
  }

  function removeFixedTop(config) {
    config.$target.removeClass('pin-fixed-top').css('top', config.topCache);
  }

  /**
   * 执行pin操作
   * @param  {Number} scroll 当前滚动距离
   * @param  {Object} config 配置数据
   */
  function pinIt(scroll, config) {
    if(scroll>=config.originTop) {
      fixedTop(config);
    } else {
      removeFixedTop(config);
    }
  }

  /**
   * 获取滚动条滚动距离
   * @return {Number} [description]
   */
  function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  /**
   * 滚动事件处理函数
   */
  function scrollHandleFn(event) {
    event.preventDefault();
    var scroll = getScrollTop();
    CONFS.forEach(function(config) {
      pinIt(scroll, config);
    });
  }

  /**
   * hack微信onscroll实时响应问题
   */
  function hackWechat() {
    if(utils.isWeixin()) {
      $('window').on('touchmove', scrollHandleFn);
    } else {
      window.onscroll = scrollHandleFn;
    }
  }

  /**
   * 绑定scroll事件
   * @param  {Object} configs 配置数据
   */
  function bindScrollEvent() {
    // hack模式，开启可能会导致性能下降
    if(settings.hackModel) {
      hackWechat();
    } else {
      window.onscroll = scrollHandleFn;
    }
  }

  function rebind(targets) {
    var configs = [],
        offset = 0;
    if(utils.isArray(targets)) {
      configs = createMutiConfData(targets);
    } else {
      offset = targets.offset || 0;
      configs.push(createConfItem(targets.target, offset));
    }
    configs.forEach(function(item) {
      mixin(item);
    });

    function mixin(newConf) {
      for(var i=0, len=CONFS.length; i<len; i++) {
        if(CONFS[i].selector === newConf.selector) {
          CONFS[i] = newConf;
          break;
        }
      }
    }

    console.log(CONFS);
  }

  return window.Pin = {
    bind: init,
    rebind: rebind
  };
});