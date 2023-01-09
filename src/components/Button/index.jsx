import { Container } from "./styles";

export function Button({ title, loading = false /* valor pradrao se nao tiver loading */, ...rest }) {

  return (
  <Container type="button" disabled={loading} {...rest}> 
    {loading ? 'Carregando...' : title}
  </Container>
  );
}