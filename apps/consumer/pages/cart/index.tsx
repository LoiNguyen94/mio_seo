import { TransitionLayout, Header, Cart } from '@nxseo/ui-shares';

export interface ProductProps {
  id: number;
  data: any;
}

function Products(props: ProductProps) {
  const { data } = props;
  return (
    <div>
      <TransitionLayout
        title="Tất cả sản phẩm"
        description="Mua mọi thứ"
        photo=""
      >
        <>
          <Header title={'Giỏ hàng'} />
          <Cart />
        </>
      </TransitionLayout>
    </div>
  );
}

export async function getStaticProps(context) {
  // Fetch data from external API
  //   const res = await fetch(`https://dev-api.itaphoa.com/customer/products`);
  //   const data = await res.json();
  const data = [];
  // Pass data to the page via props
  return { props: { data } };
}

export default Products;
