import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  name: string;
  brand: string;
  price: number;
  description: string;
  in_stock: boolean;
};

type Data = {
  products: Product[];
};

const products: Product[] = [
  {
    name: "iPhone 13",
    brand: "Apple",
    price: 999.0,
    description:
      "The latest iPhone with A15 Bionic chip, 5G capability, and Super Retina XDR display.",
    in_stock: true,
  },
  {
    name: "Galaxy S21",
    brand: "Samsung",
    price: 799.99,
    description:
      "The flagship Android phone with 5G capability, Exynos 2100 chip, and Dynamic AMOLED 2X display.",
    in_stock: true,
  },
  {
    name: "Pixel 6",
    brand: "Google",
    price: 699.0,
    description:
      "The latest Pixel phone with Google Tensor chip, 5G capability, and Full HD+ OLED display.",
    in_stock: false,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ products });
}