export interface DeviceListener {
    tabletListener: MediaQueryList;
    mobileListener: MediaQueryList;
}

export type DeviceType =
    | typeof mobileDevice
    | typeof tabletDevice
    | typeof desktopDevice;

export const mobileDevice = {
    mobile: true,
    tablet: false,
    desktop: false,
};

export const tabletDevice = {
    mobile: false,
    tablet: true,
    desktop: false,
};

export const desktopDevice = {
    mobile: false,
    tablet: false,
    desktop: true,
};
