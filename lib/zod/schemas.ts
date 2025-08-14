import { z } from "zod";

// User schemas
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string().default("user"),
  banned: z.boolean().default(false),
  banReason: z.string().nullable(),
  banExpires: z.date().nullable(),
});

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Unesite valjanu email adresu"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 znakova"),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, "Ime mora imati najmanje 2 znaka").optional(),
  email: z.string().email("Unesite valjanu email adresu").optional(),
  image: z.string().nullable().optional(),
  role: z.string().optional(),
});

// Session schemas
export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
  impersonatedBy: z.string().nullable(),
});

// Account schemas
export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.date().nullable(),
  refreshTokenExpiresAt: z.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Category schemas
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(2, "Naziv mora imati najmanje 2 znaka"),
  slug: z.string().min(2, "Slug mora imati najmanje 2 znaka"),
  description: z.string().optional(),
  image: z.string().optional(),
});

// Product schemas
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  price: z.number().positive("Cijena mora biti pozitivna"),
  images: z.array(z.string()),
  categoryId: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(2, "Naziv mora imati najmanje 2 znaka"),
  slug: z.string().min(2, "Slug mora imati najmanje 2 znaka"),
  description: z.string().optional(),
  price: z.number().positive("Cijena mora biti pozitivna"),
  images: z.array(z.string()).min(1, "Potrebna je najmanje jedna slika"),
  categoryId: z.string(),
  isActive: z.boolean().default(true),
});

// Order schemas
export const OrderStatusEnum = z.enum([
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: OrderStatusEnum,
  total: z.number().positive("Ukupan iznos mora biti pozitivan"),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateOrderSchema = z.object({
  userId: z.string(),
  status: OrderStatusEnum.default("PENDING"),
  total: z.number().positive("Ukupan iznos mora biti pozitivan"),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive("Količina mora biti pozitivna"),
        price: z.number().positive("Cijena mora biti pozitivna"),
      })
    )
    .min(1, "Narudžba mora imati najmanje jedan proizvod"),
});

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

// OrderItem schemas
export const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

// Design schemas
export const DesignTypeEnum = z.enum([
  "ENGRAVING",
  "CNC",
  "PRINT_3D",
  "WEDDING",
]);

export const DesignSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orderId: z.string().nullable(),
  name: z.string(),
  type: DesignTypeEnum,
  fileUrl: z.string().url("Mora biti valjana URL adresa"),
  thumbnailUrl: z.string().url("Mora biti valjana URL adresa").nullable(),
  metadata: z.record(z.string(), z.any()).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateDesignSchema = z.object({
  userId: z.string(),
  orderId: z.string().optional(),
  name: z.string().min(2, "Naziv mora imati najmanje 2 znaka"),
  type: DesignTypeEnum,
  fileUrl: z.string().url("Mora biti valjana URL adresa"),
  thumbnailUrl: z.string().url("Mora biti valjana URL adresa").optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Auth schemas
export const LoginSchema = z.object({
  email: z.string().email("Unesite valjanu email adresu"),
  password: z.string().min(1, "Lozinka je obavezna"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
    email: z.string().email("Unesite valjanu email adresu"),
    password: z.string().min(6, "Lozinka mora imati najmanje 6 znakova"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju",
    path: ["confirmPassword"],
  });

// Export types
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatus = z.infer<typeof UpdateOrderStatusSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Design = z.infer<typeof DesignSchema>;
export type CreateDesign = z.infer<typeof CreateDesignSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type DesignType = z.infer<typeof DesignTypeEnum>;
