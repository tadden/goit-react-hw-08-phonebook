import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import ContentContainer from 'components/ContentContainer';

export default function ContactsPage() {
  return (
    <ContentContainer>
      <ContactForm />
      <Filter />
      <ContactList />
    </ContentContainer>
  );
}
