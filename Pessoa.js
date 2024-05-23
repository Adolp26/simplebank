// models/pessoaModel.js
const db = require('./db');

class Pessoa {
  static async criarPessoa(nome, email, telefone, endereco) {
    const query = 'INSERT INTO pessoas (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nome, email, telefone, endereco];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async listarPessoas() {
    const query = 'SELECT * FROM pessoas';
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async obterPessoaPorId(id) {
    const query = 'SELECT * FROM pessoas WHERE id = $1';
    const values = [id];
    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error('Pessoa não encontrada');
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async atualizarPessoa(id, nome, email, telefone, endereco) {
    const query = 'UPDATE pessoas SET nome = $1, email = $2, telefone = $3, endereco = $4 WHERE id = $5 RETURNING *';
    const values = [nome, email, telefone, endereco, id];
    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error('Pessoa não encontrada');
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deletarPessoa(id) {
    const query = 'DELETE FROM pessoas WHERE id = $1 RETURNING *';
    const values = [id];
    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error('Pessoa não encontrada');
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pessoa;
