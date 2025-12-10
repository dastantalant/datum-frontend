
export interface HalLink {
    href: string;
    templated?: boolean;
}

export interface HalLinks {
    self: HalLink;
    [key: string]: HalLink | undefined;
}

export type HalResource<T> = T & {
    _links: HalLinks;
};

export interface HalCollection<T> {
    _embedded: {
        [key: string]: HalResource<T>[];
    };
    _links: HalLinks;
    page?: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
}