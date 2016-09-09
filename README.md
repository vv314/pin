# pin
将元素定于页面某个位置


## Options

| field|  type |    default|   desc|
| :-------- |:--------:| --------:| :------: |
| target    |  Object |  null  |  目标元素  |
| offset    |  Number|  0   | 偏移量|
| contextEle    | DOM |  document|  依赖元素|
| hackModel    |  Boolean |  false|  Hack模式|

## Usage
依赖于zepto或jQuery，支持AMD规范，页面引入pin.js及pin.css样式
```
<link rel="stylesheet" href="css/pin.css"/>
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
target参数支持数组形式，以传入多个元素
```javascript
Pin.bind({
  target: ['#ele_1', '#ele_2', ...]
});
```

多个元素同样可以使用对象形式指定offset参数
```javascript
Pin.bind({
  target: [{target: '#ele_1', offset: 40}, {target: '#ele_2', offset: 50}, ...]
});
```

### 重新绑定
如果target元素在交互过程中被重新绘制（常发生于模板局部刷新）。可使用rebind方法重新绑定指定元素
```javascript
Pin.rebind({
  target: '#ele_1',
  offset: 40
});
```

### 依赖元素
可以通过contextEle参数指定依赖的DOM元素，当依赖元素加载就绪后才会执行初始化，常见于target上方存在图片的情况
```javascript
Pin.bind({
  target: '#ele',
  offset: 50,
  contextEle: $('.swiper-slide img')[0]
});
```

### Hack模式*
pin监听浏览器的onscroll事件事先元素滚动固定。但在一些移动端浏览器上（如微信），浏览器开发者为了使页面性能更为流畅，在页面滚动过程中，不会触发onscroll事件，只有当页面结束滚动时才会触发，可以使用hack参数强制在页面滚动过程中实时响应变化。
**注意：开启此模式会导致页面性能下降，无特殊需求，不建议开启**
```javascript
Pin.bind({
  target: '#ele',
  offset: 40,
  hackModel: true
});
```

