import React, { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';

export default function ResetConfirmModal({ show, onClose, onConfirm, title = "Reset ke Pengaturan Awal?", description = "Apakah Anda yakin ingin mengembalikan semua pengaturan di halaman ini ke nilai default? Perubahan yang belum disimpan akan hilang." }) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose}>Batal</SecondaryButton>

                    <DangerButton onClick={onConfirm}>
                        Ya, Reset Pengaturan
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
