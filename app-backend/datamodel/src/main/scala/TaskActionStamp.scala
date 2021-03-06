package com.rasterfoundry.datamodel

import eu.timepit.refined.types.string.NonEmptyString
import io.circe._
import io.circe.generic.semiauto._
import io.circe.refined._

import java.sql.Timestamp
import java.util.UUID

case class TaskActionStamp(
    taskId: UUID,
    userId: String,
    timestamp: Timestamp,
    fromStatus: TaskStatus,
    toStatus: TaskStatus,
    note: Option[NonEmptyString]
)

object TaskActionStamp {
  implicit val encTaskActionStamp: Encoder[TaskActionStamp] = deriveEncoder
  implicit val decTaskActionStamp: Decoder[TaskActionStamp] = deriveDecoder
}
