# pin
将元素定于页面某个位置

## Usage
依赖于zepto或jQuery，支持AMD规范，页面引入pin.js及pin.css样式
```
<link rel="stylesheet" href="css/pin.css"/>
<script src="pin.js"></script>
```

待页面加载就绪后执行绑定方法初始化pin
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

如果target元素在交互过程中被重新绘制（常发生于模板局部刷新）。可使用rebind方法重新绑定指定元素
```javascript
Pin.rebind({
  target: '#ele',
  hackModel: true
});
```