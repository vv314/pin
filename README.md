# pin

[Demo](https://vv314.github.io/pin/demo.html)

>>>>>>> master
将元素定于页面某个位置，已经存在成熟的同名插件[jquery.pin](https://github.com/webpop/jquery.pin)，
此项目的目的是为了方便多元素操作，以及图片加载过程中获取目标元素初始位置异常的问题。
提供`rebind`方法解决个别元素DOM更新，绑定失效问题。


## Options

| field|  type |    default|   desc|
| :-------- |:--------:| --------:| :------: |
| target    |  Object |  null  |  目标元素  |
| offset    |  Number|  0   | 偏移量|
| contextEle    | DOM |  document|  依赖元素|
| hackModel    |  Boolean |  false|  Hack模式|

## Usage
依赖于zepto或jQuery，兼容`AMD`规范，页面引入pin.js及pin.css样式
```
<link rel="stylesheet" href="css/pin.css">
<script src="pin.js"></script>
```
### 初始化
Pin只有两个API，页面加载就绪后执行bind方法初始化Pin
```javascript
Pin.bind({
  target: '#ele'
});
```

支持配置offset参数指定据窗口顶部距离
```javascript
Pin.bind({
  target: '#ele',
  offset: 50
});
```

### 多个target
`target`参数支持数组形式，以传入多个元素
```javascript
Pin.bind({
  target: ['#ele_1', '#ele_2', ...]
});
```

多个元素同样可以使用对象形式指定`offset`参数
```javascript
Pin.bind({
  target: [{target: '#ele_1', offset: 40}, {target: '#ele_2', offset: 50}, ...]
});
```

### 重新绑定
如果`target`元素在交互过程中被重新绘制（常发生于模板局部刷新）。可使用`rebind`方法重新绑定指定元素
```javascript
Pin.rebind({
  target: '#ele_1',
  offset: 40
});
```

### 依赖元素
可以通过`contextEle`参数指定依赖的`DOM`元素，当依赖元素加载就绪后才会执行初始化，常见于`target`上方存在图片的情况
```javascript
Pin.bind({
  target: '#ele',
  offset: 50,
  contextEle: $('.swiper-slide img')[0]
});
```

### Hack模式*
pin监听浏览器的`onscroll`事件事先元素滚动固定。但在一些移动端浏览器上（如微信），浏览器开发者为了使页面性能更为流畅，在页面滚动过程中，不会触发`onscroll`事件，只有当页面结束滚动时才会触发，可以使用`hackModel`参数强制在页面滚动过程中实时响应变化。
**注意：开启此模式会导致页面性能下降，无特殊需求，不建议开启**
```javascript
Pin.bind({
  target: '#ele',
  offset: 40,
  hackModel: true
});
```

