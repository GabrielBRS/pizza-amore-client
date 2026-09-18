# Pizza Amore

Site institucional da Pizza Amore, reunindo as unidades **Villa Pizza Amore** (Guará II) e **Casa Pizza Amore** (Gama).

## Tecnologias

- React 19
- TypeScript
- Vite
- Lucide React

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

O cardápio, o telefone e a localização das duas unidades foram cadastrados a partir das informações fornecidas.

### Villa Pizza Amore — Guará II

- QE 36, Conjunto I, próximo ao posto de gasolina
- WhatsApp: (61) 9 9881-2648
- Atendimento: todos os dias, das 19h às 23h

### Casa Pizza Amore — Gama

- SOE Q 19, Casa 93A — Gama, Brasília — DF, CEP 72420-190
- WhatsApp: (61) 9 9881-2648
- Atendimento: todos os dias, das 19h às 23h

## Imagens provisórias

- Forno: Vilmantas Bekesius / Unsplash
- Pizza na mesa: Anhelina Vasylyk / Pexels

As fotos podem ser substituídas pelas imagens oficiais da Pizza Amore.

## Deploy

O orquestrador em `deploy/iac.py` publica o build Vite no cluster RKE2/Rancher.

- Rancher: https://rancher.orzyon.ai/dashboard/c/local/explorer/apps.deployment
- Cluster: `local`
- Nó SSH: `gabrielsousa@fda2:67cd:dd48:1100::100`
- Namespace: `pizzaamore`
- Deployment: `pizzaamore`
- Container: `pizzaamore-web`
- Ingresses: `pizzaamore.com.br` e `www.pizzaamore.com.br`

```bash
python3 iac.py setup-sudo  # somente na primeira configuração do servidor
python3 iac.py doctor
python3 iac.py status
python3 iac.py deploy --force
```

A verificação pós-deploy passa pelo Traefik usando `pizzaamore.com.br` e confirma que a página publicada contém a marca Pizza Amore.
