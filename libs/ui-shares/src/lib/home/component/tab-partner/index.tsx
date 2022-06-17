export interface TabPartnerProps {
  id?: string;
  data?: any;
}

export function TabPartner({ data }: TabPartnerProps) {
  return (
    <div
      style={{
        backgroundColor: '#f5f6f9',
        paddingTop: 21,
        paddingBottom: 120,
        width: '100%',
      }}
    >
      <div>Tab partner</div>
    </div>
  );
}

export default TabPartner;
