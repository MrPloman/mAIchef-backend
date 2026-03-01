// infrastructure/templates/reset-password.template.tsx
import {
  Body, Button, Container, Head, Heading,
  Html, Preview, Section, Text,
} from '@react-email/components';
import * as React from 'react';

interface Props {
  username?: string;
  resetUrl: string;
}

export function ResetPasswordTemplate({ username = 'Usuario', resetUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Recupera tu contraseña</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }}>
          <Heading style={{ color: '#1a1a1a', fontSize: '24px' }}>
            Recuperar contraseña
          </Heading>
          <Text style={{ color: '#555', fontSize: '16px' }}>
            Hola {username}, recibimos una solicitud para restablecer tu contraseña.
          </Text>
          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: '#6366f1',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              Restablecer contraseña
            </Button>
          </Section>
          <Text style={{ color: '#999', fontSize: '13px' }}>
            Este enlace expira en 1 hora. Si no solicitaste esto, ignora este correo.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}