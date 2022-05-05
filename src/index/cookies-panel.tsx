import React, { useEffect, useRef, useState } from 'react';
import CookiesImpl from '@/chrome/cookies';
import {
    Button,
    Col,
    Input,
    InputRef,
    Popconfirm,
    Popover,
    Row,
    Table
} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    getChromeTabURL,
    showErrorMessage,
    showSuccessMessage
} from '@/common/utils';
import { CheckOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import storage from '../common/storage';
import './cookies.module.less';
import styles from './cookies.module.less';

/**
 * cookies
 * @returns
 */
function CookiesPanel() {
    // 从storage里读上次
    const [domain, setDomain] = useState<string>(
        storage.use_current_tab ? '' : storage.domain
    );

    const [message, setMessage] = useState<string>(
        storage.use_current_tab ? '' : storage.message
    );

    const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);

    const [cookies_for_show, setCookiesForShow] = useState<
        chrome.cookies.Cookie[]
    >([]);

    const input_ref = React.useRef<InputRef>(null);

    const [edit_index, setEditIndex] = useState<number>();

    const [input, setInput] = useState<string>('');

    const cookies_instance = useRef<CookiesImpl>(new CookiesImpl());

    /**
     * init
     */
    const init = async () => {
        let cookies: chrome.cookies.Cookie[] = [];
        if (storage.use_current_tab) {
            const url = await getChromeTabURL();

            // const path = 'wuba.xinghuo.58.com';

            cookies = await cookies_instance.current.getCookies(
                url ? url.href : undefined
            );
        } else {
            cookies = await cookies_instance.current.getCookies();
        }
        setCookies(cookies);
    };

    /**
     * search
     * @param url
     */
    const onSearch = (key1: string, key2: string) => {
        const cookies_for_show = cookies.filter((c) => {
            const search_key = JSON.stringify(c).toLowerCase();

            return (
                c.domain.toLowerCase().includes(key1.toLowerCase()) &&
                search_key.includes(key2.toLowerCase())
            );
        });

        setCookiesForShow(cookies_for_show);
    };

    /**
     *
     * @param record
     * @param value
     */
    const resetCookies = (record: any, value: string) => {
        cookies_instance.current.setCookies(record, value);
        const current_key = JSON.stringify(record);

        setCookies(
            cookies.map((c) => {
                const search_key = JSON.stringify(c);
                if (search_key === current_key) {
                    c.value = value;
                }
                return c;
            })
        );

        setCookiesForShow(
            cookies_for_show.map((c) => {
                const search_key = JSON.stringify(c);
                if (search_key === current_key) {
                    c.value = value;
                }
                return c;
            })
        );
    };

    /**
     * 删除
     * @param record
     */
    const removeCookies = (record: any) => {
        cookies_instance.current.deleteCookie(record);

        const current_key = JSON.stringify(record);

        setCookies(
            cookies.filter((c) => {
                const search_key = JSON.stringify(c);
                return search_key != current_key;
            })
        );

        setCookiesForShow(
            cookies_for_show.filter((c) => {
                const search_key = JSON.stringify(c);
                return search_key != current_key;
            })
        );

        showSuccessMessage(`${record.domain}:${record.name} 删除成功!`);
    };

    /**
     * trigger
     */
    useEffect(() => {
        setEditIndex(undefined);
        setInput('');
        onSearch(domain, message);
    }, [cookies, domain, message]);

    /**
     * init
     */
    useEffect(() => {
        init();
    }, []);

    const columns: ColumnsType<chrome.cookies.Cookie> = [
        {
            title: 'Action',
            key: 'action',
            width: 80,
            align: 'center',
            render: (_: any, record: any) => {
                return (
                    <Button
                        type='link'
                        onClick={() => {
                            removeCookies(record);
                        }}
                    >
                        <DeleteOutlined />
                    </Button>
                    // <Popconfirm
                    //     placement='topRight'
                    //     title={`确认删除${record.domain}:${record.name}吗？删除后不可恢复！`}
                    //     onConfirm={() => {
                    //         removeCookies(record);
                    //     }}
                    //     okText='确定'
                    //     cancelText='取消'
                    // >
                    //     <Button type='link'>
                    //         <DeleteOutlined />
                    //     </Button>
                    // </Popconfirm>
                );
            }
        },
        {
            title: 'domain',
            dataIndex: 'domain',
            // fixed: 'left',
            width: 130,
            render: (text: any) => <span>{text}</span>,
            sorter: {
                compare: (a, b) => (a.domain > b.domain ? 1 : -1),
                multiple: 1
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: 130,
            render: (text: any) => <span>{text}</span>,
            sorter: {
                compare: (a, b) => (a.name > b.name ? 1 : -1),
                multiple: 2
            }
        },
        {
            title: 'value',
            dataIndex: 'value',
            sorter: {
                compare: (a, b) => (a.value > b.value ? 1 : -1),
                multiple: 3
            },
            render: (text: any, record: any, index: number) => {
                return (
                    <div
                        style={{
                            wordBreak: 'break-all',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <CopyToClipboard
                            text={text}
                            onCopy={(text, result) => {
                                result
                                    ? showSuccessMessage(
                                          `${record.domain}:${record.name} 复制成功!`
                                      )
                                    : showErrorMessage('复制失败，请重试。');
                            }}
                        >
                            <Button size='small' type='link'>
                                <CopyOutlined />
                            </Button>
                        </CopyToClipboard>
                        <div
                            onClick={() => {
                                if (edit_index !== index) {
                                    setEditIndex(index);
                                    setInput(text);
                                    setTimeout(() => {
                                        input_ref.current!.focus({
                                            cursor: 'all'
                                        });
                                    }, 0);
                                }
                            }}
                            style={{ display: 'inline-block', flex: 1 }}
                        >
                            {edit_index !== index ? (
                                <div
                                    style={{
                                        minHeight: '24px'
                                    }}
                                >
                                    {text}
                                </div>
                            ) : (
                                <Input.TextArea
                                    onBlur={() => {
                                        setEditIndex(undefined);
                                        setInput('');
                                        resetCookies(record, input);
                                    }}
                                    ref={input_ref}
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                    }}
                                ></Input.TextArea>
                            )}
                        </div>
                    </div>
                );
            }
        },
        {
            title: `expirationDate（时区：${
                -new Date().getTimezoneOffset() / 60
            }h）`,
            dataIndex: 'expirationDate',
            width: 240,
            render: (text: any, record: any) => {
                return (
                    <span>
                        {record.session ? (
                            '会话'
                        ) : (
                            <Popover
                                trigger='hover'
                                content={
                                    <div>
                                        <span>
                                            标准时间：
                                            {new Date(
                                                text * 1000
                                            ).toISOString()}
                                        </span>
                                        <br />
                                        <span>
                                            本地时间：
                                            {new Date(
                                                text * 1000
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                }
                            >
                                {new Date(text * 1000).toISOString()}
                            </Popover>
                        )}
                    </span>
                );
            }
        },
        {
            title: 'httpOnly',
            dataIndex: 'httpOnly',
            width: 80,
            align: 'center',
            render: (text: any) => {
                return text ? <CheckOutlined /> : <></>;
            }
        },
        {
            title: 'sameSite',
            dataIndex: 'sameSite',
            width: 100,
            render: (text: any) => {
                switch (text) {
                    case 'no_restriction':
                        return 'None';
                    case 'lax':
                        return 'Lax';
                    case 'unspecified':
                        return <></>;
                    default:
                        return text;
                }
            }
        },
        {
            title: 'secure',
            dataIndex: 'secure',
            width: 80,
            align: 'center',
            render: (text: any) => {
                return text ? <CheckOutlined /> : <></>;
            }
        }
    ];

    return (
        <div className={styles['cookies-panel']}>
            <Row gutter={8} className={styles['search-button']}>
                <Col span={8}>
                    <Input
                        value={domain}
                        placeholder='搜索domain信息'
                        onChange={(e) => {
                            storage.domain = e.target.value;
                            setDomain(e.target.value);
                        }}
                        allowClear
                    />
                </Col>
                <Col span={16}>
                    <Input
                        value={message}
                        placeholder='搜索cookies信息'
                        onChange={(e) => {
                            storage.message = e.target.value;
                            setMessage(e.target.value);
                        }}
                        allowClear
                    />
                </Col>
            </Row>

            <Table
                bordered
                scroll={{ scrollToFirstRowOnChange: true, x: '250%', y: 382 }}
                columns={columns}
                dataSource={cookies_for_show}
                size='small'
            />
        </div>
    );
}

export default CookiesPanel;
