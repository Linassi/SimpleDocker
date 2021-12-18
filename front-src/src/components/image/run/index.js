import React from 'react'
import {Form, Input, Steps, Tag, List, Space, Table} from "antd";
import {
    TagOutlined,
    PieChartOutlined,
    ExperimentOutlined
} from "@ant-design/icons";
import bytesToSize from "../../../utils/ByteSize";
import dateToStr from "../../../utils/time";
import _ from 'lodash'
import {getImage} from "../../../api/ImageApi";
import './index.css'

const {Step} = Steps;


class RunNewContainerStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageId: this.props.imageId,
            current: 0,
            image: {},
            envList: [],
            volumeConfig: []
        }
        this.envListColumn = [
            {
                title: '环境的键',
                dataIndex: 'key',
                key: 'envKey',
            },
            {
                title: '环境变量',
                dataIndex: 'value',
                key: 'envValue'
            }]
        this.getImageInfo()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({envList: [], current: 0, imageId: this.nextProps.imageId,})
        this.getImageInfo()
    }

    getImageInfo = () => {
        getImage(this.state.imageId).then(resp => {
            let image = resp.data
            let envList = _.get(image, "Config.Env", '[]')
            let tmpEnv = []

            if (!envList) {
                envList = []
            }
            for (let env of envList) {
                let envKey = env.split("=")
                tmpEnv = [...tmpEnv, {key: envKey[0], value: envKey[1]}]
            }
            this.setState({envList: tmpEnv, image})
        })
    }


    showComponent = (index) => {
        return this.state.current === index ? 'block' : 'none'
    }

    render() {
        let Id = this.state.imageId
        let {image} = this.state;
        let {Created, Size,} = image;
        let Labels = _.get(image, "Labels", [])
        let maintainer = _.get(image, "Config.Labels.maintainer", '')
        let architecture = _.get(image, "Architecture", '')
        let os = _.get(image, "Os", '')
        let RepoTags = _.get(image, "RepoTags", [])
        let tagList = RepoTags.map(tag =>
            <Tag color="success" className="imageTag" icon={<TagOutlined/>} key={Id + '-' + tag}>{tag}</Tag>
        )

        tagList = [
            <Tag color="processing" className="imageTag" icon={<ExperimentOutlined/>}
                 key='architecture'>{os + '/' + architecture}</Tag>,
            <Tag color="error" className="imageTag" icon={<PieChartOutlined/>}
                 key='size'>{bytesToSize(Size)}</Tag>,
            ...tagList
        ]

        return (
            <div>
                <Steps current={this.state.current}
                       onChange={(current) => this.setState({current})} style={{padding: 20}} size="small">
                    <Step title="基础信息"/>
                    <Step title="存储配置"/>
                    <Step title="网络配置"/>
                    <Step title="环境变量"/>
                    <Step title="创建容器"/>
                </Steps>
                <div style={{padding: 10}}>
                    <div id="baseInfo" style={{display: this.showComponent(0)}}>
                        <Form>
                            <Form.Item label="镜像标识">
                                {tagList}
                            </Form.Item>

                            <Form.Item label="镜像标签">
                                <Input value={Id} disabled/>
                            </Form.Item>


                            <Form.Item label="发布时间">
                                <Input value={image.Created} disabled/>
                            </Form.Item>


                            <Form.Item label="维护人员">
                                <Input value={maintainer} disabled/>
                            </Form.Item>

                            {/*暂不支持的特性，后续支持*/}
                            {/*<Form.Item label="CPU使用">*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}


                            {/*<Form.Item label="内存使用">*/}
                            {/*    <Input />*/}
                            {/*</Form.Item>*/}


                        </Form>
                    </div>

                    <div id="volumeInfo" style={{display: this.showComponent(1)}}>
                        
                    </div>

                    <div id="netInfo" style={{display: this.showComponent(2)}}>
                        <Form>
                            <Form.Item label="主机名">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="DNS">
                                <Input/>
                            </Form.Item>


                            <Form.Item label="CPU使用">
                                <Input/>
                            </Form.Item>


                            <Form.Item label="内存使用">
                                <Input/>
                            </Form.Item>

                            <Form.Item label="容器别名">
                                <Input/>
                            </Form.Item>
                        </Form>
                    </div>

                    <div id="envInfo" style={{display: this.showComponent(3)}}>
                        <Table columns={this.envListColumn} dataSource={this.state.envList} size="small"/>
                    </div>

                    <div id="createInfo" style={{display: this.showComponent(4)}}>
                        <Form>
                            <Form.Item label="容器别名">
                                <Input/>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RunNewContainerStep;
