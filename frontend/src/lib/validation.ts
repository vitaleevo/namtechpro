import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
  category: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  brand: z.string().min(1, 'Marca é obrigatória'),
  specs: z.array(z.string()).default([]),
  status: z.enum(['Novo', 'Disponível', 'Top Vendas']).default('Disponível'),
});

export const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export const appointmentSchema = z.object({
  customerName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos'),
  serviceType: z.enum(['Naval Tech', 'Solar Audit', 'Radio Maintenance', 'GPS Installation', 'Radar System']),
  location: z.enum(['Namibe', 'Luanda', 'Lobito']),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida (formato HH:MM)'),
  message: z.string().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres').max(200),
  slug: z.string().min(5).regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().min(20, 'Excerto deve ter pelo menos 20 caracteres').max(300),
  content: z.string().min(100, 'Conteúdo deve ter pelo menos 100 caracteres'),
  author: z.string().min(1, 'Autor é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  readTime: z.string().regex(/^\d+ min read$/, 'Formato inválido (ex: 5 min read)'),
});

export const eventSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres').max(200),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Data inválida'),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida').optional(),
  location: z.string().min(1, 'Localização é obrigatória'),
  type: z.enum(['Event', 'Project', 'Community']),
  content: z.string().optional(),
  featured: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  type: z.enum(['product', 'blog']),
  description: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;