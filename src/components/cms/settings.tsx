'use client';

import { useState } from 'react';

type SettingsTab = 'permissions' | 'users' | 'offices' | 'preferences';

const roles = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full access to all system modules, configurations, and user management.',
    tag: 'System',
    tagStyle: 'bg-primary/10 text-primary border-primary/20',
    iconBg: 'bg-primary-container/10',
    iconColor: 'text-primary',
    icon: 'shield_person',
    permissions: [
      { label: 'Full system access', allowed: true },
      { label: 'User management', allowed: true },
      { label: 'System configuration', allowed: true },
      { label: 'Global reporting', allowed: true },
    ],
  },
  {
    id: 'lawyer',
    title: 'Lawyer',
    description: 'Access to assigned cases, client details, and document management.',
    tag: 'Legal',
    tagStyle: 'bg-secondary/10 text-secondary border-secondary/20',
    iconBg: 'bg-surface-variant/50',
    iconColor: 'text-on-surface',
    icon: 'gavel',
    permissions: [
      { label: 'Manage assigned cases', allowed: true },
      { label: 'Document upload & edit', allowed: true },
      { label: 'Client communication', allowed: true },
      { label: 'User management', allowed: false },
    ],
  },
  {
    id: 'paralegal',
    title: 'Paralegal',
    description: 'Assist with case documentation, scheduling, and basic client info.',
    tag: 'Support',
    tagStyle: 'bg-secondary/10 text-secondary border-secondary/20',
    iconBg: 'bg-surface-variant/50',
    iconColor: 'text-on-surface',
    icon: 'assignment',
    permissions: [
      { label: 'View assigned cases', allowed: true },
      { label: 'Draft documents', allowed: true },
      { label: 'Finalize legal advice', allowed: false },
      { label: 'Delete records', allowed: false },
    ],
  },
  {
    id: 'intern',
    title: 'Intern',
    description: 'Restricted read-only access for training and supervised assistance.',
    tag: 'Training',
    tagStyle: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    iconBg: 'bg-surface-variant/50',
    iconColor: 'text-on-surface',
    icon: 'menu_book',
    permissions: [
      { label: 'Read-only case access', allowed: true },
      { label: 'Edit documents', allowed: false },
      { label: 'Client communication', allowed: false },
      { label: 'System settings', allowed: false },
    ],
  },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('permissions');

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'permissions', label: 'Role Permissions' },
    { id: 'users', label: 'User Management' },
    { id: 'offices', label: 'Office Configuration' },
    { id: 'preferences', label: 'System Preferences' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-stack-lg">
      {/* Page Header */}
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Settings
        </h2>
        <p className="font-body-md text-body-md text-secondary">
          Manage users, offices, and system configuration.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex overflow-x-auto pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 md:pb-0 gap-4 border-b border-outline-variant/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-label-md text-label-md pb-3 px-1 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-on-surface border-b-2 border-transparent hover:border-outline-variant'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Role Permissions Tab - Bento Grid Layout */}
      {activeTab === 'permissions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-gutter">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full relative group"
            >
              <div className="p-container-padding flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-stack-md">
                  <div
                    className={`w-12 h-12 rounded-full ${role.iconBg} flex items-center justify-center ${role.iconColor} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                    >
                      {role.icon}
                    </span>
                  </div>
                  <span
                    className={`${role.tagStyle} font-label-sm text-label-sm px-3 py-1 rounded-full border`}
                  >
                    {role.tag}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  {role.title}
                </h3>
                <p className="text-secondary mb-stack-md text-sm leading-6">
                  {role.description}
                </p>
                <hr className="border-outline-variant/30 w-full mb-stack-md" />
                <ul className="space-y-3 flex-1">
                  {role.permissions.map((perm) => (
                    <li key={perm.label} className="flex items-center gap-3 text-sm text-on-surface-variant">
                      {perm.allowed ? (
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-outline text-[20px]">
                          cancel
                        </span>
                      )}
                      {perm.allowed ? (
                        perm.label
                      ) : (
                        <span className="text-secondary line-through">{perm.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-low px-container-padding py-4 border-t border-outline-variant/30 mt-auto">
                <button className="w-full font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
                  Edit Permissions{' '}
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User Management Tab - Placeholder */}
      {activeTab === 'users' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm p-container-padding">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                group
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">User Management</h3>
              <p className="text-secondary text-sm">Add, edit, and manage system users and their access.</p>
            </div>
          </div>
          <div className="text-center py-12 text-secondary">
            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-40">person_add</span>
            <p className="font-body-md text-body-md">User management features coming soon.</p>
            <p className="text-sm mt-2">This module will include user creation, role assignment, and activity tracking.</p>
          </div>
        </div>
      )}

      {/* Office Configuration Tab - Placeholder */}
      {activeTab === 'offices' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm p-container-padding">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                corporate_fare
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Office Configuration</h3>
              <p className="text-secondary text-sm">Manage office locations, contact details, and regional settings.</p>
            </div>
          </div>
          <div className="text-center py-12 text-secondary">
            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-40">location_city</span>
            <p className="font-body-md text-body-md">Office configuration features coming soon.</p>
            <p className="text-sm mt-2">This module will include office setup, jurisdiction mapping, and staff allocation.</p>
          </div>
        </div>
      )}

      {/* System Preferences Tab - Placeholder */}
      {activeTab === 'preferences' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm p-container-padding">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                tune
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">System Preferences</h3>
              <p className="text-secondary text-sm">Configure notifications, display settings, and system defaults.</p>
            </div>
          </div>
          <div className="text-center py-12 text-secondary">
            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-40">settings_suggest</span>
            <p className="font-body-md text-body-md">System preferences features coming soon.</p>
            <p className="text-sm mt-2">This module will include notification rules, theme settings, and data management options.</p>
          </div>
        </div>
      )}
    </div>
  );
}
