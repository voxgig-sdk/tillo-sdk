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
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                format?: undefined;
            } | {
                format: string;
                name: string;
                type: string;
                union?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            } | {
                                example: boolean;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                        args: {
                            query: ({
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            } | {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                req?: undefined;
                format?: undefined;
            } | {
                name: string;
                type: string;
                req?: undefined;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                format?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
                format?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                short?: undefined;
                format?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                req?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                req?: undefined;
                format?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                op: {
                    create: {
                        type: string;
                    };
                };
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                op?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                req?: undefined;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                op: {
                    create: {
                        type: string;
                    };
                };
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
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
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            $action: string;
                        };
                        transform: {
                            req: {
                                float: string;
                            };
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            $action: string;
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                op: {
                    create: {
                        type: string;
                    };
                };
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                op?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
                op?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                req?: undefined;
                op?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
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
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                remove: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
                union?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
                union?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
                union?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                short?: undefined;
                format?: undefined;
                union?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                union: {
                    branches: number;
                    count: number;
                    depth: number;
                };
                req?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
                req: boolean;
                short: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        promotion: {
            fields: ({
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        template: {
            fields: ({
                format: string;
                name: string;
                req: boolean;
                short: string;
                type: string;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
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
