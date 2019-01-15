import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Clock from './clock';
import stopWatch from './stopwatch';
import Log from '../containers/print';
import Hello from '../containers/hello';
import Pixi from '../components/pixi';
import RequestView from '../components/fetch/requestview';
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
                        <Link to="/clock/">显示当前时间</Link>
                    </li>
                    <li>
                        <Link to="/addDelete/">增减感叹号</Link>
                    </li>
                    <li>
                        <Link to="/stopWatch/">秒表</Link>
                    </li>
                    <li>
                        <Link to="/pixi/">pixi</Link>
                    </li>
                    <li>
                        <Link to="/netRequest/">网络请求</Link>
                    </li>
                </ul>
            </nav>
        </div>
            </Sider>
            <Content>
            <Route path="/clock/" component={Clock} />
            <Route path="/addDelete/" component={Hello} />
            <Route path="/stopWatch/" component={stopWatch} />
            <Route path="/pixi/" component={Pixi} />
            <Route path="/netRequest/" component={RequestView} />
            </Content>
          </Layout>
          <Footer><Log enthusiasmLevel={1} name={'asd'}/></Footer>
        </Layout>
    </Router>
);

export default AppRouter;