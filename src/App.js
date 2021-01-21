import React, { Component } from 'react';
import classNames from 'classnames';
import GitHubCorners from '@uiw/react-github-corners';
import Footer from './component/Footer';
import source from './document.json';
import { github, zhHans, website } from './component/Icons';
import './App.scss';


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
        <GitHubCorners fixed position="left" zIndex={1000} href="https://github.com/jaywcjlove/dev-site" target="__blank" />
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
                if (/^git/.test(key)) {
                  icon = github;
                  title = 'Git 仓库';
                } else if (/^cn/.test(key)) {
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
