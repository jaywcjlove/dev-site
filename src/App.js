import React, { Component } from 'react';
import classNames from 'classnames';
import Footer from './component/Footer';
import source from './document.json';
import { github, zhHans, website } from './component/Icons';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    const star = JSON.parse(localStorage.getItem('osc-doc-star'));
    const tag = JSON.parse(localStorage.getItem('osc-doc-tag'));
    this.state = {
      lists: [],
      star: star || [],
      tag: tag || '',
      query: '',
      subMenu: [
        { title: '我的收藏', tag: '__star__' },
        { title: '全部', tag: '' },
        { title: '前端', tag: '前端' },
        { title: '后端', tag: '后端' },
        { title: '工具', tag: '工具库' },
      ],
    };
  }
  componentDidMount() {
    const docs = localStorage.getItem('osc-doc');
    if (!docs) {
      localStorage.setItem('osc-doc', JSON.stringify(source));
    }
    this.setState({
      lists: source,
      query: '',
    });
  }
  onAddStar(title) {
    const { star } = this.state;
    if (star.indexOf(title) === -1) {
      star.push(title);
    } else {
      star.splice(star.indexOf(title), 1);
    }
    this.setState({ star }, () => {
      localStorage.setItem('osc-doc-star', JSON.stringify(star));
    });
  }
  onChangeTag(tag) {
    this.setState({ tag, query: '' }, () => {
      localStorage.setItem('osc-doc-tag', JSON.stringify(tag));
    });
  }
  onSearch(e) {
    const query = e.target.value;
    this.setState({ query });
  }
  getFilterLists() {
    const { query, lists } = this.state;
    return !query ? lists : lists.filter(item => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
  render() {
    const lists = this.getFilterLists();
    return (
      <div className="warpper">
        <a href="https://github.com/jaywcjlove/dev-site" target="_blank" rel="noopener noreferrer" className="github-corner">
          <svg viewBox="0 0 250 250">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: "130px 106px" }} className="octo-arm" />
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" />
          </svg>
        </a>
        <div className="header">
          <span className="title">开发文档</span>
          {!this.state.tag && <input placeholder="输入搜索内容" className="search" onChange={this.onSearch.bind(this)} />}
          <div className="tag">
            {this.state.subMenu.map((item, idx) => {
              return (
                <span
                  className={classNames({
                    active: this.state.tag === item.tag,
                  })}
                  key={idx}
                  onClick={this.onChangeTag.bind(this, item.tag)}
                >
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
        {this.state.star.length === 0 && this.state.tag === '__star__' && <div className="noFind">还没有收藏，赶紧去收藏吧</div>}
        <ul className="lists">
          {lists.map((item, idx) => {
            const urls = [];
            for (const key in item.urls) {
              if (Object.prototype.hasOwnProperty.call(item.urls, key)) {
                let icon = '';
                let title= key
                if (key === 'git') {
                  icon = github;
                  title = 'Git 仓库';
                } else if (key === 'cn') {
                  icon = zhHans;
                  title = '中文网站';
                } else icon = website;
                urls.push(
                  <a key={key} title={title} href={item.urls[key]}>
                    {icon}
                  </a>
                );
              }
            }

            const { tag } = this.state;
            const isTag = item.tags.filter(t => t === tag);
            const isStar = this.state.star.filter(t => t === item.title);

            if (tag === '' || (tag === '__star__' && isStar.length > 0) || isTag.length > 0) {
              return (
                <li key={idx}>
                  <a className="itemHeader" href={item.website}>
                    <div className="logo">
                      {item.title && <h4><span>{item.title}</span></h4>}
                      {item.logo && <img alt={item.title} src={item.logo} />}
                    </div>
                    <div className="details">
                      {item.des}
                    </div>
                  </a>
                  <div className="bottomBar">
                    <div className="urls">{urls}</div>
                    <div
                      className={classNames('star', {
                        active: this.state.star.indexOf(item.title) > -1,
                      })}
                      onClick={this.onAddStar.bind(this, item.title)}
                    >
                      <svg>
                        <use xlinkHref={`./dev.svg#icon-heart`} />
                      </svg>
                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <Footer>
          Copyright © 2018 <a target="_blank" rel="noopener noreferrer" href="https://github.com/jaywcjlove/dev-site">dev-site</a>
        </Footer>
      </div>
    );
  }
}

export default App;
