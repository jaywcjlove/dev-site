import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import GitHubCorners from '@uiw/react-github-corners';
import Footer from './component/Footer';
import source from './document.json';
import { github, zhHans, website } from './component/Icons';
import './App.scss';

const initStar = JSON.parse(localStorage.getItem('osc-doc-star'));
const initTag = JSON.parse(localStorage.getItem('osc-doc-tag'));

function useData() {
  const [lists] = useState(source || []);
  const [star, setStar] = useState(initStar || []);
  const [tag, setTag] = useState(initTag || 'all');
  const [query, setQuery] = useState('');
  const [subMenu] = useState([
    { title: '我的收藏', tag: '__star__' },
    { title: '全部', tag: 'all' },
    { title: '前端', tag: '前端' },
    { title: '后端', tag: '后端' },
    { title: '工具', tag: '工具库' },
  ]);

  useEffect(() => {
    const docs = localStorage.getItem('osc-doc');
    if (!docs) {
      localStorage.setItem('osc-doc', JSON.stringify(source));
    }
  }, []);

  const changeTag = (str) => {
    setTag(str);
    setQuery('');
    localStorage.setItem('osc-doc-tag', JSON.stringify(str));
  }

  const addStar = (title) => {
    const arr = [...star];
    arr.indexOf(title) === -1 ? arr.push(title) : arr.splice(arr.indexOf(title), 1);
    setStar(arr);
    localStorage.setItem('osc-doc-star', JSON.stringify(arr));
  }

  const getFilterLists = () => !query ? lists : lists.filter(item => item.title.toLowerCase().indexOf(query.toLowerCase()) > -1);

  return { lists, star, setStar, tag, setTag, query, setQuery, subMenu, changeTag, addStar, getFilterLists };
}

export default function App() {
  const { star, tag, setQuery, subMenu, changeTag, getFilterLists, addStar } = useData();
  return (
    <div className="warpper">
      <GitHubCorners fixed position="left" size={62} zIndex={1000} href="https://github.com/jaywcjlove/dev-site" target="__blank" />
      <div className="header">
        <span className="title">开发文档</span>
        {tag === 'all' && <input placeholder="输入搜索内容" className="search" onChange={(e) => setQuery(e.target.value)} />}
        <div className="tag">
          {subMenu.map((item, idx) => {
            return (
              <span
                className={classNames({
                  active: tag === item.tag,
                })}
                key={idx}
                onClick={() => changeTag(item.tag)}
              >
                {item.title}
              </span>
            );
          })}
        </div>
      </div>
      {star.length === 0 && tag === '__star__' && <div className="noFind">还没有收藏，赶紧去收藏吧</div>}
        <ul className="lists">
          {getFilterLists().map((item, idx) => {
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
                  <a key={key} target="_blank" rel="noreferrer" title={title} href={item.urls[key]}>
                    {icon}
                  </a>
                );
              }
            }
            const isTag = item.tags.filter(t => t === tag);
            const isStar = star.filter(t => t === item.title);
            if (tag === 'all' || (tag === '__star__' && isStar.length > 0) || isTag.length > 0) {
              return (
                <li key={idx}>
                  <a className="itemHeader" target="_blank" rel="noreferrer" href={item.website}>
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
                        active: star.indexOf(item.title) > -1,
                      })}
                      onClick={() => addStar(item.title)}
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
