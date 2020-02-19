import React, { useEffect } from 'react';
import styles from './TablePage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { PlusCircleOutlined, ExportOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

import {
  Table,
  Divider,
  Card,
  Spin,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Tree,
  Cascader,
  Breadcrumb
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;

export interface TablePageProps {
  api?:string;
  content:{
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      table:{
        title:string,
        columns:any,
        dataSource:any,
        disableCreateButton:any,
        disableExport:any,
        disableActions:any,
        disableSearch:any,
        disableAdvancedSearch:any
      }
    }
  };
  routes:any;
  searchExpand:boolean;
  loading:boolean;
  dispatch:Dispatch<any>;
}

const TablePage: React.SFC<TablePageProps> = props => {

  const {
    api,
    content,
    routes,
    searchExpand,
    loading,
    dispatch
  } = props;

  const [form] = Form.useForm();

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'table/info',
      payload: {
        actionUrl: api,
      }
    });
  }, [dispatch, api]);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values:any) => {
    dispatch({
      type: 'table/submit',
      payload: {
        actionUrl: content.body.table.action,
        ...values
      }
    });
  };

  const onToggle = (values:any) => {
    dispatch({
      type: 'table/searchExpand',
      payload: {
        searchExpand : !searchExpand
      }
    });
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
      <PageHeaderWrapper
        title={content ? content.title : false}
        subTitle={content.subTitle}
        content={content.description}
        breadcrumb={{routes}}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <Row justify="start">
              <Col span={12}>
                <h5 className={styles.title}>{content.body.table.title}</h5>
              </Col>
              <Col span={12}>
                <div className={styles.right}>
                  {!content.body.table.disableCreateButton ? 
                    <Button type="primary" icon={<PlusCircleOutlined />}>
                      新增
                    </Button>
                  : null}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {!content.body.table.disableExport ? 
                    <Button icon={<ExportOutlined />}>
                      导出
                    </Button>
                  : null}
                </div>
              </Col>
            </Row>
          </div>
          <Divider style={{ marginBottom: 10,marginTop: 10 }} />
          <div className={styles.toolbar}>
            <Row justify="start">
              <Col span={8}>
              {!content.body.table.disableActions ?
                <span>
                  <Button type="primary">
                    启用
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button>
                    禁用
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="primary" danger>
                    删除
                  </Button>
                </span>
              : null}
              </Col>
              <Col span={16}>
              {!content.body.table.disableSearch && !content.body.table.disableAdvancedSearch ?
                <div className={styles.right}>
                  <Form layout="inline">
                    <Form.Item>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button>
                        搜索
                      </Button>
                      <a type="link" style={{ fontSize: 12,marginLeft:15 }} onClick={onToggle}>
                        高级搜索 {searchExpand ? <UpOutlined /> : <DownOutlined />}
                      </a>
                    </Form.Item>
                  </Form>
                </div>
              : null}
              {!content.body.table.disableSearch && content.body.table.disableAdvancedSearch ?
                <div className={styles.right}>
                  <Form layout="inline">
                    <Form.Item>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button>
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              : null}
              </Col>
            </Row>
          </div>
          <div
            className={styles.advancedSearch}
            style={{ display: searchExpand ? 'block' : 'none'}}
          >
            <Row>
              <Col span={24}>
                <Form layout="inline">
                  <Form.Item>
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button>搜索</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div>
            <Table
              columns={content.body.table.columns}
              dataSource={content.body.table.dataSource}
            />
          </div>
        </div>
      </PageHeaderWrapper>
      : null}
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    searchExpand,
    loading,
  } = state.table;

  return {
    content,
    routes,
    searchExpand,
    loading,
  };
}

export default connect(mapStateToProps)(TablePage);