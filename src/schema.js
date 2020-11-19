import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";


//api파일 폴더 아래 모든 graphql
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname,"/api/**/*.js"))

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
})

export default schema;