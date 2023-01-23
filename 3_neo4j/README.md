# Neo4J

[Neo4J official guide](https://neo4j.com/developer/get-started/)

Neo4J is a native graph database. A Neo4J database is a collection of nodes, and every node can be linked to the other through relations. This allows you to query the database with a complex relation request among the data, faster than other databses (Neo4J relations vs index).

![example](./img/ex.png)

# The Property Graph Model
In Neo4j, information is organized as nodes, relationships, and properties. Nodes are the entities in the graph.

- Nodes can be tagged with labels, representing their different roles in your domain. (For example, Person).
- Nodes can hold any number of key-value pairs, or properties. (For example, name)
- Node labels may also attach metadata (such as index or constraint information) to certain nodes.

Relationships provide directed, named, connections between two node entities (e.g. Person LOVES Person).

- Relationships always have a direction, a type, a start node, and an end node, and they can have properties, just like nodes.
- Nodes can have any number or type of relationships without sacrificing performance.
- Although relationships are always directed, they can be navigated efficiently in any direction.
If you’d like to learn more about any of these, you can read more about Graph Data Modeling.

# Create your Neo4J database

[register an account](https://neo4j.com/cloud/platform/aura-graph-database/?ref=developer-guides)


create a new instance