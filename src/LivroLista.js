import React, { useState, useEffect } from 'react';
import { Button, Table, Container } from 'reactstrap'; // Importa os componentes Button, Table e Container do reactstrap
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const obterLivros = async () => {
            const livros = controleLivro.obterLivros();
            setLivros(livros);
            setCarregado(true);
        };

        obterLivros();
    }, [carregado]);

    const excluirLivro = (codigoLivro) => {
        controleLivro.excluir(codigoLivro);
        setCarregado(false);
    };

    const LinhaLivro = ({ livro }) => {
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

        return (
            <tr key={livro.codigo}>
                <td>{livro.titulo}</td>
                <td>{nomeEditora}</td>
                <td>{livro.resumo}</td>
                <td>
                    <ul>
                        {livro.autores.map((autor, index) => (
                            <li key={index}>{autor}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    {/* Botão de exclusão com estilo Bootstrap usando reactstrap */}
                    <Button color="danger" onClick={() => excluirLivro(livro.codigo)}>Excluir</Button>
                </td>
            </tr>
        );
    };

    return (
        <main>
            <h1 className="text-center mb-5">Lista de Livros</h1>
            {/* Container para centralizar a tabela */}
            <Container className="text-center">
                {/* Tabela Bootstrap estilizada usando reactstrap */}
                <Table>
                    <thead>
                        <tr>
                            <th className="fs-5">Título</th>
                            <th className="fs-5">Editora</th>
                            <th className="fs-5">Resumo</th>
                            <th className="fs-5">Autores</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <LinhaLivro key={livro.codigo} livro={livro} />
                        ))}
                    </tbody>
                </Table>
            </Container>
        </main>
    );
};

export default LivroLista;
