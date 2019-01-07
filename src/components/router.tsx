import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clock from './clock';
import stopWatch from './stopwatch';
import Home from './home';
import Hello from '../containers/hello';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

const {
    Header, Footer, Sider, Content,
  } = Layout;


const AppRouter = () => (
    <Router>
        <Layout>
          <Header>
            <h1 className="App-title">React学习</h1>
          </Header>
          <Layout>
            <Sider>  
              <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">主页</Link>
                    </li>
                    <li>
                        <Link to="/clock/">显示当前时间</Link>
                    </li>
                    <li>
                        <Link to="/adddelete/">增减感叹号</Link>
                    </li>
                    <li>
                        <Link to="/stopWatch/">秒表</Link>
                    </li>
                </ul>
            </nav>
        </div>
            </Sider>
            <Content>
            <Route path="/" exact={true} component={Home} />
            <Route path="/clock/" component={Clock} />
            <Route path="/adddelete/" component={Hello} />
            <Route path="/stopWatch/" component={stopWatch} />
            </Content>
          </Layout>
          <Footer/>
        </Layout>
    </Router>
);

export default AppRouter;