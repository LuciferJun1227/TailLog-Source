import React from "react";
import {connect} from "react-redux";
import {Button, Col, Icon, Layout, Menu, message, Row, Tooltip} from "antd";
import AjaxAction from "../../actions/AjaxAction";
import Setting from "../Setting";
const {Header} = Layout;


class ConfigHeader extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    logout = () => {
        const {dispatch, router} = this.props;
        dispatch(AjaxAction.logout()).then((data) => {
            if (data.result) {
                router.push('/');
            }
        });
    };

    terminal = () => {
        const {router} = this.props;
        router.push('term');
    };

    handleClick = (e) => {
        const {router} = this.props;
        router.push(e.key);
    };
    prompt = (level, msg) => {
        ['info', 'error', 'warning'].indexOf(level) > -1 && message[level](msg);
    };

    render() {
        const {router} = this.props;
        const {location} = router;
        let {pathname} = location;
        pathname = pathname.replace('/', '');
        return (
            <Header className={'layout-header'}>
                <Row>
                    <Col span={1}/>
                    <Col span={12}>
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['config']}
                            selectedKeys={[pathname]}
                            style={{background: "#343842", borderBottom: "#343842"}}
                            mode="horizontal"
                        >
                            <Menu.Item key="config" style={{background: "#343842", padding: "0 10px"}}>

                                <Icon type="home"
                                      style={{fontSize: 12, marginRight: 2, color: "#94a5e3", marginTop: 8}}/><span
                                style={{color: "#94a5e3"}}> 日志管理</span>

                            </Menu.Item>
                            <Menu.Item key="ssh" style={{background: "#343842", padding: "0 10px"}}>

                                <Icon type="compass"
                                      style={{fontSize: 12, marginRight: 2, color: "#94a5e3", marginTop: 8}}/><span
                                style={{color: "#94a5e3"}}> SSH配置</span>

                            </Menu.Item>
                            <Menu.Item key="agent" style={{background: "#343842", padding: "0 10px"}}>

                                <Icon type="global"
                                      style={{fontSize: 12, marginRight: 2, color: "#94a5e3", marginTop: 8}}/><span
                                style={{color: "#94a5e3"}}> 代理配置</span>

                            </Menu.Item>
                            <Menu.Item key="group" style={{background: "#343842", padding: "0 10px"}}>

                                <Icon type="folder"
                                      style={{fontSize: 12, marginRight: 2, color: "#94a5e3", marginTop: 8}}/><span
                                style={{color: "#94a5e3"}}> 分组管理</span>

                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8}/>
                    <Col span={1}>
                        <Tooltip title="命令行工具" placement="left">
                            <Button type="primary" size="small" shape="circle" onClick={this.terminal}>
                                <i className="fa fa-code"/>
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col span={1}>
                        <Tooltip title="上传日志" placement="left">
                            <Button type="primary" size="small" shape="circle" icon="upload" onClick={() => {
                                this.prompt("warning", "开发中,暂未开放");
                            }}/>
                        </Tooltip>
                    </Col>
                    <Col span={1}>
                        <Setting {...this.props}/>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default connect((state) => ({}))(ConfigHeader);
