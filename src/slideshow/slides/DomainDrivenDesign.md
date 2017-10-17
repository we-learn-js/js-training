# Domain Driven Design

<!--section-->

As Uncle Bob wrote in [Screaming Architecture](https://8thlight.com/blog/uncle-bob/2011/09/30/Screaming-Architecture.html):

> A good software architecture allows decisions about frameworks, databases, web-servers, and other environmental issues and tools, to be deferred and delayed.

> A good architecture makes it unnecessary to decide on Rails, or Spring, or Hibernate, or Tomcat or MySql, until much later in the project.

> A good architecture makes it easy to change your mind about those decisions too.

> A good architecture emphasizes the use-cases and decouples them from peripheral concerns.


<!--section-->

## What is it all about ???

> All started from a book of Eric Evans,

> [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

> Published in 2003, which is "yesterday" in the programming world...

<!--slide-->

### What is DDD ?

> Focus on the core complexity and opportunity in the **domain**. Not focusing on a platform, an implementation, etc.

> Explore **models** in a collaboration of **domain experts** and **software experts**.

> Write software that expresses those **models** explicitly.

> Speak an **ubiquious language** within a **bounded context**.

<!--slide-->

### What is the Domain

> Software development is most often applied to automating processes that exist in the real world, or providing solutions to real business problems.

> The business processes being automated or real world problems is the domain of the software.

<!--slide-->

### What is a Model

> Representation of terminology and concepts of the domain.

> Identifies relationships between entities in the **context** of the **domain**.

> Gives a structured vision of the domain.

> Not an UML Diagram. But can be represented by it.

> **The code must be an expression  of the model.**

<!--slide-->

![Domain Model example](http://www.agiledata.org/images/admInitialDomainModel.gif)

<!--slide-->

### The Ubiquitous Language

> The developers have their minds full of classes, methods, algorithms, patterns, and tend to always make a match between a real life concept and a programming artifact.

> Domain experts talk about those things in their own jargon, which sometimes is not so straightforward to follow by an outsider.

> Communication at designing level is the paramount of success of the project.

> There’s no us versus them it’s always us.

<!--slide-->

![Ubiquitous Language](https://www.infoq.com/resource/articles/ddd-contextmapping/en/resources/ddd-contextmapping-figure1.gif)

<!--slide-->

> It's the common language. Ubiquitous means "everywhere".

> The process to define a common language is iterative. We have to work on it and polish it with help of diagrams, descriptive texts, and specially verbal communication.

> We definitely need to speak the same language when we meet to talk about the model and to define it.

> **Bounded context** is want makes the ubiquitous language meaningful.

<!--slide-->

### Bounded Context (sub domains)

> When we deal with a single model, the context is implicit. We do not need to define it. A model should be small enough to be assigned to one team.

> Mixing all models together within the same Context can lead to ambiguity and confusion.

> The main idea is to define the scope of a model, to draw up the boundaries of its context, then do the most possible to keep the model unified.

> Each model has a context.

<!--slide-->

#### Bounded Context and the Ubiquitous Language

> The **Ubiquitous Language** inside a boundary has a specific contextual meaning. Concepts outside of this context can have different meanings.

> There is a single Ubiquitous language for each **Bounded Context**.


<!--slide-->

#### Example: E-commerce website

> What could be the ubiquitous language of an e-commerce?

> * **Catalog**: Users on your website must be able to search and see information about products
> * **Orders, Payment**: Your customers should be able to place orders, pay for it and receive their goodies
> Delivery: your employees should have a tool to manage deliveries on new orders and update delivery info for users.
> * **Inventory**: Your solution must provide inventory control for each product that is available to sell
> * **Customer** management: Your solution must be able to manage customer registries


[Source](https://www.codeproject.com/Articles/1094774/Domain-Driven-Design-A-hands-on-Example-Part-of)

<!--slide-->

The Domain (non DDD)

![Undivided Domain](https://4.bp.blogspot.com/-XXkwE3Y_5Vs/Vr1DbB5MhjI/AAAAAAAABGQ/DPcPQ_h0WCg/s1600/picture1.jpg)

<!--slide-->

> The Ubiquitous Language can be confusing.

> Imagine we want to introduce the concept of a t-shirt.

> Within the catalog Context, a t-shirt would be a product with properties like color, size, material, and maybe some fancy pictures.

> In the inventory system, however, we don’t really want to concern ourselves with these things. Here, a product has a different meaning, where we care about different properties like weight, location in the warehouse, or dimensions.

<!--slide-->

The Domain, with bounded contexts

![Bounded Contexts](https://www.codeproject.com/KB/architecture/1094774/picture2.jpg)

<!--slide-->

"Product" in the Catalog context

![Catalog Product](https://1.bp.blogspot.com/-ffzdNCk-Cq4/VtGuMqWQXSI/AAAAAAAABGs/pIK7PX0ZKq0/s1600/picture2.jpg)

<!--slide-->

"Product" in the Orders context

![Catalog Product](https://4.bp.blogspot.com/-iGWNmUcCzfQ/VtH4trZH84I/AAAAAAAABHQ/5hnCpaHZ534/s1600/picture4.jpg)

<!--slide-->

### Context Map

> An individual bounded context leaves some problems in the absence of a global view. The context of other models may still be vague and in flux.

> A Context Map is a document which outlines the different **Bounded Contexts** and the relationships between them.

> A Context Map can be a diagram or it can be any written document. The level of detail may vary. What it is important is that everyone working on the project shares and understands it.

<!--slide-->

![Bounded Context](https://martinfowler.com/bliki/images/boundedContext/sketch.png)

<!--slide-->

### Integrating Bounded Contexts

> Bounded Context have dependencies between each other.

> They could be forced to share entities, o need some services from foreign contexts.

> Several patterns are possible to make the process easier, or not...

<!--slide-->

#### Shared Kernel

> Designate some subset of the domain model that the two teams agree to share.

> Of course this includes, along with this subset of the model, the subset of code or of the database design associated with that part of the model.

> This explicitly shared stuff has special status, and shouldn’t be changed without consultation with the other team.

> The purpose of the Shared Kernel is to reduce duplication, but still keep two separate contexts.

<!--slide-->

![Shared Kernel](https://image.slidesharecdn.com/domain-driven-design-2008-dec-1229438454167948-1/95/taming-complex-domains-with-domain-driven-design-67-728.jpg?cb=1231464807)

<!--slide-->

#### Customer-Supplier

> The reporting team should play the customer role, while the e-shopping team should play the supplier role.

> The customer team should present its requirements, while the supplier team should make the plans accordingly.


<!--slide-->

#### Conformist

> This is much like the Shared Kernel, but there is an important difference.

> The customer team cannot make changes to the kernel. They can only use it as part of their model, and they can build on the existing code provided.

<!--slide-->

### What is DDD ? Getting it...

> Focus on the core complexity and opportunity in the **domain**. Not focusing on a platform, an implementation, etc.

> Explore models in a collaboration of domain experts and software experts.

> Write software that expresses those **models** explicitly.

> Speak an **ubiquious language** within a **bounded context**.

<!--slide-->

### Business value of DDD

> * Useful and meaningful **model** of its **domain**
> * **Domain Experts** contribute to software design
> * Better **user experience**
> * Clear boundaries
> * **Better architecture** organization
> * Iterative and continuous modeling in an Agile fashion


<!--slide-->

### Practice

> Make groups by teams. Discuss your domain.

> Discuss about your bounded contexts and its models.

> Later you will have to present it to the rest of the groups.

<!--section-->

## Building blocks

<!--slide-->

### Value Objects

> An object that contains attributes but has no conceptual identity.

> Value Objects can be seen as small, simple objects — such as money or a date range — whose equality is not based on identity, but instead on the content held.

> Their identity is based on their state rather than on their object identity.

> It is highly recommended that value objects be **immutable**. They are created with a constructor, and never modified during their life time.

<!--slide-->

#### Examples

> String, Number, ...

> Color (red, green, blue), Money (number, device), Date (day, month, year), ...

> A business card: When people exchange business cards, they generally do not distinguish between each unique card they only are concerned about the information printed on the card. In this context, business cards are value objects.

<!--slide-->

### Entities

> An object that is not defined by its attributes, but rather by a thread of continuity and its identity.

> It is important for two objects with different identities to be to be easily distinguished by the system, and two objects with the same identity to be considered the same by the system.

> An **Entity** always has a unique id. As long as there is a unique Id it's an entity.

<!--slide-->

#### Examples

> A person. A person always has an Identity and it’s always the same in terms of their name or identification card.

> An order in an e-commerce system. In such a context, every new order created has its own Identity and it’s the same over time.

> These concepts have an Identity that endures over time. These concepts' state evolves over time. They are mutable.

<!--slide-->

#### Entities Objects VS Value Objects

> Entity is "who or which", a Value Object is "what".

> Entity only when it has a continuity and a life cycle.

> Depending on the Domain, a same concept can be an entity of value object.

> Most airlines distinguish each seat uniquely on every flight. Each seat is an entity in this context. However, Southwest Airlines, EasyJet and Ryanair do not distinguish between every seat all seats are the same. In this context, a seat is actually a value object.


<!--slide-->

#### Practice

> Think about the concept of an address (street, number, zip code, etc.).

> What is a possible context where an address could be modeled as an Entity and not as a Value Object? Discuss your findings with a peer.

Note: Billing address?

<!--slide-->

### Aggregates

> It's a group of associated objects which are considered as one unit with regard to data changes.

> Each Aggregate has one root. The root is an Entity, and it is the only object accessible from outside.

> The root can hold references to any of the aggregate objects, and the other objects can hold references to each other, but an outside object can hold references **ONLY** to the root object.

> Aggregates are Entities that hold other Entities and Value Objects that help keep data consistent.



<!--slide-->

> Prevents data inconsistency. They are consistency boundaries.

> Since other objects can hold references only to the root, it means that they cannot directly change the other objects in the aggregate. All they can do is to change the root, or ask the root to perform some actions.

> **Design aggregates based on business true invariants**

<!--slide-->

#### Example: Order aggregate

An order holds line-items, these will be separate objects, but it is useful to treat the order (together with its line items) as a single aggregate.

When a line-item is removed or added, order's amount must be updated.

If line-item is removed outside of the aggregate, the order amount will not be updated and that would break data consitency.

<!--slide-->

#### Example: Customer aggregate

A banking system holds and processes customer data. This data includes customer personal data, like name, address, phone numbers, job description, and account data: account number, balance, operations performed, etc.

When the system archives or completely deletes information about a customer, it has to make sure that all the references are removed. If many objects hold such references, it is difficult to ensure that they are all removed.

<!--slide-->

![Aggregates](https://www.lavinski.me/content/images/2014/Apr/Domain-Driven-Design-Concepts.png)

<!--slide-->

### Practice

> Taking the domain defined on previous practice, discuss what would be the main entities/values/aggregates of your domain.

<!--slide-->

### Factories

> In a model-driven design, objects have a life cycle starting with creation and ending with deletion or archiving. A constructor or a Factory takes care of object creation.

> Shift the responsibility for creating instances of complex objects and Aggregates to a separate object, which may itself have no responsibility in the domain model but is still part of the domain design.

<!--slide-->

> It defines an interface for creating an object, but leaves the choice of its type to the subclasses, creation being deferred at run-time.

> Adding a Factory Method in the Aggregate Root hides the internal implementation details of creating Aggregates from any external client.


<!--slide-->

### Repositories

> The Repository may store references to some of the objects. When an object is created, it may be saved in the Repository, and retrieved from there to be used later.

> It encapsulates all the logic needed to obtain object references.

> If the client requested an object from the Repository, and the Repository does not have it, it may get it from the storage. Either way, the Repository acts as a storage place for globally accessible objects.

<!--slide-->

> The overall effect is that the domain model is decoupled from the need of storing objects or their references, and accessing the underlying persistence infrastructure.

> The Repository interface may contain methods used to perform some supplementary calculations like the number of objects of a certain type.


<!--slide-->

#### Repositories and Factories

> While the Factory is concerned with the creation of objects, the Repository takes care of already existing objects.

> The Repository may cache objects locally, but most often it needs to retrieve them from a persistent storage.

> We should not mix a Repository with a Factory. The Factory should create new objects, while the Repository should find already created objects.

> When a new object is to be added to the Repository, it should be created first using the Factory, and then it should be given to the Repository which will store it.

<!--slide-->

#### Repositories and aggregates

> If two Entities don’t belong to the same Aggregate, both will have their own Repository.

> If a **true business invariant** exists and two Entities belong to the same Aggregate, you’ll only have one Repository. This Repository will be the one for the root Entity.

<!--slide-->

### Services

> When a significant process or transformation in the domain is not a natural responsibility of an **Entity** or **Value Object**, add an operation to the model as standalone interface declared as a **Service**.

> Such an object does not have an internal state, and its purpose is to simply provide functionality for the domain.

<!--slide-->

> Define the interface in terms of the language of the model and make sure the operation name is part of the **Ubiquitous Language**.

> Make the **Service** **stateless**. It can be used without the the need previous operations of steps.

<!--slide-->

#### Example: Single operation

```js
class SignUpUserRequest {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}
class SignUpUserResponse {
  constructor (user) {
    this.id = user.getId()
    this.email = user.getEmail()
  }
}
class SignUpUserService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }
  execute(signUpUserRequest) {
    /* Creation of user using userRepository ... */
    return new SignUpUserResponse(user)
  }
}
```

<!--slide-->

#####  Request and Response objects

> Use primitives, easily serializable for communication between systems/implementations (for messaging system for instance.)

> No Business Logic: even validation should be placed in the Domain layer.

> Do not return Entity instances, return primitives or DTOs (Data Transfer Objects)

> The return should not expose behavior like updating the entity.

<!--slide-->

#### Example: Multiple COHESIVE operations

```js
class UserService {
  /**
   * @param request SignUpUserRequest
   * @returns SignUpUserResponse
   */
  signUp(request)
  /**
   * @param request SignUpUserRequest
   * @returns SignUpUserResponse
   */
  signIn(request)
  /**
   * @param request LogOutUserRequest
   * @returns LogoutUserResponse
   */
  logOut(request)
}
```

<!--slide-->

### Domain Events

> A domain object that defines an event (something that happens).

> Domain Events are Events related to Domain changes.

> Domain Events are things that happen in our Domain that **Domain experts care about**.

> Connect all the components to a single object that handles all the important Events in the game.

> Domain Events are **immutable**.

<!--slide-->

> In DDD, Domain Events are fundamental building blocks that help:
>
> * Communicate with other **Bounded Contexts**.
> * Improve performance and scalability, pushing for **eventual consistency**.
> * Serve as historical checkpoints.

> All Events should be represented as verbs in the past tense, as they’re things that have been completed in the past — for example, CustomerRelocated, CargoShipped, or InventoryLossageRecorded.

<!--slide-->

> Domain Events are usually designed as immutable.

> The Constructor will initialize the full state of the Domain Event.

> Domain Events will have getters to access their attributes.

> Include the identity (not the instance) of the Aggregate that performs the action.

> Include other Aggregate identities related to the first one.

> Include parameters that caused the Event (if useful).

<!--slide-->

```js
class DomainEventAbstract
{
  constructor() { this._occurredOn = new Date() }
  /**
  * @returns Date
  */
  occurredOn(){ return this._occuredOn }
}
class UserRegistered extends DomainEventAbstract {
  constructor(userId) {
    super()
    this._userId = userId
  }
  userId(){ return this._userId }
}


```

<!--slide-->

```js
class SignUpUserService {
  /* ... */
  execute(signUpUserRequest) {
    /* Creation of user using userRepository ... */
    DomainEventPublisher.publish(new UserRegistered(user.getId()))
    return new SignUpUserResponse(user)
  }
}
```

<!--slide-->

### Example: Domain Events to communicate between Bounded Contexts

In a ticket sales agency, a content manager decides to increase the price of a U2 show. Using her back office, she edits the show.

A **ShowPriceChanged** Domain Event is published and persisted into the database with the new show price in the same transaction.

A batch process takes the Domain Event and queues it into RabbitMQ. The Domain Event gets distributed in two queues: one for the same local Bounded Context, and another remote one for Business Intelligence purposes.

<!--slide-->

In the first queue, a worker fetches the corresponding Show using the ID in the Event and pushes it into an Elasticsearch server so that the user can see the new price when searching. It could also update the new price in a different database table.

In the second queue, a worker inserts the information into a Logs Server or a Data Lake, where reporting or Data Mining processes can be run.

<!--slide-->

### The big picture

![Building Blocks](http://blog.synopse.info/public/mORMot/DDDBuildingBlocks.png)

<!--section-->

## Architecture

<!--slide-->

####  Layered architecture

> It is the architecture proposed by Eric Evans in [his book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215).

<!--slide-->

![Layered architecture](http://www.papagrigoriou.com/images/2015/architectures/inverted-layers-arch.png)

<!--slide-->

##### User Interface (Presentation) layer

> Responsible for presenting information to the user and interpreting user commands.

> It's at the top and is responsible for processing interactions with a user (or another computer system)

> It depends on all layers below.

<!--slide-->

##### Application Layer

> The Application layer is the area that separates the Domain Model from the clients that query or change its state.

> It orchestrates the collaboration between **domain objects** based on information passed from the **User Interface**.

> It does not contain business logic or make decisions.

> It coordinates and delegates work.

> It does not hold the state of the business objects

> But it can hold the state of an application task progress.

<!--slide-->


##### Domain Layer

> The Domain layer captures and isolates the business logic.

> This is the **heart of the business software**.

> The state of business objects is held here.

> Persistence of the business objects and possibly their state is delegated to the **infrastructure layer** in an indirect way (DIP).

<!--slide-->

##### Infrastructure Layer

> This layer acts as a supporting library for all the other layers.

> It's at the bottom and all upper layers depend on it.

> It provides communication between layers, implements persistence for business objects, renders graphical widgets to the user interface, etc.

> Generally dealing with anything that is considered a technical detail.

<!--slide-->

#### Onion Architecture

> Applies Dependency Inversion Principle (SOLID): High-level modules should not depend on low-level modules. Both should depend on abstractions.

> There is a core “Domain Model” module.

> There is also a “Domain Services” module which depends on the “Domain Model” and so on.

<!--slide-->

![Onion Architecture](https://sbrakl.files.wordpress.com/2014/11/111814_1006_onionarchit6.png?w=625)



<!--slide-->

#### Hexagonal Architecture (Ports and Adapters)


> Each side represents a Port with one or more Adapters.

<!--slide-->

![Hexagonal Architecture](http://josecuellar.net/wp-content/uploads/hexagonalarchitecture.PNG)

[Alistair Cockburn - Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture)


<!--slide-->

![Hexagonal Architecture](https://www.blackpepper.co.uk/wp-content/uploads/2015/11/Hexagonal-Architecture.png)


<!--slide-->

#### Event-Driven Architecture (EDA)


![Event-Driven Architecture](http://josecuellar.net/wp-content/uploads/eda.PNG)

<!--slide-->

### The Big Picture

![Layers Diagram](http://blog.synopse.info/public/mORMot/DDDCleanUncoupledOnionArchitecture.png)


<!--section-->

### Layered Services

> Deciding the layer a Service belongs to is difficult.

> Services are defines not by what they are, but what they do.

> If the operation performed conceptually belongs to the **application layer**, then the Service should be placed there.

> If the operation is about domain objects, and is strictly related to the **domain**, serving a domain need, then it should belong to the **domain layer**.

<!--slide-->

### Domain Services

> Operate only on types belonging to the Domain.

> They contain meaningful concepts that can be found within the **Ubiquitous Language**.

> They hold operations that don’t fit well into Value Objects or Entities.

> Do not depend on specific app. Could be used by other apps. Create a user, update user data, etc.

> Domain Services are **stateless operations**.

<!--slide-->

```js
class Cart {
  createOrder() { }
}
class CreateOrderFromCart{
  /**
   * @param  {Cart} cart
   */
  execute(cart){}
}
```

<!--slide-->

```js
class SignUpUserRequest {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}
class SignUpUserResponse {
  constructor (user) {
    this.id = user.getId()
    this.email = user.getEmail()
  }
}
class SignUpUserService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }
  execute(signUpUserRequest) {
    /* Creation of user using userRepository ... */
    return new SignUpUserResponse(user)
  }
}
```

<!--slide-->

### Application services

> Application Services are the middleware between the outside world and the Domain logic.

> Operate on scalar types (data structures), transforming them into Domain types.

> A scalar type can be considered any type that’s unknown to the Domain Model.

> Use cases of our app are application services that make use of business rules of the Domain layer.

<!--slide-->

```js
class SignUpController extends Controller {

  signUpAction(request) {
    signUpService = new SignUpUserService(this.userRepository)
    try {
      response = signUpService.execute(
        new SignUpUserRequest( request.get('email'), request.get('password') )
      )
    } catch (UserAlreadyExistsException e) {
       return this.render('error.html', response)
    }
    return this.render('signed-up.html')
  }
}
```

<!--slide-->

### Infrastructure services

> They are operations that fulfill infrastructure concerns, such as
> * sending emails
> * storing data in database
> * logging meaningful data

> In terms of Hexagonal Architecture, they live outside the Domain boundary.

> Its interface would be specified in our domain, for invertion of control.

<!--section-->

### Modules

> If your model is telling a story, the Modules are chapters.

> Modules are used as a method of organizing related concepts and tasks in order to reduce complexity.

> It is widely accepted that software code should have a high level of cohesion and a low level of coupling. While cohesion starts at the class and method level, it can be applied at module level.


<!--slide-->

#### Modules cohesion

> Modules should not be treated as a way to separate code but as a way to separate meaningful concepts in the model.

> There are several types of cohesion. Two of the most used are **communicational cohesion and functional cohesion**.

<!--slide-->

> **Communicational cohesion:** is achieved when parts of the module operate on the same data. It makes sense to group them, because there is a strong relationship between them.

> **Functional cohesion**: is achieved when all parts of the module work together to perform a well-defined task. This is considered the best type of cohesion.

<!--slide-->

```
├── catalog
│   ├── package.json
│   ├── src
│   └── tests
├── inventory
│   ├── package.json
│   ├── src
│   └── tests
├── orders
│   ├── package.json
│   ├── src
│   └── tests
└── payments
    ├── package.json
    ├── src
    └── tests
```

<!--slide-->

#### Communication between Modules

> Modules should have well defined interfaces which are accessed by other modules.

> Instead of calling three objects of a module, it is better to access one interface, because it reduces coupling.

> The interface can be anything you want, like a REST API.

<!--slide-->

#### Modules and Bounded Context

> A **Bounded Context** is not a Module.

> A **Bounded Context** provides the logical frame inside of which the model evolves.

> **Modules** are used to organize the elements of a model, so Bounded Context encompasses the Module.


<!--slide-->

#### Structuring code in modules

<!--slide-->

##### Code is separated by layer

```
Billing
  ├── Application
  ├── Domain
  │   ├── Model
  │   └── Service
  └── Infrastructure
```

<!--slide-->

##### Example: Domain layer, simple model

```
Billing
  ├── Application
  ├── Domain
  │     └── Model
  │         ├── Bill.js
  │         ├── BillLine.js
  │         ├── BillLineWasAdded.js
  │         ├── BillRepository.js
  │         ├── BillWasCreated.js
  │         ├── Order.js
  │         ├── OrderLine.js
  │         ├── OrderLineWasAdded.js
  │         ├── OrderRepository.js
  │         ├── OrderWasCreated.js
  │         ├── Waybill.js
  │         ├── WaybillLine.js
  │         ├── WaybillLineWasAdded.js
  │         ├── WaybillRepository.js
  │         └── WaybillWasGenerated.js
  │   └── Service
  └── Infrastructure
```

<!--slide-->

##### Example: Domain layer, complex model

```
Billing
├── Application
├── Domain
   └── Model
       ├── Bill
       │   ├── Bill.js
       │   ├── BillLine.js
       │   ├── BillLineWasAdded.js
       │   ├── BillRepository.js
       │   └── BillWasCreated.js
       ├── Order
       │   ├── Order.js
       │   ├── OrderLine.js
       │   ├── OrderLineWasAdded.js
       │   ├── OrderRepository.js
       │   └── OrderWasCreated.js
       └── Waybill
           ├── Waybill.js
           ├── WaybillLine.js
           ├── WaybillLineWasAdded.js
           ├── WaybillRepository.js
           └── WaybillWasGenerated.js
```

<!--slide-->

##### Example: Infrastructure layer

> Infrastructure layer depends on the Model layer, so most objects implement Domain's interfaces

> Dependency inversion principle (SOLID) is applied.

```
└── Infrastructure
   ├── Logging
   ├── Messaging
   └── Persistence
      ├── MongoBillRepository.js
      ├── MongoOrderRepository.js
```

<!--slide-->

##### Example: Infrastructure layer, complex model

> Infrastructure must follow structure of the Model

```
└── Infrastructure
   └── Domain
   └── Model
      ├── Bill
         ├── ORM
            └── ORMBillRepository.js
         ├── InMemory
            └── InMemoryBillRepository.js
         └── Redis
            └── RedisBillRepository.js
```

<!--slide-->

##### Example: Application layer, complex model

```
Billing
├── Application
   └── PlaceAnOrder
       ├── PlaceAnOrder.js
       ├── PlaceAnOrderRequest.js
       └── PlaceAnOrderResponse.js
```

<!--section-->

### Must-Read

[Hexagonal Architecture - Matthias Noback](https://www.youtube.com/watch?v=K1EJBmwg9EQ)

[Introducing Event Storming - Alberto Brandolini](http://ziobrando.blogspot.com.es/2013/11/introducing-event-storming.html)

[Hexagonal architecture - Alistair Cockburn](http://alistair.cockburn.us/Hexagonal+architecture)

[Last Wishes DD Project - Carlos Buenosvinos](https://github.com/dddinphp/last-wishes/tree/master/src/Lw)

<!--slide-->

### Must-Read (Spanish)

#### Domain-Driven Design, Jose Cuéllar

[Empezando…](http://josecuellar.net/domain-driven-design-episodio-i-empezando/)
[Context Maps](http://josecuellar.net/domain-driven-design-episodio-ii-context-maps/)
[Arquitectura](http://josecuellar.net/domain-driven-design-episodio-iii-arquitectura/)
[Entities & Value Objects](http://josecuellar.net/domain-driven-design-episodio-iv-entities-value-objects/)
[Services & Domain Events](http://josecuellar.net/domain-driven-design-episodio-v-services-domain-events/)
[Modules & Aggregates](http://josecuellar.net/domain-driven-design-modules-aggregates/)

<!--slide-->

### Sources

[DDD: Tackling Complexity in the Heart of Software](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

[DDD Quickly](https://www.infoq.com/minibooks/domain-driven-design-quickly)

[DDD in PHP](https://leanpub.com/ddd-in-php)

[Domain Driven Design: a "hands on" example - Fabrício Suarte](http://www.the-coder-life.com/2016/02/domain-driven-design-hands-on-example_27.html)
