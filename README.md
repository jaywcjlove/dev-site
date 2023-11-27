
<div align="center">
  <a href="https://jaywcjlove.github.io/dev-site">
    <img src="https://raw.githubusercontent.com/jaywcjlove/dev-site/master/home.png">
  </a>
  <h1>开发者文档网站导航</h1>
</div>

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor) 

开发者文档网站导航 https://jaywcjlove.github.io/dev-site ，主要搜集各类编程语言，各种开发工具的开发文档，网站支持收藏，可以将常用文档网站收藏起来，在我的收藏快捷打开网站。

## 提交数据

可通过 [Issue](https://github.com/jaywcjlove/dev-site/issues) 告诉我，或者提交一个 `Pull requests`，增加没有收录的文档网站，提交 `Pull requests` 的时候注意，将图片放入 `public/icons` 目录中，对应网站其它信息在 [src/document.json](./src/document.json) 中添加，欢迎提交文档网站。

## Chrome插件

[![Chrome插件oscnews](http://jaywcjlove.github.io/sb/download/chrome-web-store.svg)](https://chrome.google.com/webstore/detail/oscnews/iheapfheanfjcemgneblljhaebonakbg)

可以通过 Chrome 插件 [oscnews](https://github.com/jaywcjlove/oscnews) 来使用开发者文档导航网站，上面链接是 Chrome 链接下载地址，也可以下载 [crx](https://github.com/jaywcjlove/oscnews/releases) 文件来安装插件。

## 数据使用

```
npm i dev-site
```

```js
import data from 'dev-site';
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/dev-site/graphs/contributors">
  <img src="https://jaywcjlove.github.io/dev-site/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
