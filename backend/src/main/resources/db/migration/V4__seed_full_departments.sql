DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'departamentos_nombre_key') THEN ALTER TABLE departamentos ADD CONSTRAINT departamentos_nombre_key UNIQUE (nombre); END IF; END $$;
-- =====================================================
-- SGTI ENTERPRISE - SEED DATA COMPLETO
-- 57 Departamentos de Cooperativa Reducto
-- =====================================================

-- Limpiar departamentos existentes (solo si existe data de prueba)
-- DELETE FROM departamentos WHERE activo = true;

-- =====================================================
-- DEPARTAMENTOS INSTITUCIONALES
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Consejo de Administración', 'Órgano máximo de dirección', 'consejo@cooperativa.com.py', '#1E40AF', 'Shield', 1, true, NOW()),
(gen_random_uuid(), 'Junta de Vigilancia', 'Control y fiscalización', 'vigilancia@cooperativa.com.py', '#7C2D12', 'Eye', 2, true, NOW()),
(gen_random_uuid(), 'Gerencia General', 'Dirección ejecutiva', 'gerencia@cooperativa.com.py', '#0F172A', 'Crown', 3, true, NOW()),
(gen_random_uuid(), 'Secretaría General', 'Secretaría institucional', 'secretaria@cooperativa.com.py', '#475569', 'FileText', 4, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- ÁREA FINANCIERA
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Contabilidad', 'Registro contable', 'contabilidad@cooperativa.com.py', '#166534', 'Calculator', 10, true, NOW()),
(gen_random_uuid(), 'Tesorería', 'Gestión de caja y bancos', 'tesoreria@cooperativa.com.py', '#065F46', 'Wallet', 11, true, NOW()),
(gen_random_uuid(), 'Finanzas', 'Planificación financiera', 'finanzas@cooperativa.com.py', '#064E3B', 'TrendingUp', 12, true, NOW()),
(gen_random_uuid(), 'Presupuesto y Costos', 'Control presupuestario', 'presupuesto@cooperativa.com.py', '#14532D', 'PieChart', 13, true, NOW()),
(gen_random_uuid(), 'Auditoría Interna', 'Auditoría y control interno', 'auditoria@cooperativa.com.py', '#7C2D12', 'FileSearch', 14, true, NOW()),
(gen_random_uuid(), 'Cumplimiento / PLAFT', 'Prevención de lavado de activos', 'cumplimiento@cooperativa.com.py', '#991B1B', 'AlertTriangle', 15, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- ÁREA CREDITICIA
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Créditos', 'Gestión de préstamos', 'creditos@cooperativa.com.py', '#EA580C', 'DollarSign', 20, true, NOW()),
(gen_random_uuid(), 'Análisis Crediticio', 'Evaluación de riesgo', 'analisis@cooperativa.com.py', '#C2410C', 'FileText', 21, true, NOW()),
(gen_random_uuid(), 'Recuperación de Créditos', 'Cobranza y recupero', 'cobranzas@cooperativa.com.py', '#9A3412', 'RefreshCw', 22, true, NOW()),
(gen_random_uuid(), 'Refinanciaciones', 'Reestructuración de deudas', 'refinanciaciones@cooperativa.com.py', '#7C2D12', 'Repeat', 23, true, NOW()),
(gen_random_uuid(), 'Microfinanzas', 'Créditos de pequeña cuantía', 'microfinanzas@cooperativa.com.py', '#F59E0B', 'Coins', 24, true, NOW()),
(gen_random_uuid(), 'Créditos de Consumo', 'Préstamos personales', 'consumo@cooperativa.com.py', '#D97706', 'ShoppingCart', 25, true, NOW()),
(gen_random_uuid(), 'Créditos Productivos', 'Financiamiento empresarial', 'productivos@cooperativa.com.py', '#B45309', 'Factory', 26, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- SERVICIOS AL SOCIO
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Atención al Socio', 'Atención personalizada', 'atencion@cooperativa.com.py', '#0891B2', 'Users', 30, true, NOW()),
(gen_random_uuid(), 'Ahorros', 'Cuentas de ahorro', 'ahorros@cooperativa.com.py', '#0E7490', 'PiggyBank', 31, true, NOW()),
(gen_random_uuid(), 'Tarjetas', 'Tarjetas de débito/crédito', 'tarjetas@cooperativa.com.py', '#155E75', 'CreditCard', 32, true, NOW()),
(gen_random_uuid(), 'Cajas', 'Operaciones de caja', 'cajas@cooperativa.com.py', '#164E63', 'Banknote', 33, true, NOW()),
(gen_random_uuid(), 'Call Center / Contact Center', 'Atención telefónica', 'callcenter@cooperativa.com.py', '#06B6D4', 'Phone', 34, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- SERVICIOS ESPECIALES
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Centro Médico', 'Servicios de salud', 'medico@cooperativa.com.py', '#DC2626', 'Activity', 40, true, NOW()),
(gen_random_uuid(), 'Farmacia', 'Dispensación de medicamentos', 'farmacia@cooperativa.com.py', '#EF4444', 'Pill', 41, true, NOW()),
(gen_random_uuid(), 'Laboratorio', 'Análisis clínicos', 'laboratorio@cooperativa.com.py', '#F87171', 'Microscope', 42, true, NOW()),
(gen_random_uuid(), 'Convenios y Beneficios', 'Alianzas estratégicas', 'convenios@cooperativa.com.py', '#FB923C', 'Handshake', 43, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- ÁREA EDUCATIVA Y SOCIAL
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Educación Cooperativa', 'Formación cooperativista', 'educacion@cooperativa.com.py', '#7C3AED', 'BookOpen', 50, true, NOW()),
(gen_random_uuid(), 'Capacitación', 'Desarrollo de capacidades', 'capacitacion@cooperativa.com.py', '#6D28D9', 'GraduationCap', 51, true, NOW()),
(gen_random_uuid(), 'Responsabilidad Social', 'Programas comunitarios', 'social@cooperativa.com.py', '#5B21B6', 'Heart', 52, true, NOW()),
(gen_random_uuid(), 'Eventos Institucionales', 'Organización de eventos', 'eventos@cooperativa.com.py', '#4C1D95', 'Calendar', 53, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- TECNOLOGÍA Y SISTEMAS
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Sistemas / TI', 'Tecnologías de información', 'ti@cooperativa.com.py', '#3B82F6', 'Laptop', 60, true, NOW()),
(gen_random_uuid(), 'Soporte Técnico', 'Mesa de ayuda técnica', 'soporte@cooperativa.com.py', '#2563EB', 'Wrench', 61, true, NOW()),
(gen_random_uuid(), 'Desarrollo de Sistemas', 'Desarrollo de software', 'desarrollo@cooperativa.com.py', '#1D4ED8', 'Code', 62, true, NOW()),
(gen_random_uuid(), 'Infraestructura y Redes', 'Redes y servidores', 'infraestructura@cooperativa.com.py', '#1E40AF', 'Server', 63, true, NOW()),
(gen_random_uuid(), 'Seguridad Informática', 'Ciberseguridad', 'seguridad@cooperativa.com.py', '#1E3A8A', 'Lock', 64, true, NOW()),
(gen_random_uuid(), 'App y Canales Digitales', 'Aplicaciones móviles', 'app@cooperativa.com.py', '#60A5FA', 'Smartphone', 65, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- ADMINISTRACIÓN Y GESTIÓN
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Administración', 'Administración general', 'administracion@cooperativa.com.py', '#64748B', 'Building', 70, true, NOW()),
(gen_random_uuid(), 'Recursos Humanos', 'Gestión del personal', 'rrhh@cooperativa.com.py', '#475569', 'UserCog', 71, true, NOW()),
(gen_random_uuid(), 'Talento Humano', 'Desarrollo del talento', 'talento@cooperativa.com.py', '#334155', 'Star', 72, true, NOW()),
(gen_random_uuid(), 'Compras', 'Adquisiciones', 'compras@cooperativa.com.py', '#1E293B', 'ShoppingBag', 73, true, NOW()),
(gen_random_uuid(), 'Proveedores', 'Gestión de proveedores', 'proveedores@cooperativa.com.py', '#0F172A', 'Truck', 74, true, NOW()),
(gen_random_uuid(), 'Logística', 'Logística y distribución', 'logistica@cooperativa.com.py', '#94A3B8', 'Package', 75, true, NOW()),
(gen_random_uuid(), 'Archivo y Documentación', 'Gestión documental', 'archivo@cooperativa.com.py', '#CBD5E1', 'Archive', 76, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- COMUNICACIÓN Y COMERCIAL
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Marketing', 'Marketing y publicidad', 'marketing@cooperativa.com.py', '#EC4899', 'Megaphone', 80, true, NOW()),
(gen_random_uuid(), 'Comunicación Institucional', 'Comunicación corporativa', 'comunicacion@cooperativa.com.py', '#DB2777', 'MessageSquare', 81, true, NOW()),
(gen_random_uuid(), 'Imagen y Prensa', 'Relaciones públicas', 'prensa@cooperativa.com.py', '#BE185D', 'Camera', 82, true, NOW()),
(gen_random_uuid(), 'Ventas / Comercial', 'Área comercial', 'ventas@cooperativa.com.py', '#9F1239', 'TrendingUp', 83, true, NOW()),
(gen_random_uuid(), 'Alianzas Estratégicas', 'Convenios corporativos', 'alianzas@cooperativa.com.py', '#881337', 'Link', 84, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- LEGAL Y CONTROL
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Asesoría Legal', 'Servicios jurídicos', 'legal@cooperativa.com.py', '#78350F', 'Scale', 90, true, NOW()),
(gen_random_uuid(), 'Contratos', 'Gestión de contratos', 'contratos@cooperativa.com.py', '#92400E', 'FileSignature', 91, true, NOW()),
(gen_random_uuid(), 'Reclamos y Quejas', 'Atención de reclamos', 'reclamos@cooperativa.com.py', '#A16207', 'AlertCircle', 92, true, NOW()),
(gen_random_uuid(), 'Ética y Disciplina', 'Comisión de ética', 'etica@cooperativa.com.py', '#CA8A04', 'Gavel', 93, true, NOW())
ON CONFLICT (nombre) DO NOTHING;

-- =====================================================
-- OTROS / CONFIGURACIÓN
-- =====================================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion) VALUES
(gen_random_uuid(), 'Dirección de Sucursales', 'Coordinación de sucursales', 'sucursales@cooperativa.com.py', '#0D9488', 'MapPin', 100, true, NOW()),
(gen_random_uuid(), 'Sucursales / Agencias', 'Red de agencias', 'agencias@cooperativa.com.py', '#14B8A6', 'Building2', 101, true, NOW()),
(gen_random_uuid(), 'Mesa de Entradas', 'Recepción de documentos', 'mesaentradas@cooperativa.com.py', '#2DD4BF', 'Inbox', 102, true, NOW()),
(gen_random_uuid(), 'Dirección Ejecutiva', 'Dirección operativa', 'direccion@cooperativa.com.py', '#5EEAD4', 'Briefcase', 103, true, NOW()),
(gen_random_uuid(), 'Administración de Sistemas (SGTI)', 'Administración SGTI', 'admin_sgti@cooperativa.com.py', '#6366F1', 'Settings', 104, true, NOW())
ON CONFLICT (nombre) DO NOTHING;
