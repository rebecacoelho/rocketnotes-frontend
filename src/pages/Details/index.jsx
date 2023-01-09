import { Container, Links, Content } from "./styles";

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Tag } from "../../components/Tag";

import { api } from "../../services/api";

export function Details() { // nome do componente letra maiuscula no começo
  // 1 componente so retorna 1 elemento (1 div para tudo ou fragment que nao tem impacto visual ou seja nao usa css)
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
      async function fetchNote() {
        const response = await api.get(`/notes/${params.id}`);
        setData(response.data);
      }

      fetchNote();
  }, []);

  return ( // conteúdo da interface
    <Container>
      <Header />

      {
        data &&
          <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />

            <h1>
              {data.title}
            </h1>

            <p>
             {data.description}
            </p>

           { 
            data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">{link.url}</a>
                      </li>
                    ))
                  }
                </Links>
                </Section>
            }

            {
              data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag key={String(tag.id)} title={tag.name} />
                    ))
                  }
                </Section>
            }

            <Button title="Voltar" onClick={handleBack}/>
          </Content>
          </main>
      }
    </Container>
  )
} 