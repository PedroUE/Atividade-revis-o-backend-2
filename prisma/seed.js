import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.filme.createMany({
        data: [
            {
                titulo: 'Interestelar',
                descricao:
                    'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
                duracao: 169,
                genero: 'Ficção Científica',
                nota: 8.7,
            },
            {
                titulo: 'O Poderoso Chefão',
                descricao:
                    'O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
                duracao: 175,
                genero: 'Drama',
                nota: 9.2,
            },
            {
                titulo: 'Batman: O Cavaleiro das Trevas',
                descricao:
                    'Quando a ameaça conhecida como o Coringa surge de seu passado, ele causa caos e medo no povo de Gotham.',
                duracao: 152,
                genero: 'Ação',
                nota: 9.9,
            },
            {
                titulo: 'Parasita',
                descricao:
                    'Toda a família de Ki-taek está desempregada e vive em um porão, até que o filho consegue um emprego na casa da rica família Park.',
                duracao: 132,
                genero: 'Suspense',
                nota: 8.5,
            },
            {
                titulo: 'A Viagem de Chihiro',
                descricao:
                    'Durante a mudança de sua família para o subúrbio, uma menina de 10 anos entra em um mundo governado por deuses, bruxas e espíritos.',
                duracao: 125,
                genero: 'Animação',
                nota: 8.6,
            },
            {
                titulo: 'Invocação do Mal',
                descricao:
                    'Investigadores paranormais trabalham para ajudar uma família aterrorizada por uma presença sombria em sua fazenda.',
                duracao: 112,
                genero: 'Terror',
                nota: 7.5,
            },
            {
                titulo: 'Superbad - É Hoje',
                descricao:
                    'Dois estudantes enfrentam ansiedade de separação enquanto tentam comprar bebida para uma festa e impressionar as garotas.',
                duracao: 113,
                genero: 'Comédia',
                nota: 7.6,
            },
            {
                titulo: 'La La Land: Cantando Estações',
                descricao:
                    'Enquanto perseguem seus sonhos em Los Angeles, um pianista de jazz e uma aspirante a atriz se apaixonam.',
                duracao: 128,
                genero: 'Romance',
                nota: 8.0,
            },
            {
                titulo: 'Matrix',
                descricao:
                    'Um hacker descobre a natureza real de sua realidade e seu papel na guerra contra seus controladores.',
                duracao: 136,
                genero: 'Ficção Científica',
                nota: 8.7,
            },
            {
                titulo: 'Cidade de Deus',
                descricao:
                    'Nas favelas do Rio de Janeiro, dois rapazes seguem caminhos diferentes: um se torna fotógrafo e o outro traficante.',
                duracao: 130,
                genero: 'Drama',
                nota: 8.6,
            },
        ],
        skipDuplicates: true,
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
