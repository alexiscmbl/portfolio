'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ContactDialogProps = {
  formspreeId: string;
  triggerClassName?: string;
};

export function ContactDialog({ formspreeId, triggerClassName }: ContactDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [state, handleSubmit] = useForm(formspreeId);

  useEffect(() => {
    if (state.succeeded && open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={triggerClassName}
          type="button"
        >
          <Mail className="size-5" />
          {t('contact.formTitle')}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('contact.formTitle')}</DialogTitle>
          <DialogDescription>{t('contact.subtitle')}</DialogDescription>
        </DialogHeader>
        {state.succeeded ? (
          <p className="text-center text-sm text-green-600 dark:text-green-400 py-4">
            {t('contact.formSuccess')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">{t('contact.formName')}</Label>
              <Input id="contact-name" name="name" placeholder={t('contact.formName')} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">{t('contact.formEmail')}</Label>
              <Input id="contact-email" name="email" type="email" placeholder={t('contact.formEmail')} required />
              <ValidationError prefix={t('contact.formEmail')} field="email" errors={state.errors} className="text-sm text-destructive" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-message">{t('contact.formMessage')}</Label>
              <Textarea id="contact-message" name="message" placeholder={t('contact.formMessage')} required rows={4} />
              <ValidationError prefix={t('contact.formMessage')} field="message" errors={state.errors} className="text-sm text-destructive" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={state.submitting}>
                {state.submitting ? '...' : t('contact.formSend')}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
