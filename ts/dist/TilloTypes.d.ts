export interface Brand {
    currency?: string;
    name?: string;
    slug?: string;
}
export interface BrandListMatch {
    currency?: string;
    name?: string;
    slug?: string;
}
export interface Dgc {
    brand: string;
    client_request_id: string;
    delivery_method?: string;
    face_value: Record<string, any>;
    sector?: string;
}
export interface DgcCreateData {
    brand: string;
    client_request_id: string;
    delivery_method?: string;
    face_value: Record<string, any>;
    sector?: string;
}
export interface Float {
    balance?: number;
    currency?: string;
}
export interface FloatListMatch {
    balance?: number;
    currency?: string;
}
