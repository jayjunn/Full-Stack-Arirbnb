import Image from 'next/image';
import Container from './components/Container';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
import { IListing, getListings } from './actions/getList';
import EmptyState from './components/EmptyState';
interface IParams {
  searchParams: IListing;
}

const Home = async ({ searchParams }: IParams) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="
            pt-24
            grid 
            grid-cols-1
            [320px]:cols-2
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8 ">
        {listings.map((listing) => (
          <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};
export default Home;
