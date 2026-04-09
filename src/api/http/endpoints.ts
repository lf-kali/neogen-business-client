export const endpoints = {
  auth: {
    login: "/technicians/login",
  },
  costumer: "/costumers",
  portableDevices: {
    cellphone: "/cellphones",
    laptop: "/laptops",
  },
  portableDeviceBrands: {
    cellphoneBrand: "/cellphone-brands",
    laptopBrand: "/laptop-brands",
  },
  portableDeviceModels: {
    cellphoneModel: "/cellphone-models",
    laptopModel: "/laptop-models",
  },
  portableDeviceSearch: "/portable-device-search",
  serviceOrder: "/service-order",
  technician: "/technicians",
  product: "/product",
  productCategory: "/product-category",
  serviceType: "/service-type",
} as const;
