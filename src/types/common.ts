export interface StepMeta {
  id: number;
  title: string;
  subtitle: string;
  category: 'Cameras' | 'Plan' | 'Sensors' | 'Accessories';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
