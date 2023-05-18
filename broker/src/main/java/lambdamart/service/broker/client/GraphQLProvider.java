package lambdamart.service.broker.client;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

@Configuration
public class GraphQLProvider {

    @Autowired
    private GraphQLDataFetchers dataFetchers;

    @Bean
    public GraphQL graphQL() throws Exception {
        InputStream stream = new ClassPathResource("graphql/schema.graphql").getInputStream();
        String schema = new String(stream.readAllBytes());

        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(schema);

        RuntimeWiring runtimeWiring = buildWiring();

        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

        return GraphQL.newGraphQL(graphQLSchema).build();
    }

    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query", builder -> builder
                        .dataFetcher("vendors", dataFetchers.getVendorDataFetcher())
                        .dataFetcher("item", dataFetchers.getItemDataFetcher())
                        .dataFetcher("product", dataFetchers.getProductDataFetcher())
                        .dataFetcher("products", dataFetchers.getProductsDataFetcher()))
                .type("Mutation", builder -> builder
                        .dataFetcher("purchase", dataFetchers.getPurchaseDataFetcher()))
                .build();
    }
}
