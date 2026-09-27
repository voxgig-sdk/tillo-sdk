import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        debug: {
            options: {
                active: boolean;
                max: number;
                redact: string[];
            };
            optspec: {
                now: string;
                onEntry: string;
            };
            strict: boolean;
            transport: string;
        };
        idempotency: {
            options: {
                active: boolean;
                header: string;
                methods: string[];
                ops: string[];
            };
            optspec: {
                keygen: string;
            };
            strict: boolean;
            transport: string;
        };
        metrics: {
            options: {
                active: boolean;
            };
            optspec: {
                now: string;
            };
            strict: boolean;
            transport: string;
        };
        paging: {
            options: {
                active: boolean;
                afterVar: string;
                cursorParam: string;
                firstVar: string;
                limitParam: string;
                pageParam: string;
                startPage: number;
            };
            optspec: {
                limit: string;
                ops: string;
            };
            strict: boolean;
            transport: string;
        };
        ratelimit: {
            options: {
                active: boolean;
                burst: number;
                rate: number;
            };
            optspec: {
                now: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        retry: {
            options: {
                active: boolean;
                factor: number;
                maxDelay: number;
                minDelay: number;
                retries: number;
                statuses: number[];
            };
            optspec: {
                jitter: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
        timeout: {
            options: {
                active: boolean;
                ms: number;
            };
            optspec: {
                clearTimer: string;
                setTimer: string;
            };
            strict: boolean;
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
            name: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            brand: {};
            brand_template: {};
            digital_gift_card: {};
            digital_issue_delete: {};
            digital_issue_post: {};
            digital_order_card: {};
            digital_order_status: {};
            digital_top_up_post: {};
            float: {};
            physical_gift_card: {};
            physical_order_card: {};
            physical_order_status: {};
            promotion: {};
            template: {};
        };
    };
    entity: {
        brand: {
            fields: ({
                name: string;
                title: string;
                type: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                format: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: boolean;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        brand_template: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: ({
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                reqd: boolean;
                                example: string;
                            } | {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                                reqd?: undefined;
                            })[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_gift_card: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req?: undefined;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_issue_delete: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_issue_post: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_order_card: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_order_status: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        digital_top_up_post: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                op?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    create: {
                        type: string;
                    };
                };
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                op?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                op?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    create: {
                        type: string;
                    };
                };
                short: string;
                format: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        float: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: {
                                float: string;
                            };
                            res: string;
                        };
                        args: {};
                        select: {
                            $action: string;
                        };
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            $action: string;
                            exist: string[];
                        };
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        physical_gift_card: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                op?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                op: {
                    create: {
                        type: string;
                    };
                };
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                op?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
                op?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                op?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        physical_order_card: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                format: string;
                req?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                title: string;
                type: string;
                short: string;
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        physical_order_status: {
            fields: {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        promotion: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {};
                        select: {};
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        template: {
            fields: ({
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format: string;
            } | {
                name: string;
                title: string;
                type: string;
                req: boolean;
                short: string;
                format?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        parts: string[];
                        rename: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        args: {
                            query: {
                                name: string;
                                orig: string;
                                type: string;
                                kind: string;
                                example: string;
                            }[];
                        };
                        select: {
                            exist: string[];
                        };
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
