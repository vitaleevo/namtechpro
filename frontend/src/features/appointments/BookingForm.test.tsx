import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingForm } from './BookingForm';
import { vi, describe, it, expect } from 'vitest';

// Mock do i18n
vi.mock('@/i18n', () => ({
  useLanguage: () => ({
    t: {
      booking: {
        services: { naval: 'Naval', solar: 'Solar', radio: 'Radio', general: 'Geral' },
        locations: { namibe: 'Namibe', luanda: 'Luanda', lobito: 'Lobito', offshore: 'Offshore' },
        name: 'Nome',
        email: 'Email',
        phone: 'Telefone',
        service: 'Serviço',
        location: 'Localização',
        date: 'Data',
        time: 'Hora',
        message: 'Mensagem',
        loading: 'A carregar...',
        submit: 'Agendar',
        error: 'Erro',
        successTitle: 'Sucesso',
        successDesc: 'Agendamento concluído'
      }
    }
  })
}));

// Mock do Convex
const mockCreateAppointment = vi.fn().mockResolvedValue('fake-id');
vi.mock('convex/react', () => ({
  useMutation: () => mockCreateAppointment
}));

// Mock API endpoints para evitar erros do framer-motion ou Convex interno se houver
vi.mock('@/convex/_generated/api', () => ({
  api: {
    appointments: {
      createAppointment: 'createAppointment'
    }
  }
}));

// Mocks para os componentes de UI personalizados
vi.mock('@/components/ui/Select', () => ({
    CustomSelect: ({ label, value, onChange, options }: any) => (
        <div data-testid={`select-${label}`}>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    )
}));

vi.mock('@/components/ui/DatePicker', () => ({
    CustomDatePicker: ({ value, onChange }: any) => (
        <input data-testid="date-picker" type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}));

vi.mock('@/components/ui/TimePicker', () => ({
    CustomTimePicker: ({ value, onChange }: any) => (
        <input data-testid="time-picker" type="time" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}));

describe('BookingForm Component', () => {
  it('renders all form fields', () => {
    render(<BookingForm />);
    expect(screen.getByText('Nome')).toBeDefined();
    expect(screen.getByText('Email')).toBeDefined();
    expect(screen.getByText('Telefone')).toBeDefined();
    expect(screen.getByText('Mensagem')).toBeDefined();
    expect(screen.getByText('Agendar')).toBeDefined();
  });

  it('updates form state on input change', () => {
    render(<BookingForm />);
    const nameInput = screen.getByPlaceholderText('Ex: João Manuel');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    expect((nameInput as HTMLInputElement).value).toBe('Test User');
  });

  it('validates date before submitting', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<BookingForm />);
    
    const submitBtn = screen.getByRole('button', { name: /agendar/i });
    fireEvent.click(submitBtn);
    
    expect(alertMock).toHaveBeenCalledWith('Por favor, selecione uma data.');
    alertMock.mockRestore();
  });
  
  it('calls createAppointment on valid submit', async () => {
    render(<BookingForm />);
    
    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText('Ex: João Manuel'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('exemplo@namtechpro.ao'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByPlaceholderText('+244'), { target: { value: '123456789' } });
    
    // Fill date
    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, { target: { value: '2026-10-10' } });
    
    // Submit
    const submitBtn = screen.getByRole('button', { name: /agendar/i });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
        expect(mockCreateAppointment).toHaveBeenCalled();
    });
  });
});
