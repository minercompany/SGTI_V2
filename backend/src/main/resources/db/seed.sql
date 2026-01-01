-- SGTI Enterprise - Script de Inicialización
-- Crear usuario admin y datos básicos

-- ============================================
-- 1. USUARIO ADMINISTRADOR
-- ============================================
-- Password: admin123 (BCrypt hash)
INSERT INTO usuarios (id, nombre_completo, email, password, rol, activo, fecha_creacion, fecha_actualizacion)
VALUES (
    gen_random_uuid(),
    'Administrador del Sistema',
    'admin@cooperativa.com.py',
    '$2a$10$Y5ZN/8fGqPXOvZL5Dw7L2eH8pQz1kF4/8E2zqXk3xCvM5KqH7IWBO', -- admin123
    'SUPER_ADMIN',
    true,
    NOW(),
    NOW()
) ON CONFLICT DO NOTHING;

-- ============================================
-- 2. DEPARTAMENTOS
-- ============================================
INSERT INTO departamentos (id, nombre, descripcion, email_notificacion, color, icono, orden, activo, fecha_creacion)
VALUES 
    (gen_random_uuid(), 'Soporte Técnico', 'Problemas técnicos y sistemas', 'soporte@cooperativa.com.py', '#3B82F6', 'Laptop', 1, true, NOW()),
    (gen_random_uuid(), 'Atención al Socio', 'Consultas generales y reclamos', 'atencion@cooperativa.com.py', '#10B981', 'Users', 2, true, NOW()),
    (gen_random_uuid(), 'Créditos', 'Solicitudes de préstamos', 'creditos@cooperativa.com.py', '#F59E0B', 'DollarSign', 3, true, NOW()),
    (gen_random_uuid(), 'Cobranzas', 'Gestión de cobros', 'cobranzas@cooperativa.com.py', '#EF4444', 'Receipt', 4, true, NOW()),
    (gen_random_uuid(), 'Administración', 'Temas administrativos', 'admin@cooperativa.com.py', '#8B5CF6', 'Building', 5, true, NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. CATEGORÍAS
-- ============================================
INSERT INTO categorias (id, nombre, descripcion, icono, color, orden, activo)
VALUES
    (gen_random_uuid(), 'Acceso al Sistema', 'Problemas de login y permisos', 'Lock', '#3B82F6', 1, true),
    (gen_random_uuid(), 'Consulta de Saldo', 'Ver saldos y movimientos', 'Wallet', '#10B981', 2, true),
    (gen_random_uuid(), 'Solicitud de Préstamo', 'Nueva solicitud de crédito', 'FileText', '#F59E0B', 3, true),
    (gen_random_uuid(), 'Reclamo', 'Queja o reclamo', 'AlertCircle', '#EF4444', 4, true),
    (gen_random_uuid(), 'Actualización de Datos', 'Cambio de información personal', 'Edit', '#6366F1', 5, true),
    (gen_random_uuid(), 'Otro', 'Otra consulta', 'HelpCircle', '#64748B', 6, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. ESTADOS
-- ============================================
INSERT INTO estados (id, nombre, tipo, color_hex, orden, activo)
VALUES
    (gen_random_uuid(), 'Abierto', 'ABIERTO', '#10B981', 1, true),
    (gen_random_uuid(), 'En Proceso', 'EN_PROCESO', '#F59E0B', 2, true),
    (gen_random_uuid(), 'Pendiente Cliente', 'EN_PROCESO', '#3B82F6', 3, true),
    (gen_random_uuid(), 'Resuelto', 'CERRADO', '#64748B', 4, true),
    (gen_random_uuid(), 'Cerrado', 'CERRADO', '#475569', 5, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. PRIORIDADES
-- ============================================
INSERT INTO prioridades (id, nombre, nivel, color_hex, tiempo_respuesta_horas, activo)
VALUES
    (gen_random_uuid(), 'Baja', 1, '#64748B', 72, true),
    (gen_random_uuid(), 'Normal', 2, '#3B82F6', 24, true),
    (gen_random_uuid(), 'Alta', 3, '#F59E0B', 8, true),
    (gen_random_uuid(), 'Urgente', 4, '#EF4444', 2, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. CALENDARIO LABORAL
-- ============================================
INSERT INTO calendarios_laborales (id, nombre, zona_horaria, lunes_inicio, lunes_fin, martes_inicio, martes_fin, miercoles_inicio, miercoles_fin, jueves_inicio, jueves_fin, viernes_inicio, viernes_fin, sabado_inicio, sabado_fin, activo)
VALUES (
    gen_random_uuid(),
    'Calendario Estándar',
    'America/Asuncion',
    '08:00', '17:00',
    '08:00', '17:00',
    '08:00', '17:00',
    '08:00', '17:00',
    '08:00', '17:00',
    '08:00', '12:00',
    true
) ON CONFLICT DO NOTHING;
