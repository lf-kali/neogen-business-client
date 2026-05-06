/**
 * generateServiceOrderPDF.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerador de PDF para Ordens de Serviço usando @react-pdf/renderer.
 *
 * INSTALAÇÃO:
 *   npm install @react-pdf/renderer
 *   npm install -D @types/react-pdf
 *
 * USO NO BOTÃO:
 *   import { generateServiceOrderPDF } from './generateServiceOrderPDF';
 *
 *   const companyInfo: CompanyInfo = {
 *     name: 'Neogen Informática',
 *     phone: '(51) 98917-0627',
 *     email: 'neogen.informatica@gmail.com',
 *     responsible: 'Kali França',
 *   };
 *
 *   <button onClick={() => generateServiceOrderPDF(serviceOrder, companyInfo, logoUrl)}>
 *     Exportar PDF
 *   </button>
 *
 * LOGO: passe uma URL pública ou string base64 de um PNG/JPG.
 *       SVG não é suportado nativamente pelo @react-pdf/renderer.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from '@react-pdf/renderer';
import type { ServiceOrder, ServiceOrderStatus } from '../features/serviceOrder/serviceOrder.types';
import type { HandedAccessories, InitialDiagnosis, PortableDevice } from '../features/device/types/device.types';
import type { Costumer } from '../features/costumer/costumer.types';
import type { ServiceType } from '../features/serviceType/serviceType.types';
import type { Product } from '../features/product/product.types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompanyInfo {
  name: string;
  phone?: string;
  email?: string;
  responsible?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso?: string | null): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR');
};

const formatDateTime = (iso?: string | null): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  return `${d.toLocaleDateString('pt-BR')} - ${d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

const formatPhone = (phone?: string): string => {
  if (!phone) return '—';
  const d = phone.replace(/\D/g, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
};

const formatCPF = (cpf?: string): string => {
  if (!cpf) return '—';
  const d = cpf.replace(/\D/g, '');
  if (d.length === 11)
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  return cpf;
};

const formatCurrency = (value?: number | null): string => {
  if (value == null) return 'R$ 0,00';
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const STATUS_LABEL: Record<ServiceOrderStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  acquiring_parts: 'Adquirindo peças',
  ongoing: 'Em andamento',
  finished: 'Finalizada',
  cancelled: 'Cancelado',
};

const DIAGNOSIS_LABEL: Record<keyof InitialDiagnosis, string> = {
  externalState: 'Estado externo',
  turnsOn: 'Liga',
  audio: 'Áudio',
  screen: 'Tela',
  battery: 'Bateria',
  rearCamera: 'Câmera traseira',
  frontalCamera: 'Câmera frontal',
  touch: 'Toque',
  notes: 'Observações',
};

const ACCESSORIES_LABEL: Record<keyof HandedAccessories, string> = {
  charger: 'Carregador',
  cable: 'Cabo',
  case: 'Capa',
  storageDevice: 'Armazenamento',
  other: 'Outros',
};

/** Tradução para o campo `device.type` (string livre vinda do backend) */
const DEVICE_TYPE_LABEL: Record<string, string> = {
  Cellphone: 'Celular',
  Smartphone: 'Smartphone',
  Tablet: 'Tablet',
  Laptop: 'Notebook',
  Notebook: 'Notebook',
  Desktop: 'Desktop',
  Printer: 'Impressora',
  Monitor: 'Monitor',
  Console: 'Console',
  Smartwatch: 'Smartwatch',
  Camera: 'Câmera',
  Other: 'Outro',
};

/** Tradução dos valores string dos campos de diagnóstico */
const DIAGNOSIS_VALUE_LABEL: Record<string, string> = {
  // condição geral
  ok: 'ok',
  damaged: 'danificado(a)',
  not_tested: 'não testado',
  // toque
  phantom_touch: 'toque fantasma',
  unresponsive: 'sem resposta',
  // áudio
  Chiando: 'chiando',
  low: 'baixo',
  muffled: 'abafado',
  no_sound: 'sem som',
  // estado externo
  interno: 'interno',
  good: 'bom',
  scratched: 'arranhado',
  cracked: 'rachado',
  broken: 'quebrado',
};

/** Tradução dos valores do campo `storageDevice` em HandedAccessories */
const STORAGE_DEVICE_LABEL: Record<string, string> = {
  sd_card: 'Cartão SD',
  hd: 'HD externo',
  ssd: 'SSD externo',
  pen_drive: 'Pen drive',
  none: 'nenhum',
};

const diagnosisValue = (val: string | boolean | undefined): string => {
  if (val === undefined || val === null) return '—';
  if (typeof val === 'boolean') return val ? 'sim' : 'não';
  return DIAGNOSIS_VALUE_LABEL[val] ?? val;
};

const storageDeviceValue = (val: string): string =>
  STORAGE_DEVICE_LABEL[val] ?? val;

const deviceTypeLabel = (type?: string): string => {
  if (!type) return '—';
  return DEVICE_TYPE_LABEL[type] ?? type;
};

// ─── Colors & Styles ──────────────────────────────────────────────────────────

const C = {
  primary: '#1a1a2e',
  accent: '#3a7bd5',
  headerBg: '#f2f4f8',
  sectionBg: '#e8edf4',
  rowAlt: '#f8f9fb',
  border: '#c8d0dc',
  text: '#2c2c2c',
  muted: '#666',
  white: '#ffffff',
} as const;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: C.text,
    paddingTop: 28,
    paddingBottom: 48,
    paddingHorizontal: 28,
    backgroundColor: C.white,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    border: `1pt solid ${C.border}`,
    borderRadius: 3,
    padding: '10 12',
    marginBottom: 10,
    backgroundColor: C.headerBg,
  },
  logo: { width: 48, height: 48, marginRight: 12, objectFit: 'contain' },
  companyName: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.primary },
  headerRight: { marginLeft: 'auto', textAlign: 'right' },
  headerRightText: { fontSize: 8, color: C.muted, marginBottom: 2 },

  // ── OS Title bar ──────────────────────────────────────────────────────────
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2pt solid ${C.accent}`,
    paddingBottom: 4,
    marginBottom: 8,
  },
  titleText: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.primary },
  titleDate: { fontSize: 9, color: C.muted },

  // ── Generic section wrapper ───────────────────────────────────────────────
  section: {
    marginBottom: 7,
    border: `1pt solid ${C.border}`,
    borderRadius: 3,
  },
  sectionHead: {
    backgroundColor: C.sectionBg,
    padding: '4 8',
    borderBottom: `1pt solid ${C.border}`,
  },
  sectionHeadText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionBody: { padding: '6 8' },

  // ── Info rows ─────────────────────────────────────────────────────────────
  row: { flexDirection: 'row', marginBottom: 3 },
  col: { flex: 1, flexDirection: 'row' },
  lbl: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, marginRight: 3, color: C.primary },
  val: { fontSize: 8.5, color: C.text, flex: 1 },

  // ── Tables ────────────────────────────────────────────────────────────────
  tHeadRow: {
    flexDirection: 'row',
    backgroundColor: C.sectionBg,
    borderBottom: `1pt solid ${C.border}`,
    padding: '4 8',
  },
  tRow: {
    flexDirection: 'row',
    borderBottom: `0.5pt solid ${C.border}`,
    padding: '4 8',
  },
  tRowAlt: {
    flexDirection: 'row',
    borderBottom: `0.5pt solid ${C.border}`,
    padding: '4 8',
    backgroundColor: C.rowAlt,
  },
  tTotalRow: {
    flexDirection: 'row',
    padding: '5 8',
    backgroundColor: C.sectionBg,
  },
  th: { fontFamily: 'Helvetica-Bold', fontSize: 8, color: C.primary },
  td: { fontSize: 8.5, color: C.text },
  cItem: { width: 28 },
  cName: { flex: 1 },
  cUnd: { width: 32, textAlign: 'center' },
  cQty: { width: 40, textAlign: 'right' },
  cUnit: { width: 60, textAlign: 'right' },
  cSub: { width: 68, textAlign: 'right' },

  // ── Totals ────────────────────────────────────────────────────────────────
  totalsWrap: { alignItems: 'flex-end', marginTop: 6 },
  totalLine: { flexDirection: 'row', marginBottom: 2 },
  totalLbl: { fontSize: 8.5, color: C.muted, width: 90, textAlign: 'right', marginRight: 8 },
  totalVal: { fontSize: 8.5, width: 72, textAlign: 'right' },
  grandLbl: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: C.primary,
    width: 90,
    textAlign: 'right',
    marginRight: 8,
  },
  grandVal: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: C.accent,
    width: 72,
    textAlign: 'right',
  },

  // ── Signatures (OS page) ──────────────────────────────────────────────────
  sigArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 28,
    paddingTop: 8,
  },
  sigBox: { alignItems: 'center', width: 180 },
  sigLine: { borderTop: `1pt solid ${C.text}`, width: 160, marginBottom: 4 },
  sigLbl: { fontSize: 8, color: C.muted },

  // ── Page number ───────────────────────────────────────────────────────────
  pageNum: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 7.5,
    color: C.muted,
  },

  // ── Responsibility Term ───────────────────────────────────────────────────
  termTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    textAlign: 'center',
    marginBottom: 14,
    borderBottom: `2pt solid ${C.accent}`,
    paddingBottom: 6,
  },
  termRef: {
    fontSize: 8.5,
    color: C.muted,
    textAlign: 'center',
    marginBottom: 14,
  },
  termSub: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    marginTop: 12,
    marginBottom: 4,
  },
  termText: {
    fontSize: 8.5,
    color: C.text,
    lineHeight: 1.65,
    textAlign: 'justify',
  },
  termDate: {
    textAlign: 'center',
    fontSize: 8.5,
    color: C.muted,
    marginTop: 22,
    marginBottom: 4,
  },
  termSigArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  termSigBox: { alignItems: 'center', width: 200 },
  termSigLine: { borderTop: `1pt solid ${C.text}`, width: 180, marginBottom: 5 },
  termSigName: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: C.text },
  termSigSub: { fontSize: 7.5, color: C.muted, marginTop: 1 },
});

// ─── Reusable primitives ──────────────────────────────────────────────────────

interface InfoItem {
  label: string;
  value?: string | null;
}

const SectionHead: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHead}>
    <Text style={styles.sectionHeadText}>{title}</Text>
  </View>
);

const InfoRow: React.FC<{ items: InfoItem[] }> = ({ items }) => (
  <View style={styles.row}>
    {items.map((it, i) => (
      <View key={i} style={styles.col}>
        <Text style={styles.lbl}>{it.label}:</Text>
        <Text style={styles.val}>{it.value || '—'}</Text>
      </View>
    ))}
  </View>
);

// ─── Page 1 sections ──────────────────────────────────────────────────────────

const HeaderSection: React.FC<{ logo?: string | null; companyInfo: CompanyInfo }> = ({
  logo,
  companyInfo,
}) => (
  <View style={styles.headerBox}>
    {logo ? <Image style={styles.logo} src={logo} /> : null}
    <View>
      <Text style={styles.companyName}>{companyInfo.name}</Text>
      {companyInfo.phone && (
        <Text style={{ fontSize: 8.5, color: C.muted, marginTop: 2 }}>{companyInfo.phone}</Text>
      )}
    </View>
    <View style={styles.headerRight}>
      {companyInfo.phone && (
        <Text style={styles.headerRightText}>{companyInfo.phone}</Text>
      )}
      {companyInfo.email && (
        <Text style={styles.headerRightText}>{companyInfo.email}</Text>
      )}
      {companyInfo.responsible && (
        <Text style={styles.headerRightText}>Responsável: {companyInfo.responsible}</Text>
      )}
    </View>
  </View>
);

const ExecutionPeriod: React.FC<{ so: ServiceOrder }> = ({ so }) => (
  <View style={styles.section}>
    <SectionHead title="Período de Execução" />
    <View style={styles.sectionBody}>
      <InfoRow
        items={[
          { label: 'Entrada', value: formatDateTime(so.entryDate) },
          {
            label: 'Prazo / Saída',
            value: so.closureDate
              ? formatDateTime(so.closureDate)
              : formatDate(so.deadline),
          },
        ]}
      />
      <InfoRow
        items={[
          { label: 'Status', value: STATUS_LABEL[so.status] ?? so.status },
          { label: 'Técnico', value: so.technician?.name },
        ]}
      />
    </View>
  </View>
);

const ClientData: React.FC<{ costumer: Costumer }> = ({ costumer }) => (
  <View style={styles.section}>
    <SectionHead title="Dados do Cliente" />
    <View style={styles.sectionBody}>
      <InfoRow
        items={[
          { label: 'Cliente', value: costumer.name },
          { label: 'CPF', value: formatCPF(costumer.cpf) },
        ]}
      />
      <InfoRow
        items={[
          { label: 'Endereço', value: costumer.address },
          { label: 'CEP', value: costumer.cep },
        ]}
      />
      <InfoRow
        items={[
          { label: 'Telefone', value: formatPhone(costumer.phone) },
          { label: 'E-mail', value: costumer.email },
        ]}
      />
    </View>
  </View>
);

const DeviceSection: React.FC<{ devices: PortableDevice[] }> = ({ devices }) => (
  <>
    {devices.map((device, idx) => (
      <View key={device.id} style={styles.section}>
        <SectionHead
          title={`Equipamento${devices.length > 1 ? ` ${idx + 1}` : ''}`}
        />
        <View style={styles.sectionBody}>

          {/* Basic row: tipo / marca / modelo / entrada */}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: `0.5pt solid ${C.border}`,
            }}
          >
            {(
              [
                { label: 'Tipo', value: deviceTypeLabel(device.type) },
                { label: 'Marca', value: device.brand?.name },
                { label: 'Modelo', value: device.model?.name },
                { label: 'Entrada', value: formatDate(device.entryDate) },
              ] as InfoItem[]
            ).map((it, i) => (
              <View key={i} style={{ flex: 1, marginRight: i < 3 ? 8 : 0 }}>
                <Text style={styles.lbl}>{it.label}</Text>
                <Text style={styles.val}>{it.value || '—'}</Text>
              </View>
            ))}
          </View>

          {/* Diagnosis + Defeitos/Acessórios side by side */}
          <View style={{ flexDirection: 'row' }}>
            {device.initialDiagnosis && (
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={{ ...styles.lbl, marginBottom: 6 }}>Condições</Text>
                {(Object.entries(device.initialDiagnosis) as [keyof InitialDiagnosis, string | boolean | undefined][]).map(
                  ([key, val]) => (
                    <Text key={key} style={{ fontSize: 8.5, marginBottom: 3 }}>
                      <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                        {DIAGNOSIS_LABEL[key] ?? key}:{' '}
                      </Text>
                      {diagnosisValue(val)}
                    </Text>
                  )
                )}
              </View>
            )}
            <View style={{ flex: 1 }}>
              {device.problemDescription ? (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.lbl, marginBottom: 6 }}>Defeitos relatados</Text>
                  <Text style={{ fontSize: 8.5, lineHeight: 1.5 }}>
                    {device.problemDescription}
                  </Text>
                </View>
              ) : null}
              {device.handedAccessories && (
                <View>
                  <Text style={{ ...styles.lbl, marginBottom: 6 }}>Acessórios entregues</Text>
                  {(Object.entries(device.handedAccessories) as [keyof HandedAccessories, string | boolean | undefined][]).map(
                    ([key, val]) => {
                      if (!val) return null;
                      const label = ACCESSORIES_LABEL[key] ?? key;
                      const display =
                        typeof val === 'boolean'
                          ? 'sim'
                          : key === 'storageDevice'
                          ? storageDeviceValue(val as string)
                          : val;
                      return (
                        <Text key={key} style={{ fontSize: 8.5, marginBottom: 3 }}>
                          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{label}:</Text>{' '}
                          {display}
                        </Text>
                      );
                    }
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    ))}
  </>
);

const ServicesTable: React.FC<{ services: ServiceType[] }> = ({ services }) => {
  const total = services.reduce((s, x) => s + (x.salePrice ?? 0), 0);
  return (
    <View style={styles.section}>
      <SectionHead title="Serviços" />
      <View style={styles.tHeadRow}>
        <Text style={{ ...styles.th, ...styles.cItem }}>Item</Text>
        <Text style={{ ...styles.th, ...styles.cName }}>Nome</Text>
        <Text style={{ ...styles.th, ...styles.cQty }}>Qtd.</Text>
        <Text style={{ ...styles.th, ...styles.cUnit }}>Vr. Unit.</Text>
        <Text style={{ ...styles.th, ...styles.cSub }}>Subtotal</Text>
      </View>
      {services.map((svc, i) => (
        <View key={svc.id} style={i % 2 === 0 ? styles.tRow : styles.tRowAlt}>
          <Text style={{ ...styles.td, ...styles.cItem }}>{i + 1}</Text>
          <Text style={{ ...styles.td, ...styles.cName }}>{svc.name}</Text>
          <Text style={{ ...styles.td, ...styles.cQty }}>1,00</Text>
          <Text style={{ ...styles.td, ...styles.cUnit }}>
            {(svc.salePrice ?? 0).toFixed(2)}
          </Text>
          <Text style={{ ...styles.td, ...styles.cSub }}>
            {(svc.salePrice ?? 0).toFixed(2)}
          </Text>
        </View>
      ))}
      <View style={styles.tTotalRow}>
        <Text style={{ ...styles.th, ...styles.cItem }} />
        <Text style={{ ...styles.th, ...styles.cName }}>Total</Text>
        <Text style={{ ...styles.th, ...styles.cQty }}>{services.length},00</Text>
        <Text style={{ ...styles.th, ...styles.cUnit }} />
        <Text style={{ ...styles.th, ...styles.cSub }}>{total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const ProductsTable: React.FC<{ products: Product[] }> = ({ products }) => {
  const total = products.reduce((s, x) => s + (x.salePrice ?? 0), 0);
  return (
    <View style={styles.section}>
      <SectionHead title="Produtos" />
      <View style={styles.tHeadRow}>
        <Text style={{ ...styles.th, ...styles.cItem }}>Item</Text>
        <Text style={{ ...styles.th, ...styles.cName }}>Nome</Text>
        <Text style={{ ...styles.th, ...styles.cUnd }}>Und.</Text>
        <Text style={{ ...styles.th, ...styles.cQty }}>Qtd.</Text>
        <Text style={{ ...styles.th, ...styles.cUnit }}>Vr. Unit.</Text>
        <Text style={{ ...styles.th, ...styles.cSub }}>Subtotal</Text>
      </View>
      {products.map((prod, i) => (
        <View key={prod.id} style={i % 2 === 0 ? styles.tRow : styles.tRowAlt}>
          <Text style={{ ...styles.td, ...styles.cItem }}>{i + 1}</Text>
          <Text style={{ ...styles.td, ...styles.cName }}>{prod.name}</Text>
          <Text style={{ ...styles.td, ...styles.cUnd }}>UN</Text>
          <Text style={{ ...styles.td, ...styles.cQty }}>1,00</Text>
          <Text style={{ ...styles.td, ...styles.cUnit }}>
            {(prod.salePrice ?? 0).toFixed(2)}
          </Text>
          <Text style={{ ...styles.td, ...styles.cSub }}>
            {(prod.salePrice ?? 0).toFixed(2)}
          </Text>
        </View>
      ))}
      <View style={styles.tTotalRow}>
        <Text style={{ ...styles.th, ...styles.cItem }} />
        <Text style={{ ...styles.th, ...styles.cName }}>Total</Text>
        <Text style={{ ...styles.th, ...styles.cUnd }} />
        <Text style={{ ...styles.th, ...styles.cQty }}>{products.length},00</Text>
        <Text style={{ ...styles.th, ...styles.cUnit }} />
        <Text style={{ ...styles.th, ...styles.cSub }}>{total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const TotalsSummary: React.FC<{ so: ServiceOrder }> = ({ so }) => {
  const servicesTotal = (so.services ?? []).reduce((s, x) => s + (x.salePrice ?? 0), 0);
  const productsTotal = (so.products ?? []).reduce((s, x) => s + (x.salePrice ?? 0), 0);
  const final = so.finalPrice ?? servicesTotal + productsTotal;

  return (
    <View style={styles.totalsWrap}>
      {(so.products?.length ?? 0) > 0 && (
        <View style={styles.totalLine}>
          <Text style={styles.totalLbl}>Produtos:</Text>
          <Text style={styles.totalVal}>{productsTotal.toFixed(2)}</Text>
        </View>
      )}
      {(so.services?.length ?? 0) > 0 && (
        <View style={styles.totalLine}>
          <Text style={styles.totalLbl}>Serviços:</Text>
          <Text style={styles.totalVal}>{servicesTotal.toFixed(2)}</Text>
        </View>
      )}
      <View
        style={{
          ...styles.totalLine,
          borderTop: `1pt solid ${C.border}`,
          paddingTop: 4,
          marginTop: 2,
        }}
      >
        <Text style={styles.grandLbl}>TOTAL:</Text>
        <Text style={styles.grandVal}>{formatCurrency(final)}</Text>
      </View>
    </View>
  );
};

const SignatureSection: React.FC = () => (
  <View style={styles.sigArea}>
    <View style={styles.sigBox}>
      <View style={styles.sigLine} />
      <Text style={styles.sigLbl}>Assinatura do cliente</Text>
    </View>
    <View style={styles.sigBox}>
      <View style={styles.sigLine} />
      <Text style={styles.sigLbl}>Assinatura do técnico</Text>
    </View>
  </View>
);

// ─── Page 2: Responsibility Term ──────────────────────────────────────────────

const ResponsibilityTerm: React.FC<{ so: ServiceOrder; companyInfo: CompanyInfo }> = ({
  so,
  companyInfo,
}) => {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.termTitle}>
        TERMO DE RESPONSABILIDADE E PRESTAÇÃO DE SERVIÇOS
      </Text>

      <Text style={styles.termRef}>
        Ref.: Ordem de Serviço nº {so.id} — {so.costumer.name} —{' '}
        {formatDate(so.entryDate)}
      </Text>

      <Text style={styles.termText}>
        Pelo presente instrumento, de um lado{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{companyInfo.name}</Text>, doravante
        denominada PRESTADORA, e de outro lado{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{so.costumer.name}</Text>,
        portador(a) do CPF nº {formatCPF(so.costumer.cpf)}, doravante denominado(a)
        CONTRATANTE, têm entre si justo e acordado o seguinte:
      </Text>

      {/* ── Cláusula 1 ── */}
      <Text style={styles.termSub}>1. DO OBJETO</Text>
      <Text style={styles.termText}>
        O presente instrumento tem por objeto a prestação de serviços técnicos de
        manutenção, reparo e/ou substituição de componentes no(s) equipamento(s)
        descrito(s) na Ordem de Serviço nº {so.id}, recebido(s) pela PRESTADORA em{' '}
        {formatDateTime(so.entryDate)}, conforme defeito(s) e condições de entrada
        registrados no referido documento, que passa a integrar o presente termo para
        todos os fins de direito.{'\n\n'}
        Os serviços a serem realizados são exclusivamente aqueles especificados na
        Ordem de Serviço mencionada, não abrangendo quaisquer outros defeitos, vícios ou
        inconformidades não descritos neste ato, ainda que preexistentes.
      </Text>

      {/* ── Cláusula 2 ── */}
      <Text style={styles.termSub}>
        2. DO ESTADO DO EQUIPAMENTO, CHECKLIST DE RECEBIMENTO E ACESSÓRIOS
      </Text>
      <Text style={styles.termText}>
        O CONTRATANTE declara, de forma expressa e irretratável, que verificou e
        confirmou, no momento da entrega do equipamento à PRESTADORA, o estado físico e
        funcional do aparelho, bem como a relação de acessórios entregues, conforme
        checklist descrito na Ordem de Serviço nº {so.id}.{'\n\n'}
        Ao assinar o presente termo, o CONTRATANTE atesta que:{'\n'}
        (a) o checklist de recebimento reflete fielmente a condição do equipamento no
        momento da entrada, incluindo avarias, riscos, trincas, manchas e demais danos
        estéticos ou funcionais pré-existentes;{'\n'}
        (b) a relação de acessórios entregues (capas, cabos, carregadores, cartões de
        memória, películas, entre outros) está corretamente registrada na OS;{'\n'}
        (c) não serão aceitas reclamações posteriores relativas a danos, avarias ou
        ausência de acessórios não registrados neste ato, seja por omissão do CONTRATANTE
        ou por alegação diversa do conteúdo aqui consignado.{'\n\n'}
        A PRESTADORA não se responsabiliza por arranhões, trincas, quebras ou danos
        estéticos preexistentes, tampouco por acessórios não discriminados na OS.
        Itens não entregues junto ao equipamento (senhas, PINs, credenciais de conta)
        são de responsabilidade exclusiva do CONTRATANTE.
      </Text>

      {/* ── Cláusula 3 ── */}
      <Text style={styles.termSub}>3. DO PAGAMENTO E DA AQUISIÇÃO DE PEÇAS</Text>
      <Text style={styles.termText}>
        O valor total dos serviços e peças acordado é de{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>
          {formatCurrency(so.finalPrice)}
        </Text>
        , devendo ser pago integralmente pelo CONTRATANTE no ato da contratação, como
        condição para o início da prestação dos serviços.{'\n\n'}
        Em razão do modelo operacional da PRESTADORA — que adquire as peças necessárias
        imediatamente após a confirmação e pagamento pelo CONTRATANTE —, o valor
        recebido é considerado definitivamente quitado a partir do momento em que a
        aquisição dos componentes é efetuada, sendo vedado o estorno ou reembolso após
        essa etapa, exceto nas hipóteses expressamente previstas no Código de Defesa do
        Consumidor (Lei nº 8.078/1990).{'\n\n'}
        Caso o serviço não possa ser concluído por impossibilidade técnica superveniente,
        devidamente comprovada pela PRESTADORA, o valor pago será devolvido ao
        CONTRATANTE, deduzidos os custos com peças já adquiridas e eventuais despesas de
        diagnóstico, mediante apresentação de nota fiscal e comunicação formal.{'\n\n'}
        Em nenhuma hipótese serão realizados serviços adicionais além dos contratados sem
        prévia comunicação e autorização expressa do CONTRATANTE.
      </Text>

      {/* ── Cláusula 4 ── */}
      <Text style={styles.termSub}>4. DAS RESPONSABILIDADES DA PRESTADORA</Text>
      <Text style={styles.termText}>
        A PRESTADORA compromete-se a:{'\n'}
        (a) executar os serviços contratados com diligência, técnica adequada e dentro
        dos padrões de qualidade exigíveis, em conformidade com o CDC;{'\n'}
        (b) zelar pela integridade do equipamento durante o período em que estiver sob
        sua guarda, respondendo por danos causados comprovadamente por negligência ou
        imperícia de seus técnicos;{'\n'}
        (c) comunicar ao CONTRATANTE, antes de qualquer ação, caso seja identificada
        durante a execução a necessidade de serviços ou peças não contemplados no
        escopo original, submetendo novo orçamento para aprovação;{'\n'}
        (d) utilizar peças adequadas ao reparo contratado, informando expressamente ao
        CONTRATANTE, na OS, a origem das peças (originais, OEM ou compatíveis), em
        cumprimento ao art. 21 do CDC;{'\n'}
        (e) disponibilizar ao CONTRATANTE comprovante de serviço executado e termo de
        garantia no ato da entrega do equipamento.{'\n\n'}
        A PRESTADORA não se responsabiliza por: danos decorrentes de mau uso após a
        entrega; vícios ou defeitos preexistentes não relacionados ao serviço contratado;
        perda de dados, arquivos, senhas, configurações ou aplicativos armazenados no
        equipamento; danos causados por agentes externos após a devolução ao CONTRATANTE;
        nem por equipamentos com sinais de violação, umidade, corrosão ou intervenções
        anteriores não declaradas.
      </Text>

      {/* ── Cláusula 5 ── */}
      <Text style={styles.termSub}>5. DAS RESPONSABILIDADES DO CONTRATANTE</Text>
      <Text style={styles.termText}>
        O CONTRATANTE declara e se compromete a:{'\n'}
        (a) fornecer informações verdadeiras e completas sobre o defeito, histórico e
        condições de uso do equipamento, ciente de que omissões ou falsidades poderão
        comprometer a execução do serviço e isentar a PRESTADORA de eventuais
        responsabilidades;{'\n'}
        (b) realizar, antes da entrega do equipamento, backup completo de todos os dados,
        arquivos, fotos, contatos e demais informações armazenadas, eximindo a
        PRESTADORA de qualquer responsabilidade por perda de dados decorrente dos
        procedimentos técnicos necessários;{'\n'}
        (c) retirar o equipamento no prazo máximo de{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>30 (trinta) dias corridos</Text>{' '}
        após a comunicação de conclusão do serviço, sob pena de incidência de taxa de
        permanência, conforme previsto na Cláusula 8 deste instrumento;{'\n'}
        (d) não realizar qualquer intervenção no equipamento durante o período de
        garantia sem comunicação prévia à PRESTADORA, sob pena de perda total da garantia;{'\n'}
        (e) apresentar este termo e a OS no ato da retirada do equipamento, como medida
        de segurança contra retiradas indevidas.
      </Text>

      {/* ── Cláusula 6 ── */}
      <Text style={styles.termSub}>6. DA GARANTIA</Text>
      <Text style={styles.termText}>
        Os serviços executados e as peças instaladas terão garantia de{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>90 (noventa) dias corridos</Text>,
        contados da data de entrega do equipamento ao CONTRATANTE, nos termos do
        art. 26, II, do Código de Defesa do Consumidor, válida exclusivamente para os
        serviços e componentes descritos na OS nº {so.id}.{'\n\n'}
        A garantia perderá sua validade nas seguintes hipóteses:{'\n'}
        (a) danos causados por mau uso, quedas, impactos, umidade, líquidos ou agentes
        externos após a entrega;{'\n'}
        (b) tentativa de reparo, abertura ou modificação do equipamento por terceiros
        não autorizados durante o período de garantia;{'\n'}
        (c) danos por vírus, softwares maliciosos ou instalação inadequada de programas;{'\n'}
        (d) desgaste natural de componentes (baterias, conectores, botões);{'\n'}
        (e) defeitos em partes não contempladas no serviço contratado.{'\n\n'}
        O acionamento da garantia deverá ser feito presencialmente, com apresentação
        deste termo e da OS, dentro do prazo estipulado. Constatada a procedência do
        vício coberto pela garantia, a PRESTADORA providenciará, a seu critério
        técnico, o reparo, a substituição da peça ou a repetição do serviço, sem
        custos adicionais ao CONTRATANTE.
      </Text>

      {/* ── Cláusula 7 ── */}
      <Text style={styles.termSub}>7. DA PROTEÇÃO DE DADOS E PRIVACIDADE</Text>
      <Text style={styles.termText}>
        O CONTRATANTE declara estar ciente de que determinados procedimentos técnicos
        podem exigir acesso ao sistema operacional, arquivos internos ou configurações
        do equipamento, sendo esse acesso limitado ao estritamente necessário para a
        execução dos serviços contratados.{'\n\n'}
        A PRESTADORA compromete-se a não acessar, copiar, divulgar ou compartilhar
        quaisquer dados pessoais, arquivos, mensagens, fotos ou informações armazenadas
        no equipamento, em cumprimento à Lei Geral de Proteção de Dados (Lei nº
        13.709/2018 — LGPD).{'\n\n'}
        O CONTRATANTE é o único responsável pela realização de cópia de segurança
        (backup) de seus dados antes da entrega do equipamento. A PRESTADORA não se
        responsabiliza, em nenhuma hipótese, por perda de dados, formatações necessárias
        ao serviço, redefinições de fábrica ou qualquer apagamento de informações que
        seja tecnicamente indispensável para a conclusão do reparo.
      </Text>

      {/* ── Cláusula 8 ── */}
      <Text style={styles.termSub}>8. DA RETIRADA DO EQUIPAMENTO E DO ABANDONO</Text>
      <Text style={styles.termText}>
        O CONTRATANTE será notificado pela PRESTADORA, pelos meios de contato
        informados na OS, tão logo o serviço esteja concluído, devendo retirar o
        equipamento no prazo máximo de{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>30 (trinta) dias corridos</Text>{' '}
        a contar da referida comunicação.{'\n\n'}
        Decorrido esse prazo sem a retirada, a PRESTADORA poderá cobrar taxa de
        permanência/guarda no valor estipulado em sua tabela vigente, sem prejuízo de
        outras medidas cabíveis.{'\n\n'}
        Transcorridos{' '}
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>90 (noventa) dias corridos</Text>{' '}
        do encerramento do serviço sem a retirada do equipamento, mesmo após notificação
        formal com Aviso de Recebimento (AR), o bem poderá ser considerado abandonado e
        encaminhado à autoridade competente para destinação legal, nos termos do
        art. 1.275 do Código Civil e legislação aplicável, ficando a PRESTADORA isenta
        de qualquer responsabilidade ulterior.
      </Text>

      {/* ── Cláusula 9 ── */}
      <Text style={styles.termSub}>9. DAS DISPOSIÇÕES GERAIS</Text>
      <Text style={styles.termText}>
        O presente instrumento é regido pelas disposições do Código de Defesa do
        Consumidor (Lei nº 8.078/1990), pelo Código Civil Brasileiro (Lei nº
        10.406/2002) e pela legislação aplicável em vigor. Nenhuma cláusula deste termo
        poderá ser interpretada de modo a afastar direitos garantidos ao CONTRATANTE
        por norma de ordem pública.{'\n\n'}
        O CONTRATANTE declara ter lido, compreendido e concordado com todas as cláusulas
        do presente instrumento, bem como com o checklist de recebimento e a relação de
        acessórios constantes na Ordem de Serviço nº {so.id}, reconhecendo-os como
        fidedignos e vinculantes, assinando-os de livre e espontânea vontade.
      </Text>

      {/* ── Cláusula 10 ── */}
      <Text style={styles.termSub}>10. DO FORO</Text>
      <Text style={styles.termText}>
        As partes elegem o Foro da Comarca de [CIDADE — ESTADO] para dirimir quaisquer
        controvérsias decorrentes do presente instrumento, renunciando a qualquer outro,
        por mais privilegiado que seja.
      </Text>

      <Text style={styles.termDate}>[Cidade], {today}.</Text>

      <View style={styles.termSigArea}>
        <View style={styles.termSigBox}>
          <View style={styles.termSigLine} />
          <Text style={styles.termSigName}>{so.costumer.name}</Text>
          <Text style={styles.termSigSub}>CPF: {formatCPF(so.costumer.cpf)}</Text>
          <Text style={styles.termSigSub}>Contratante</Text>
        </View>
        <View style={styles.termSigBox}>
          <View style={styles.termSigLine} />
          <Text style={styles.termSigName}>{companyInfo.name}</Text>
          {companyInfo.responsible && (
            <Text style={styles.termSigSub}>{companyInfo.responsible}</Text>
          )}
          <Text style={styles.termSigSub}>Prestadora de Serviços</Text>
        </View>
      </View>

      <Text
        style={styles.pageNum}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

// ─── Root Document ────────────────────────────────────────────────────────────

interface ServiceOrderDocumentProps {
  serviceOrder: ServiceOrder;
  companyInfo: CompanyInfo;
  logo?: string | null;
}

const ServiceOrderDocument: React.FC<ServiceOrderDocumentProps> = ({
  serviceOrder: so,
  companyInfo,
  logo,
}) => (
  <Document>
    {/* ── Page 1: Service Order ── */}
    <Page size="A4" style={styles.page}>
      <HeaderSection logo={logo} companyInfo={companyInfo} />

      <View style={styles.titleBar}>
        <Text style={styles.titleText}>ORDEM DE SERVIÇO Nº {so.id}</Text>
        <Text style={styles.titleDate}>{formatDate(so.entryDate)}</Text>
      </View>

      <ExecutionPeriod so={so} />
      <ClientData costumer={so.costumer} />

      {so.devices?.length > 0 && <DeviceSection devices={so.devices} />}
      {so.services?.length > 0 && <ServicesTable services={so.services} />}
      {so.products && so.products.length > 0 && <ProductsTable products={so.products} />}

      <TotalsSummary so={so} />
      <SignatureSection />

      <Text
        style={styles.pageNum}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>

    {/* ── Last page: Responsibility Term ── */}
    <ResponsibilityTerm so={so} companyInfo={companyInfo} />
  </Document>
);

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Gera e faz o download do PDF da Ordem de Serviço.
 *
 * @param serviceOrder  Entidade ServiceOrder completa
 * @param companyInfo   Dados da empresa: { name, phone, email, responsible }
 * @param logo          URL pública ou base64 de um PNG/JPG (SVG não suportado)
 */
export const generateServiceOrderPDF = async (
  serviceOrder: ServiceOrder,
  companyInfo: CompanyInfo,
  logo: string | null = null
): Promise<void> => {
  const blob = await pdf(
    <ServiceOrderDocument
      serviceOrder={serviceOrder}
      companyInfo={companyInfo}
      logo={logo}
    />
  ).toBlob();

  const fileName = `OS_${serviceOrder.id}_${(serviceOrder.costumer?.name ?? 'cliente')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')}.pdf`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};