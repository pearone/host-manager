import React, { useEffect, useRef, useState } from 'react';
import CookiesImpl from '@/common/cookies';
import { Button, Input, Table } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showErrorMessage, showSuccessMessage } from '@/common/utils';
import { CheckOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import './cookies.module.less';
import styles from './cookies.module.less';

const { Search } = Input;

// TODO:
// 可以修改cookies
// 保存搜索词在下一次页面打开时还存在

function CookiesPanel() {
    const [cookies, setCookies] = useState<chrome.cookies.Cookie[]>([]);
    const [cookies_for_show, setCookiesForShow] = useState<
        chrome.cookies.Cookie[]
    >([]);

    const cookies_instance = useRef<CookiesImpl>(new CookiesImpl());

    const getCookies = async () => {
        const cookies = await cookies_instance.current.getCookies();
        setCookies(cookies);
        setCookiesForShow(cookies);
    };

    useEffect(() => {
        getCookies();
    }, []);

    const columns: ColumnsType<chrome.cookies.Cookie> = [
        {
            title: 'domain',
            dataIndex: 'domain',
            // fixed: 'left',
            width: 130,
            render: (text: any) => (
                <span style={{ color: '#1890ff' }}>{text}</span>
            )
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: 130,
            render: (text: any) => <span>{text}</span>
        },
        {
            title: 'value',
            dataIndex: 'value',
            render: (text: any, record: any) => {
                return (
                    <div style={{ wordBreak: 'break-all' }}>
                        <CopyToClipboard
                            text={text}
                            onCopy={(text, result) => {
                                result
                                    ? showSuccessMessage(
                                          `${record.name} value 复制成功!`
                                      )
                                    : showErrorMessage('复制失败，请重试。');
                            }}
                        >
                            <Button size='small' type='link'>
                                <CopyOutlined />
                            </Button>
                        </CopyToClipboard>
                        {text}
                    </div>
                );
            }
        },
        {
            title: 'expirationDate',
            dataIndex: 'expirationDate',
            width: 160
        },
        {
            title: 'httpOnly',
            dataIndex: 'httpOnly',
            width: 80,
            render: (text: any) => {
                return text ?? <CheckOutlined />;
            }
        },
        {
            title: 'sameSite',
            dataIndex: 'sameSite',
            width: 100
        },
        {
            title: 'secure',
            dataIndex: 'secure',
            width: 80,
            render: (text: any) => text.toString()
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            align: 'center',
            render: (_: any, record: any) => (
                <a
                    onClick={() => {
                        cookies_instance.current.deleteCookie(record);
                        const current_key = JSON.stringify(record);
                        const deleted_cookies = cookies.filter((c) => {
                            const search_key = JSON.stringify(c);
                            return search_key != current_key;
                        });
                        const deleted_cookies_for_show =
                            cookies_for_show.filter((c) => {
                                const search_key = JSON.stringify(c);
                                return search_key != current_key;
                            });
                        setCookies(deleted_cookies);
                        setCookiesForShow(deleted_cookies_for_show);
                        showSuccessMessage(`${record.name}删除成功!`);
                    }}
                >
                    <DeleteOutlined />
                </a>
            )
        }
    ];

    const onSearch = (value: string) => {
        const cookies_for_show = cookies.filter((c) => {
            const search_key = JSON.stringify(c);
            return search_key.includes(value);
        });
        setCookiesForShow(cookies_for_show);
    };

    return (
        <div className={styles['cookies-panel']}>
            <div className={styles['search-button']}>
                <Search placeholder='domain' onSearch={onSearch} allowClear />
                <Search
                    placeholder='搜索cookies信息'
                    onSearch={onSearch}
                    allowClear
                />
            </div>

            <Table
                sticky
                scroll={{ scrollToFirstRowOnChange: true, x: '220%', y: 385 }}
                columns={columns}
                dataSource={cookies_for_show}
                size='small'
            />
        </div>
    );
}

export default CookiesPanel;
